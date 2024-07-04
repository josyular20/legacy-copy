package models

import (
	"server/src/types"
)

type Persona struct {
	types.Model
	PersonaDescription string  `gorm:"type:text" json:"persona_description" validate:"required"`
	PersonaTitle       string  `gorm:"type:varchar(255);unique" json:"persona_title" validate:"required"`
	Tasks              []*Task `gorm:"many2many:persona_tasks;"`
}
