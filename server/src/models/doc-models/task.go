package docmodels

type TaskDTO struct {
	TaskName        string   `json:"task_name"`
	TaskDescription string   `json:"task_description"`
	Personas        []string `json:"personas"`
	Tags            []string `json:"tags"`
}
