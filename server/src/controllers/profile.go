package controllers

import (
	"encoding/json"
	"io"
	"net/http"
	"server/src/models"
	"server/src/services"
	"server/src/types"

	"github.com/labstack/echo/v4"
)

type ProfileController struct {
	profileService services.ProfileServiceInterface
}

func NewProfileController(profileService services.ProfileServiceInterface) *ProfileController {
	return &ProfileController{profileService: profileService}
}

// GetAllProfiles godoc
//
//		@Summary		Gets all profiles
//		@Description	Returns all profiles
//		@ID				get-all-profiles
//		@Tags			profile
//		@Produce		json
//		@Success		200	  {object}	  []models.Profile
//	    @Failure        404   {string}    string "Failed to fetch profiles"
//		@Router			/api/profiles/  [get]
func (p *ProfileController) GetAllProfiles(c echo.Context) error {
	profiles, err := p.profileService.GetAllProfiles()
	if err != nil {
		return c.JSON(http.StatusNotFound, "Failed to fetch profiles")
	}

	return c.JSON(http.StatusOK, profiles)
}

// GetProfile godoc
//
//		@Summary		Gets a profile from profile id
//		@Description	Returns a profile from profile id
//		@ID				get-profile
//		@Tags			profile
//		@Produce		json
//		@Param          pid	  path  string	true	"ProfileID"
//		@Success		200	  {object}	  models.Profile
//	 	@Failure        404   {string}    string "Failed to fetch profile"
//		@Router			/api/profiles/{pid}  [get]
func (p *ProfileController) GetProfile(c echo.Context) error {
	profileID := c.Param("pid")
	profile, err := p.profileService.GetProfile(profileID)

	if err != nil {
		return c.JSON(http.StatusNotFound, "Failed to fetch profile")
	}

	return c.JSON(http.StatusOK, profile)
}

// CreateProfile godoc
//
//		@Summary		Creates a profile
//		@Description	Creates a profile
//		@ID				create-profile
//		@Tags			profile
//		@Accept			json
//		@Produce		json
//		@Param			profile body docmodels.ProfileDTO true "Profile"
//		@Success		200	  {object}	  models.Profile
//		@Failure        400   {string}    string "Failed to process the request"
//	    @Failure        400   {string}    string "Failed to validate the data"
//		@Failure        400   {string}    string "Failed to create profile"
//		@Router			/api/profiles/  [post]
func (p *ProfileController) CreateProfile(c echo.Context) error {
	var profile models.Profile

	if err := c.Bind(&profile); err != nil {
		return c.JSON(http.StatusBadRequest, "Failed to process the request")
	}

	if err := services.ValidateData(c, profile); err != nil {
		return c.JSON(http.StatusBadRequest, "Failed to validate the data")
	}

	createdProfile, err := p.profileService.CreateProfile(profile)
	if err != nil {
		return c.JSON(http.StatusBadRequest, "Failed to create profile")
	}

	return c.JSON(http.StatusOK, createdProfile)
}

// UpdateProfile godoc
//
//		@Summary		Updates a profile
//		@Description	Updates a profile
//		@ID				update-profile
//		@Tags			profile
//		@Accept			json
//		@Produce		json
//	    @Param          pid	  path  string	true	"ProfileID"
//		@Param			profile body docmodels.ProfileDTO true "Profile"
//		@Success		200	  {object}	  models.Profile
//	  	@Failure        400   {string}    string "Failed to process the request"
//		@Failure        400   {string}    string "Failed to update profile"
//		@Router			/api/profiles/{pid}  [patch]
func (p *ProfileController) UpdateProfile(c echo.Context) error {
	var profile models.Profile
	profileID := c.Param("pid")

	if err := c.Bind(&profile); err != nil {
		return c.JSON(http.StatusBadRequest, "Failed to process the request")
	}

	profile, err := p.profileService.UpdateProfile(profileID, profile)
	if err != nil {
		return c.JSON(http.StatusBadRequest, "Failed to update profile")
	}

	return c.JSON(http.StatusOK, profile)
}

// InsertOnboardingResponse godoc
//
//		@Summary		Inserts an onboarding response
//		@Description	Inserts an onboarding response
//		@ID				insert-onboarding-response
//		@Tags			profile
//		@Accept			json
//		@Produce		json
//	    @Param          pid	  path  string	true	"ProfileID"
//		@Param			onboardingResponse body object true "OnboardingResponse"
//		@Success		200	  {object}	  models.Profile
//	  	@Failure        400   {string}    string "Failed to process the request"
//		@Failure        400   {string}    string "Failed to insert onboarding response"
//		@Router			/api/profiles/response/{pid}  [patch]
func (p *ProfileController) InsertOnboardingResponse(c echo.Context) error {
	var onboardingResponse types.OnboardingResponse
	// var requestBody types.RequestBody
	profileID := c.Param("pid")
	userID := c.Param("uid")

	body, err := io.ReadAll(c.Request().Body)
	if err != nil {
		return c.JSON(http.StatusBadRequest, "Failed to read request body")
	}
	defer c.Request().Body.Close()

	// Unmarshal the nested JSON string inside "body" into onboardingResponse
	if err := json.Unmarshal([]byte(body), &onboardingResponse); err != nil {
		return c.JSON(http.StatusBadRequest, "Failed to unmarhsal the request body")
	}

	profile, err := p.profileService.InsertOnboardingResponse(userID, profileID, onboardingResponse)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, "Failed to process onboarding response")
	}

	return c.JSON(http.StatusOK, profile)
}

// SetOnboardingComplete godoc
//
//		@Summary		Sets onboarding complete
//		@Description	Sets onboarding complete
//		@ID				set-onboarding-complete
//		@Tags			profile
//		@Accept			json
//		@Produce		json
//	    @Param          pid	  path  string	true	"ProfileID"
//		@Success		200	  {object}	  models.Profile
//		@Failure        400   {string}    string "Failed to set onboarding complete"
//		@Router			/api/profiles/complete/{pid}  [patch]
func (p *ProfileController) SetOnboardingComplete(c echo.Context) error {
	profileID := c.Param("pid")

	profile, err := p.profileService.SetOnboardingComplete(profileID)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, "Failed to set onboarding complete")
	}

	return c.JSON(http.StatusOK, profile)
}

// DeleteProfile godoc
//
//		@Summary		Deletes a profile
//		@Description	Deletes a profile
//		@ID				delete-profile
//		@Tags			profile
//		@Produce		json
//	    @Param          pid	  path  string	true	"ProfileID"
//		@Success		200	  {string}	  string "Successfully deleted profile"
//	  	@Failure        404   {string}    string "Failed to delete profile"
//		@Router			/api/profiles/{pid}  [delete]
func (p *ProfileController) DeleteProfile(c echo.Context) error {
	profileID := c.Param("pid")
	err := p.profileService.DeleteProfile(profileID)

	if err != nil {
		return c.JSON(http.StatusNotFound, "Failed to delete profile")
	}

	return c.JSON(http.StatusOK, "Successfully deleted profile")
}
