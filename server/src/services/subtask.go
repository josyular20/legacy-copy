package services

import (
	"server/src/models"

	"gorm.io/gorm"
)

type SubTaskServiceInterface interface {
	GetAllSubTasks() ([]models.SubTask, error)
	GetSubTask(id string) (models.SubTask, error)
	GetActions(id string) (string, error)
	CreateSubTask(subTask models.SubTask) (models.SubTask, error)
	UpdateSubTask(id string, subTask models.SubTask) (models.SubTask, error)
	DeleteSubTask(id string) error
}

type SubTaskService struct {
	DB *gorm.DB
}

func (s *SubTaskService) GetAllSubTasks() ([]models.SubTask, error) {
	var subTask []models.SubTask

	if err := s.DB.Find(&subTask).Error; err != nil {
		return []models.SubTask{}, err
	}

	return subTask, nil
}

func (s *SubTaskService) GetSubTask(id string) (models.SubTask, error) {
	var task models.SubTask

	if err := s.DB.First(&task, id).Error; err != nil {
		return models.SubTask{}, err
	}

	return task, nil
}

func (s *SubTaskService) GetActions(id string) (string, error) {
	var task models.SubTask
	var actions string

	if err := s.DB.First(&task, id).Error; err != nil {
		return "", err
	}

	actions = task.Actions

	return actions, nil
}

func (s *SubTaskService) CreateSubTask(subTask models.SubTask) (models.SubTask, error) {
	if err := s.DB.Create(&subTask).Error; err != nil {
		return models.SubTask{}, err
	}

	return subTask, nil
}

func (s *SubTaskService) UpdateSubTask(id string, subTask models.SubTask) (models.SubTask, error) {
	var existingSubTask models.SubTask

	if err := s.DB.First(&existingSubTask, id).Error; err != nil {
		return models.SubTask{}, err
	}

	if err := s.DB.Model(&existingSubTask).Updates(&subTask).Error; err != nil {
		return models.SubTask{}, err
	}

	return existingSubTask, nil
}

func (s *SubTaskService) DeleteSubTask(id string) error {
	var subTask models.SubTask

	if err := s.DB.First(&subTask, id).Error; err != nil {
		return err
	}

	if err := s.DB.Delete(&subTask).Error; err != nil {
		return err
	}

	return nil
}
