package services

import (
	"encoding/json"
	"server/src/models"
	"server/src/types"
	"server/src/utils"

	"gorm.io/gorm"
)

type ProfileServiceInterface interface {
	GetAllProfiles() ([]models.Profile, error)
	GetProfile(id string) (models.Profile, error)
	CreateProfile(profile models.Profile) (models.Profile, error)
	UpdateProfile(id string, profile models.Profile) (models.Profile, error)
	InsertOnboardingResponse(userID string, profileID string, onboardingResponse types.OnboardingResponse) (models.Profile, error)
	SetOnboardingComplete(id string) (models.Profile, error)
	DeleteProfile(id string) error
}

type ProfileService struct {
	DB *gorm.DB
}

func (p *ProfileService) GetAllProfiles() ([]models.Profile, error) {
	var profiles []models.Profile

	if err := p.DB.Find(&profiles).Error; err != nil {
		return []models.Profile{}, err
	}

	return profiles, nil
}

func (p *ProfileService) GetProfile(id string) (models.Profile, error) {
	var profile models.Profile

	if err := p.DB.First(&profile, id).Error; err != nil {
		return models.Profile{}, err
	}

	return profile, nil
}

func (p *ProfileService) CreateProfile(profile models.Profile) (models.Profile, error) {
	if err := p.DB.Create(&profile).Error; err != nil {
		return models.Profile{}, err
	}

	return profile, nil
}

func (p *ProfileService) UpdateProfile(id string, profile models.Profile) (models.Profile, error) {
	var existingProfile models.Profile

	if err := p.DB.First(&existingProfile, id).Error; err != nil {
		return models.Profile{}, err
	}

	if err := p.DB.Model(&existingProfile).Updates(&profile).Error; err != nil {
		return models.Profile{}, err
	}

	return existingProfile, nil
}

func (p *ProfileService) InsertOnboardingResponse(userID string, profileID string, onboardingResponse types.OnboardingResponse) (models.Profile, error) {
	var profile models.Profile
	var userServiceInterface UserServiceInterface = &UserService{DB: p.DB}

	// Get user profile
	profile, err := p.GetProfile(profileID)
	if err != nil {
		return models.Profile{}, err
	}

	// Get user
	user, err := userServiceInterface.GetUser(userID)
	if err != nil {
		return models.Profile{}, err
	}

	// Marshal the onboarding response
	response, err := json.Marshal(onboardingResponse)
	if err != nil {
		return models.Profile{}, err
	}

	// Update the profile with the new onboarding response
	profile.OnboardingResponse = string(response)

	// Calculate persona score
	personaID, err := utils.CalculateScore(onboardingResponse)
	if err != nil {
		return models.Profile{}, err
	}
	user.PersonaID = &personaID

	// Update the user profile and user
	profile, err = p.UpdateProfile(profileID, profile)
	if err != nil {
		return models.Profile{}, err
	}

	user, err = userServiceInterface.UpdateUser(userID, user)
	if err != nil {
		return models.Profile{}, err
	}

	return profile, nil
}

// Takes a profile ID and sets the CompletedOnboardingResponse field to true
func (p *ProfileService) SetOnboardingComplete(id string) (models.Profile, error) {
	var profile models.Profile

	if err := p.DB.First(&profile, id).Error; err != nil {
		return models.Profile{}, err
	}

	profile.CompletedOnboardingResponse = true

	if err := p.DB.Save(&profile).Error; err != nil {
		return models.Profile{}, err
	}

	return profile, nil
}

func (p *ProfileService) DeleteProfile(id string) error {
	var profile models.Profile

	if err := p.DB.First(&profile, id).Error; err != nil {
		return err
	}

	if err := p.DB.Delete(&profile).Error; err != nil {
		return err
	}

	return nil
}
