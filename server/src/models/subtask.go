package models

import "server/src/types"

type SubTask struct {
	types.Model
	SubTaskName        string `gorm:"type:varchar(255)" json:"sub_task_name" validate:"required"`
	SubTaskDescription string `gorm:"type:text" json:"sub_task_description" validate:"required"`
	TaskID             uint   `json:"task_id" validate:"required"`
	Actions            string `gorm:"type:jsonb;default:'{}'" json:"actions"`
	ActionsState       string `gorm:"type:jsonb;default:'{}'" json:"actions_state"`
	Task               *Task  `gorm:"foreignkey:TaskID" json:"-"`
}
