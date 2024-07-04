package docmodels

type UserDTO struct {
	Username   string `json:"username"`
	FirebaseID string `json:"firebase_id"`
	Password   string `json:"password"`
	Email      string `json:"email"`
	PersonaID  *uint  `json:"persona_id"`
}
