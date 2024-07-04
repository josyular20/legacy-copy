package docmodels

type ProfileDTO struct {
	Name                        string   `json:"username"`
	DateOfBirth                 string   `json:"date_of_birth"`
	PhoneNumber                 string   `json:"phone_number"`
	OnboardingResponse          string   `json:"onboarding_response"`
	CompletedOnboardingResponse bool     `json:"completed_onboarding_response"`
	UserID                      uint     `json:"user_id"`
	User                        *UserDTO `json:"user"`
}
