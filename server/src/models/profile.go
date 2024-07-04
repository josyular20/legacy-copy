package models

import (
	"server/src/types"
	"time"
)

type Profile struct {
	types.Model
	Name                        string    `gorm:"type:varchar(255)" json:"name" validate:"required"`
	DateOfBirth                 time.Time `gorm:"type:date" json:"date_of_birth" validate:"required"`
	PhoneNumber                 string    `gorm:"type:varchar(20)" json:"phone_number" validate:"required"`
	OnboardingResponse          string    `gorm:"type:jsonb;default:'{}'" json:"onboarding_response"`
	CompletedOnboardingResponse bool      `gorm:"type:boolean;default:false" json:"completed_onboarding_response"`
	UserID                      uint      `gorm:"foreignkey:User;unique" json:"user_id" validate:"required"`
	User                        *User     `json:"-"`
}
