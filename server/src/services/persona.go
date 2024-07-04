package services

import (
	"server/src/models"

	"gorm.io/gorm"
)

type PersonaServiceInterface interface {
	GetAllPersonas() ([]models.Persona, error)
	GetPersona(id string) (models.Persona, error)
	GetPersonaTasks(id string) ([]models.Task, error)

	CreatePersona(persona models.Persona) (models.Persona, error)
	UpdatePersona(id string, persona models.Persona) (models.Persona, error)
	DeletePersona(id string) error
}

type PersonaService struct {
	DB *gorm.DB
}

func (p *PersonaService) GetAllPersonas() ([]models.Persona, error) {
	var persona []models.Persona

	if err := p.DB.Find(&persona).Error; err != nil {
		return nil, err
	}

	return persona, nil
}

func (p *PersonaService) GetPersona(id string) (models.Persona, error) {
	var persona models.Persona

	if err := p.DB.First(&persona, id).Error; err != nil {
		return models.Persona{}, err
	}

	return persona, nil
}

func (p *PersonaService) GetPersonaTasks(id string) ([]models.Task, error) {
	var tasks []models.Task

	if err := p.DB.Where("persona_id = ?", id).Find(&tasks).Error; err != nil {
		return nil, err
	}

	return tasks, nil
}

func (p *PersonaService) CreatePersona(persona models.Persona) (models.Persona, error) {
	if err := p.DB.Create(&persona).Error; err != nil {
		return models.Persona{}, err
	}

	return persona, nil
}

func (p *PersonaService) UpdatePersona(id string, persona models.Persona) (models.Persona, error) {
	var existingPersona models.Persona

	if err := p.DB.First(&existingPersona, id).Error; err != nil {
		return models.Persona{}, err
	}

	if err := p.DB.Model(&existingPersona).Updates(persona).Error; err != nil {
		return models.Persona{}, err
	}

	return existingPersona, nil
}

func (p *PersonaService) DeletePersona(id string) error {
	var persona models.Persona

	if err := p.DB.First(&persona, id).Error; err != nil {
		return err
	}

	if err := p.DB.Delete(&persona).Error; err != nil {
		return err
	}

	return nil
}
