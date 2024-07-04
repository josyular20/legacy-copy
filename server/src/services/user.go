package services

import (
	"server/src/models"

	"gorm.io/gorm"
)

// TODO: Possible optimization is to pass the user object to the service as well

type UserServiceInterface interface {
	GetAllUsers() ([]models.User, error)
	GetUser(id string) (models.User, error)
	GetUserFromUsername(username string) (models.User, error)
	GetUserFromFirebaseID(firebaseID string) (models.User, error)
	GetUserPersona(id string) (models.Persona, error)
	GetUserTasks(id string) ([]models.Task, error)
	GetUserProfile(id string) (models.Profile, error)

	CreateUser(user models.User) (models.User, error)
	UpdateUser(id string, user models.User) (models.User, error)
	DeleteUser(id string) error

	InitializeUserProgress(id string) ([]models.TaskProgress, []models.SubTaskProgress, error)
}

type UserService struct {
	DB *gorm.DB
}

// Gets all users (including soft deleted users) for testing
func (u *UserService) GetAllUsers() ([]models.User, error) {
	var users []models.User
	if err := u.DB.Unscoped().Omit("password").Find(&users).Error; err != nil {
		return nil, err
	}

	return users, nil
}

func (u *UserService) GetUser(id string) (models.User, error) {
	var user models.User
	if err := u.DB.First(&user, id).Omit("password").Error; err != nil {
		return models.User{}, err
	}

	return user, nil
}

func (u *UserService) GetUserFromUsername(username string) (models.User, error) {
	var user models.User
	if err := u.DB.Where("username = ?", username).Omit("password").First(&user).Error; err != nil {
		return models.User{}, err
	}

	return user, nil
}

func (u *UserService) GetUserFromFirebaseID(firebaseID string) (models.User, error) {
	var user models.User
	if err := u.DB.Where("firebase_id = ?", firebaseID).Omit("password").First(&user).Error; err != nil {
		return models.User{}, err
	}

	return user, nil
}

func (u *UserService) GetUserPersona(id string) (models.Persona, error) {
	var persona models.Persona
	var user models.User

	user, err := u.GetUser(id)
	if err != nil {
		return models.Persona{}, err
	}

	if err := u.DB.Model(&user).Association("Persona").Find(&persona); err != nil {
		return models.Persona{}, err
	}

	return persona, nil
}

func (u *UserService) GetUserTasks(id string) ([]models.Task, error) {
	var tasks []models.Task
	var persona models.Persona

	persona, err := u.GetUserPersona(id)
	if err != nil {
		return nil, err
	}

	if err := u.DB.Model(&persona).Preload("Profile").Association("Tasks").Find(&tasks); err != nil {
		return nil, err
	}

	return tasks, nil
}

func (u *UserService) GetUserProfile(id string) (models.Profile, error) {
	var profile models.Profile
	var user models.User

	user, err := u.GetUser(id)
	if err != nil {
		return models.Profile{}, err
	}

	if err := u.DB.Where("user_id = ?", user.ID).First(&profile).Error; err != nil {
		return models.Profile{}, err
	}

	return profile, nil
}

func (u *UserService) CreateUser(user models.User) (models.User, error) {
	if err := u.DB.Create(&user).Error; err != nil {
		return models.User{}, err
	}

	user.Password = ""
	return user, nil
}

func (u *UserService) InitializeUserProgress(id string) ([]models.TaskProgress, []models.SubTaskProgress, error) {
	var allTaskProgress []models.TaskProgress
	var allSubTaskProgress []models.SubTaskProgress
	var p ProgressServiceInterface = &ProgressService{DB: u.DB}

	taskProgress, err := p.CreateAllTaskProgress(id)
	if err != nil {
		return nil, nil, err
	}

	subTaskProgress, err := p.CreateAllSubTaskProgress(id)
	if err != nil {
		return nil, nil, err
	}

	allTaskProgress = append(allTaskProgress, taskProgress...)
	allSubTaskProgress = append(allSubTaskProgress, subTaskProgress...)

	return allTaskProgress, allSubTaskProgress, nil
}

func (u *UserService) UpdateUser(id string, user models.User) (models.User, error) {
	var existingUser models.User

	if err := u.DB.First(&existingUser, id).Error; err != nil {
		return models.User{}, err
	}

	if err := u.DB.Model(&existingUser).Updates(&user).Error; err != nil {
		return models.User{}, err
	}

	existingUser.Password = ""

	return existingUser, nil
}

func (u *UserService) DeleteUser(id string) error {
	var user models.User

	if err := u.DB.First(&user, id).Error; err != nil {
		return err
	}

	if err := u.DB.Delete(&user).Error; err != nil {
		return err
	}

	return nil
}
