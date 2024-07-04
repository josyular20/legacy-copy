package docmodels

type SubTaskDTO struct {
	SubTaskName        string   `json:"subtask_name"`
	SubTaskDescription string   `json:"subtask_description"`
	Actions            []string `json:"actions"`
	ActionsState       []string `json:"actions_state"`
	TaskID             string   `json:"task_id"`
}
