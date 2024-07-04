package services

import (
	"server/src/models"

	"gorm.io/gorm"
)

type TaskServiceInterface interface {
	GetAllTasks() ([]models.Task, error)
	GetTask(id string) (models.Task, error)
	GetTaskTag(id string) (string, error)
	GetAllUserTasks(id string) ([]models.Task, error)
	GetAllUserTasksWithTag(id string, tag []string) ([]models.Task, error)
	GetAllSubTasksOfTask(id string) ([]models.SubTask, error)
	CreateTask(task models.Task) (models.Task, error)
	UpdateTask(id string, task models.Task) (models.Task, error)
	DeleteTask(id string) error
}

type TaskService struct {
	DB *gorm.DB
}

func (t *TaskService) GetAllTasks() ([]models.Task, error) {
	var tasks []models.Task

	if err := t.DB.Find(&tasks).Error; err != nil {
		return []models.Task{}, err
	}

	return tasks, nil
}

func (t *TaskService) GetTask(id string) (models.Task, error) {
	var task models.Task

	if err := t.DB.First(&task, id).Error; err != nil {
		return models.Task{}, err
	}

	return task, nil
}

func (t *TaskService) GetTaskTag(id string) (string, error) {
	var task models.Task

	if err := t.DB.First(&task, id).Error; err != nil {
		return "", err
	}

	var tag models.Tag
	if err := t.DB.Model(&task).Association("Tags").Find(&tag); err != nil {
		return "", err
	}

	return tag.Name, nil
}

func (t *TaskService) GetAllUserTasks(id string) ([]models.Task, error) {
	var tasks []models.Task
	var userService UserServiceInterface = &UserService{DB: t.DB}

	persona, err := userService.GetUserPersona(id)
	if err != nil {
		return []models.Task{}, err
	}

	if err := t.DB.Model(&persona).Association("Tasks").Find(&tasks); err != nil {
		return []models.Task{}, err
	}

	return tasks, nil
}

func (t *TaskService) GetAllUserTasksWithTag(userID string, tags []string) ([]models.Task, error) {
	var userService UserServiceInterface = &UserService{DB: t.DB}
	var tasks []models.Task

	persona, err := userService.GetUserPersona(userID)
	if err != nil {
		return []models.Task{}, err
	}

	if err := t.DB.Table("tasks").
		Joins("JOIN persona_tasks ON persona_tasks.task_id = tasks.id").
		Joins("JOIN personas ON persona_tasks.persona_id = personas.id").
		Joins("JOIN task_tags ON task_tags.task_id = tasks.id").
		Joins("JOIN tags ON task_tags.tag_id = tags.id").
		Where("tags.name IN (?) AND personas.id = ?", tags, persona.ID).
		Find(&tasks).Error; err != nil {
		return nil, err
	}
	return tasks, nil
}

func (t *TaskService) GetAllSubTasksOfTask(id string) ([]models.SubTask, error) {
	var subtasks []models.SubTask

	if err := t.DB.Where("task_id = ?", id).Find(&subtasks).Error; err != nil {
		return []models.SubTask{}, err
	}

	return subtasks, nil
}

func (t *TaskService) CreateTask(task models.Task) (models.Task, error) {
	if err := t.DB.Create(&task).Error; err != nil {
		return models.Task{}, err
	}

	return task, nil
}

func (t *TaskService) UpdateTask(id string, task models.Task) (models.Task, error) {
	var existingTask models.Task

	if err := t.DB.First(&existingTask, id).Error; err != nil {
		return models.Task{}, err
	}

	if err := t.DB.Model(&existingTask).Updates(task).Error; err != nil {
		return models.Task{}, err
	}

	return existingTask, nil
}

func (t *TaskService) DeleteTask(id string) error {
	var task models.Task

	if err := t.DB.First(&task, id).Error; err != nil {
		return err
	}

	if err := t.DB.Delete(&task).Error; err != nil {
		return err
	}

	return nil
}
