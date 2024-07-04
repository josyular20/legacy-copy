package docmodels

type TagDTO struct {
	Name  string   `json:"tag_name"`
	Tasks []string `json:"tasks"`
	Files []string `json:"files"`
}
