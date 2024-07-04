package services

import (
	"bytes"
	"encoding/json"
	"errors"
	"fmt"
	"io"
	"mime/multipart"
	"net/textproto"
	"server/src/models"
	"strconv"
	"strings"
	"time"

	"github.com/aws/aws-sdk-go/aws"
	"github.com/aws/aws-sdk-go/aws/credentials"
	"github.com/aws/aws-sdk-go/aws/session"
	"github.com/aws/aws-sdk-go/service/s3"
	"github.com/aws/aws-sdk-go/service/s3/s3manager"
	"github.com/go-pdf/fpdf"
	"gorm.io/gorm"
)

var BUCKET_NAME = "generate-legacy-storage"
var ID = "AKIA2WVH6R5ZEMKYG7VW"
var SECRET = "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"

type FileServiceInterface interface {
	GetAllFiles() ([]models.File, error)
	GetFile(id string) (models.File, error)
	GetFilename(id string) (string, error)
	GetAllUserFiles(id string) ([]models.File, error)
	GetAllUserFilesWithTag(id string, tag []string) ([]models.File, error)
	GetFileURL(id string, days string) (string, error)
	CreateFile(id string, file models.File, data *multipart.FileHeader, reader io.Reader) (models.File, error)
	GeneratePDF(uid string, subtaskName string, fileJSON string) (*multipart.FileHeader, io.Reader, error)
	DeleteFile(id string, s3Only bool) error
}

type FileService struct {
	DB *gorm.DB
}

func createAWSSession() (*session.Session, error) {
	// TODO:--> consider caching active session so we dont make f new one every time
	sess, err := session.NewSession(&aws.Config{
		Region:      aws.String("us-east-2"),
		Credentials: credentials.NewStaticCredentials(ID, SECRET, ""),
	})

	if err != nil {
		return nil, err
	}

	return sess, nil
}

func (f *FileService) GetFilename(id string) (string, error) {

	file, err := f.GetFile(id)
	if err != nil {
		return "", err
	}

	return file.FileName, nil
}

func (f *FileService) GetAllFiles() ([]models.File, error) {
	var files []models.File

	if err := f.DB.Find(&files).Error; err != nil {
		return nil, err
	}

	return files, nil
}

func (f *FileService) GetAllUserFilesWithTag(id string, tag []string) ([]models.File, error) {
	var files []models.File

	if err := f.DB.Table("files").
		Joins("JOIN file_tags ON file_tags.file_id = files.id").
		Joins("JOIN tags ON file_tags.tag_id = tags.id").
		Where("tags.name IN (?) AND files.user_id = ?", tag, id).
		Find(&files).Error; err != nil {
		return nil, err
	}

	return files, nil
}

func (f *FileService) GetAllUserFiles(id string) ([]models.File, error) {
	var files []models.File

	if err := f.DB.Where("user_id = ?", id).Find(&files).Error; err != nil {
		return nil, err
	}

	return files, nil
}

func (f *FileService) GetFile(id string) (models.File, error) {
	var file models.File

	if err := f.DB.First(&file, id).Error; err != nil {
		return models.File{}, err
	}

	return file, nil
}

func (f *FileService) GetFileURL(id string, days string) (string, error) {
	file, err := f.GetFile(id)
	if err != nil {
		return "", err
	}

	// create session and service client, then create presigned url
	sess, err := createAWSSession()
	if err != nil {
		return "", err
	}

	svc := s3.New(sess)

	req, _ := svc.GetObjectRequest(&s3.GetObjectInput{
		Bucket: aws.String(BUCKET_NAME),
		Key:    aws.String(file.ObjectKey),
	})

	daysInt, err := strconv.Atoi(days)
	if err != nil {
		return "", err
	}
	expiration := time.Duration(24*time.Hour) * time.Duration(daysInt)

	url, err := req.Presign(expiration)
	if err != nil {
		return "", err
	}

	return url, nil
}

func (f *FileService) CreateFile(id string, file models.File, data *multipart.FileHeader, reader io.Reader) (models.File, error) {
	var testFile models.File
	var searchFiles []models.File
	file.FileName = data.Filename
	idInt, err := strconv.Atoi(id)
	if err != nil {
		return models.File{}, errors.New("failed to convert id to int")
	}

	file.UserID = uint(idInt)

	// check if filename is already taken, and add (filenumber) to name if it is
	objectKey := fmt.Sprintf("%v-%v", file.UserID, file.FileName)
	dotIndex := strings.LastIndex(objectKey, ".")
	file_substring := objectKey[:dotIndex]
	file_extension := objectKey[dotIndex:]
	searchKey := file_substring + "%" + file_extension

	file.ObjectKey = objectKey

	if err := f.DB.Where("object_key = ?", objectKey).Find(&testFile).Error; err == nil {
		f.DB.Where("object_key LIKE ?", searchKey).Find(&searchFiles)
		i := len(searchFiles)

		file_num := fmt.Sprintf(" (%v)", i)
		file.ObjectKey = file_substring + file_num + file_extension
		file.FileName = file_substring[strings.Index(file_substring, "-")+1:] + file_num + file_extension
	}

	// Check if the file size is greater than 5 MB
	if data.Size > 5000000 {
		return models.File{}, errors.New("maximum file size 5 MB")
	}

	file.FileSize = data.Size

	// Upload the file to the S3 bucket
	sess, err := createAWSSession()
	if err != nil {
		return models.File{}, errors.New("failed to create AWS session")
	}

	uploader := s3manager.NewUploader(sess)

	_, err = uploader.Upload(&s3manager.UploadInput{
		Bucket: aws.String(BUCKET_NAME),
		Key:    aws.String(file.ObjectKey),
		Body:   reader,
	})
	if err != nil {
		return models.File{}, errors.New("failed to upload file to S3 bucket")
	}

	// Create the file in the database
	if err := f.DB.Create(&file).Error; err != nil {
		f.DeleteFile(fmt.Sprint(file.ID), true) // delete file from s3 if it cant be made in database
		return models.File{}, errors.New("failed to create file in database")
	}

	return file, nil
}

func (f *FileService) GeneratePDF(uid string, subtaskName string, fileJSON string) (*multipart.FileHeader, io.Reader, error) {
	// Decoding JSON string into a map
	var data map[string]interface{}
	if err := json.Unmarshal([]byte(fileJSON), &data); err != nil {
		return nil, nil, err
	}

	pdf := fpdf.New("P", "mm", "A4", "")
	pdf.AddPage()
	pdf.SetFont("Arial", "", 12)

	x := 20.0
	y := 20.0

	// Looping through the fields of the map to generate pdf
	for key, value := range data {
		switch subData := value.(type) {
		case map[string]interface{}:
			for key1, value1 := range subData {
				pdf.Text(x, y, fmt.Sprintf("%v: %v", key1, value1))
				y += 10.0
			}

		default:
			if key == "additional_comments" {
				if stringValue, ok := value.(string); ok {
					lines := pdf.SplitText("additional comments: "+stringValue, 170)
					for _, words := range lines {
						pdf.Text(x, y, words)
						y += 6.0
					}
					y -= 6.0
				} else {
					return nil, nil, errors.New("unexpected input")
				}
			} else {
				pdf.Text(x, y, fmt.Sprintf("%v: %v", key, value))
			}
			y += 10.0
		}
	}

	var buffer bytes.Buffer
	if err := pdf.Output(&buffer); err != nil {
		return nil, nil, errors.New("error generating pdf file")
	}

	fileHeader := &multipart.FileHeader{
		Filename: fmt.Sprintf("%v.pdf", subtaskName),
		Header:   textproto.MIMEHeader{"Content-Type": []string{"application/pdf"}},
		Size:     int64(len(buffer.Bytes())),
	}

	reader := bytes.NewReader(buffer.Bytes())

	return fileHeader, reader, nil
}

func (f *FileService) DeleteFile(id string, s3Only bool) error {
	var file models.File

	if err := f.DB.First(&file, id).Error; err != nil {
		return err
	}

	// create session and service client, then delete file
	sess, err := createAWSSession()
	if err != nil {
		return err
	}

	svc := s3.New(sess)
	objectKey := fmt.Sprintf("%v-%v", file.UserID, file.FileName)

	_, err = svc.DeleteObject(&s3.DeleteObjectInput{
		Bucket: aws.String(BUCKET_NAME),
		Key:    aws.String(objectKey),
	})
	if err != nil {
		return err
	}

	// Required to delete the file from the database permanently
	if !s3Only {
		if err := f.DB.Unscoped().Delete(&file).Error; err != nil {
			return err
		}
	}

	return nil
}
