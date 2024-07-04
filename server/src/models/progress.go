package models

import (
	"server/src/types"
)

type TaskProgress struct {
	types.Model
	Progress uint  `gorm:"default:0" json:"progress"`
	UserID   uint  `json:"user_id"`
	TaskID   uint  `json:"task_id"`
	User     *User `gorm:"foreignkey:UserID" json:"-"`
	Task     *Task `gorm:"foreignkey:TaskID" json:"-"`
}

type SubTaskProgress struct {
	types.Model
	Completed bool     `gorm:"default:false" json:"completed"`
	UserID    uint     `json:"user_id"`
	SubTaskID uint     `json:"sub_task_id"`
	User      *User    `gorm:"foreignkey:UserID" json:"-"`
	SubTask   *SubTask `gorm:"foreignkey:SubTaskID" json:"-"`
}
