package controllers

import (
	"io"
	"net/http"
	"server/src/models"
	"server/src/services"
	"strings"

	"github.com/labstack/echo/v4"
)

type FileController struct {
	fileService services.FileServiceInterface
}

func NewFileController(fileService services.FileServiceInterface) *FileController {
	return &FileController{fileService: fileService}
}

// GetAllFiles godoc
//
//		@Summary		Gets all file information
//		@Description	Returns all file information
//		@ID				get-all-files
//		@Tags			file
//		@Produce		json
//		@Success		200	  {object}	  []models.File
//	    @Failure        404   {string}    string "Failed to fetch files"
//		@Router			/api/files/  [get]
func (f *FileController) GetAllFiles(c echo.Context) error {
	var file []models.File

	file, err := f.fileService.GetAllFiles()
	if err != nil {
		return c.JSON(http.StatusNotFound, "Failed to fetch files")
	}

	return c.JSON(http.StatusOK, file)
}

// GetFile godoc
//
//		@Summary		Gets a filename from file id
//		@Description	Returns a filename from file id
//		@ID				get-filename
//		@Tags			file
//		@Produce		json
//		@Param          fid	  path  string	true	"FileID"
//		@Success		200	  {object}	  models.File
//	 	@Failure        404   {string}    string "Failed to fetch file"
//		@Router			/api/{fid}/filename  [get]
func (f *FileController) GetFilename(c echo.Context) error {
	fileID := c.Param("fid")
	file, err := f.fileService.GetFilename(fileID)

	if err != nil {
		return c.JSON(http.StatusNotFound, "Failed to fetch file")
	}

	return c.JSON(http.StatusOK, file)
}

// GetAllUserFiles godoc
//
//		@Summary		Gets all file information from user id
//		@Description	Returns all file information from user id
//		@ID				get-all-user-files
//		@Tags			file
//		@Produce		json
//		@Param          uid	  path  string	true	"UserID"
//		@Param          tag	  query  string	false	"Tag"
//		@Success		200	  {object}	  []models.File
//	    @Failure        404   {string}    string "Failed to fetch files"
//		@Router			/api/files/{uid}/user  [get]
func (f *FileController) GetAllUserFiles(c echo.Context) error {
	userID := c.Param("uid")
	tag := c.QueryParam("tag")

	if tag != "" {
		tags := strings.Split(tag, ",")
		files, err := f.fileService.GetAllUserFilesWithTag(userID, tags)
		if err != nil {
			return c.JSON(http.StatusNotFound, "Failed to fetch files")
		}

		return c.JSON(http.StatusOK, files)
	}

	file, err := f.fileService.GetAllUserFiles(userID)
	if err != nil {
		return c.JSON(http.StatusNotFound, "Failed to fetch files")
	}

	return c.JSON(http.StatusOK, file)
}

// GetFile godoc
//
//		@Summary		Gets a url to download a file from file id for a certain amount of days
//		@Description	Returns a url to download a file from file id for a certain amount of days
//		@ID				get-file
//		@Tags			file
//		@Produce		json
//		@Param          fid	  path  string	true	"FileID"
//		@Param          days	  query  string	false	"Days"
//		@Success		200	  {object}	  models.File
//	 	@Failure        404   {string}    string "Failed to get presigned url"
//		@Router			/api/files/{fid} [get]
func (f *FileController) GetFileURL(c echo.Context) error {
	fileID := c.Param("fid")
	days := c.QueryParam("days")

	if days == "" {
		days = "1"
	}

	url, err := f.fileService.GetFileURL(fileID, days)
	if err != nil {
		return c.JSON(http.StatusNotFound, "Failed to get presigned url")
	}

	return c.JSON(http.StatusOK, url)
}

// GeneratePDF godoc
//
//		@Summary		Generates a pdf from a json file
//		@Description	Returns a pdf from a json file
//		@ID				generate-pdf
//		@Tags			file
//		@Produce		json
//		@Param          uid	  path  string	true	"UserID"
//		@Success		200	  {object}	  models.File
//	 	@Failure        404   {string}    string "Failed to generate pdf"
//		@Router			/api/files/makepdf/{uid}  [post]
func (f *FileController) GeneratePDF(c echo.Context) error {
	var file models.File

	// get user id
	uid := c.Param("uid")
	subtaskName := c.Param("sub_task_name")

	// Read the request body
	body, err := io.ReadAll(c.Request().Body)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, "Error reading request body")
	}
	// Convert the byte slice to a string
	rawJSON := string(body)

	fileHeader, reader, err := f.fileService.GeneratePDF(uid, subtaskName, rawJSON)
	if err != nil {
		return c.JSON(http.StatusNotFound, err.Error())
	}

	file, err = f.fileService.CreateFile(uid, file, fileHeader, reader)
	if err != nil {
		return c.JSON(http.StatusBadRequest, "Failed to create file: "+err.Error())
	}

	return c.JSON(http.StatusOK, file)
}

// CreateFile godoc
//
//		@Summary		Creates a file
//		@Description	Creates a file
//		@ID				create-file
//		@Tags			file
//		@Accept			json
//		@Produce		json
//		@Param          uid	  	path  string	true	"UserID"
//		@Param          file 		body  string	true	"File"
//		@Success		200	  {object}	  models.File
//	    @Failure        400   {string}    string "Failed to process the request"
//		@Failure        400   {string}    string "Failed to validate the data"
//		@Failure        400   {string}    string "Failed to get form"
//		@Failure        400   {string}    string "Failed to create file"
//		@Router			/api/files/{uid}  [post]
func (f *FileController) CreateFile(c echo.Context) error {
	var file models.File
	userID := c.Param("uid")

	if err := c.Bind(&file); err != nil {
		return c.JSON(http.StatusBadRequest, "Failed to process the request")
	}

	if err := services.ValidateData(c, file); err != nil {
		return c.JSON(http.StatusBadRequest, "Failed to validate the data")
	}

	form, err := c.MultipartForm()
	if err != nil {
		return c.JSON(http.StatusBadRequest, "Failed to get form")
	}

	fileResponse := form.File["file_data"][0]
	fileData, err := fileResponse.Open()
	if err != nil {
		return c.JSON(http.StatusBadRequest, "Failed to open file")
	}
	defer fileData.Close()

	file, err = f.fileService.CreateFile(userID, file, fileResponse, fileData)
	if err != nil {
		return c.JSON(http.StatusBadRequest, "Failed to create file: "+err.Error())
	}

	return c.JSON(http.StatusOK, file)
}

// DeleteFile godoc
//
//		@Summary		Deletes a file from file id
//		@Description	Deletes a file from file id
//		@ID				delete-file
//		@Tags			file
//		@Produce		json
//		@Param          fid	  path  string	true	"FileID"
//		@Success		200	  {string}	  string "File deleted"
//	 	@Failure        404   {string}    string "Failed to delete file"
//		@Router			/api/files/{fid}  [delete]
func (f *FileController) DeleteFile(c echo.Context) error {
	fileID := c.Param("fid")

	if err := f.fileService.DeleteFile(fileID, false); err != nil {
		return c.JSON(http.StatusNotFound, "Failed to delete file")
	}

	return c.JSON(http.StatusOK, "File deleted")
}
