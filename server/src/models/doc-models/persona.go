package docmodels

type PersonaDTO struct {
	PersonaTitle       string   `json:"persona_title"`
	PersonaDescription string   `json:"persona_description"`
	Tasks              []string `json:"tasks"`
}
