package models

import "server/src/types"

type User struct {
	types.Model
	Username   string   `gorm:"type:varchar(255);unique" json:"username" validate:"required"`
	FirebaseID string   `gorm:"type:varchar(255);unique" json:"firebase_id" validate:"required"`
	Password   string   `gorm:"type:text" json:"password" validate:"required"`
	Email      string   `gorm:"type:varchar(255);unique" json:"email" validate:"required,email"`
	PersonaID  *uint    `json:"persona_id"`
	Persona    *Persona `gorm:"foreignkey:PersonaID" json:"-"`
}
