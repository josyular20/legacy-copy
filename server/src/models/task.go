package models

import "server/src/types"

type Task struct {
	types.Model
	TaskName        string     `gorm:"type:varchar(255)" json:"task_name" validate:"required"`
	TaskDescription string     `gorm:"type:text" json:"task_description" validate:"required"`
	Personas        []*Persona `gorm:"many2many:persona_tasks;"`
	Tags            []*Tag     `gorm:"many2many:task_tags;"`
}
