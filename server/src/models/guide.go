package models

import (
	"server/src/types"
	"time"
)

type Guide struct {
	types.Model
	GuideName      string    `gorm:"type:varchar(255);unique" json:"guide_name" validate:"required"`
	Title          string    `gorm:"type:varchar(255)" json:"title" validate:"required"`
	SubTitle       string    `gorm:"type:varchar(255)" json:"sub_title" validate:"required"`
	Author         string    `gorm:"type:varchar(255)" json:"author" validate:"required"`
	AuthorImageUrl string    `gorm:"type:varchar(255)" json:"author_image_url" validate:"required"`
	MinsRead       uint      `json:"mins_read"`
	Date           time.Time `gorm:"type:timestamp;default:CURRENT_TIMESTAMP" json:"date"`
	FullText       string    `gorm:"type:text" json:"full_text" validate:"required"`
	Tags           []*Tag    `gorm:"many2many:guide_tags;" json:"tags"`
}
