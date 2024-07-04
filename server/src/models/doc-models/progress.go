package docmodels

type TaskProgressDTO struct {
	Completed bool     `json:"completed"`
	UserID    uint     `json:"user_id"`
	TaskID    uint     `json:"task_id"`
	User      *UserDTO `json:"user"`
	Task      *TaskDTO `json:"task"`
}

type SubTaskProgressDTO struct {
	Completed bool        `json:"completed"`
	UserID    uint        `json:"user_id"`
	SubTaskID uint        `json:"subtask_id"`
	User      *UserDTO    `json:"user"`
	SubTask   *SubTaskDTO `json:"subtask"`
}
