package controllers

import (
	"net/http"
	"server/src/models"
	"server/src/services"

	"github.com/labstack/echo/v4"
)

type UserController struct {
	userService services.UserServiceInterface
}

func NewUserController(userService services.UserServiceInterface) *UserController {
	return &UserController{userService: userService}
}

// GetAllUsers godoc
//
//		@Summary		Gets all users
//		@Description	Returns all users
//		@ID				get-all-users
//		@Tags			user
//		@Produce		json
//		@Success		200	  {object}	  []models.User
//	    @Failure        404   {string}    string "Failed to fetch users"
//		@Router			/api/users/  [get]
func (u *UserController) GetAllUsers(c echo.Context) error {
	users, err := u.userService.GetAllUsers()
	if err != nil {
		return c.JSON(http.StatusNotFound, "Failed to fetch users")
	}

	return c.JSON(http.StatusOK, users)
}

// GetUser godoc
//
//		@Summary		Gets a user from user id
//		@Description	Returns a user from user id
//		@ID				get-user
//		@Tags			user
//		@Produce		json
//		@Param          uid	  path  string	true	"UserID"
//		@Success		200	  {object}	  models.User
//	 	@Failure        404   {string}    string "Failed to fetch user"
//		@Router			/api/users/{uid}  [get]
func (u *UserController) GetUser(c echo.Context) error {
	userID := c.Param("uid")
	user, err := u.userService.GetUser(userID)

	if err != nil {
		return c.JSON(http.StatusNotFound, "Failed to fetch user")
	}

	return c.JSON(http.StatusOK, user)
}

// GetUserFromUsername godoc
//
//		@Summary		Gets a user from username
//		@Description	Returns a user from username
//		@ID				get-user-from-username
//		@Tags			user
//		@Produce		json
//	 	@Param          username	  path  string	true	"Username"
//		@Success		200	  {object}	  models.User
//		@Failure        404   {string}    string "Failed to fetch user"
//		@Router			/api/users/username/{username}  [get]
func (u *UserController) GetUserFromUsername(c echo.Context) error {
	username := c.Param("username")
	user, err := u.userService.GetUserFromUsername(username)

	if err != nil {
		return c.JSON(http.StatusNotFound, "Failed to fetch user")
	}

	return c.JSON(http.StatusOK, user)
}

// GetUserFromFirebaseId godoc
//
//		@Summary		Gets a user from firebase id
//		@Description	Returns a user from firebase id
//		@ID				get-user-from-firebaseid
//		@Tags			user
//		@Produce		json
//	 	@Param          firebaseid	  path  string	true	"FirebaseID"
//		@Success		200	  {object}	  models.User
//		@Failure        404   {string}    string "Failed to fetch user"
//		@Router			/api/users/firebaseid/{firebaseid}  [get]
func (u *UserController) GetUserFromFirebaseID(c echo.Context) error {
	firebaseID := c.Param("firebaseid")
	user, err := u.userService.GetUserFromFirebaseID(firebaseID)

	if err != nil {
		return c.JSON(http.StatusNotFound, "Failed to fetch user")
	}

	return c.JSON(http.StatusOK, user)
}

// GetUserPersona godoc
//
//		@Summary		Gets a user persona from user id
//		@Description	Returns a persona from user id
//		@ID				get-user-persona
//		@Tags			user
//		@Produce		json
//	    @Param          uid	  path  string	true	"UserID"
//		@Success		200	  {object}	  models.Persona
//		@Failure        404   {string}    string "Failed to fetch user persona"
//		@Router			/api/users/{uid}/persona  [get]
func (u *UserController) GetUserPersona(c echo.Context) error {
	userID := c.Param("uid")
	persona, err := u.userService.GetUserPersona(userID)

	if err != nil {
		return c.JSON(http.StatusNotFound, "Failed to fetch user persona")
	}

	return c.JSON(http.StatusOK, persona)
}

// GetUserProfile godoc
//
//		@Summary		Gets a user profile from user id
//		@Description	Returns a profile from user id
//		@ID				get-user-profile
//		@Tags			user
//		@Produce		json
//	    @Param          uid	  path  string	true	"UserID"
//		@Success		200	  {object}	  models.Profile
//		@Failure        404   {string}    string "Failed to fetch user profile"
//		@Router			/api/users/{uid}/profile  [get]
func (u *UserController) GetUserProfile(c echo.Context) error {
	userID := c.Param("uid")
	profile, err := u.userService.GetUserProfile(userID)

	if err != nil {
		return c.JSON(http.StatusNotFound, "Failed to fetch user profile")
	}

	return c.JSON(http.StatusOK, profile)
}

// CreateUser godoc
//
//		@Summary		Creates a user
//		@Description	Creates a user
//		@ID				post-user
//		@Tags			user
//	 	@Accept         json
//		@Produce		json
//		@Param			account	body		docmodels.UserDTO	 true	"User"
//		@Success		200	  {object}	    models.User
//		@Failure        400   {string}    string "Failed to process the request"
//		@Failure        400   {string}    string "Failed to validate the data"
//		@Failure        400   {string}    string "Failed to create user"
//		@Router			/api/users/  [post]
func (u *UserController) CreateUser(c echo.Context) error {
	var user models.User

	if err := c.Bind(&user); err != nil {
		return c.JSON(http.StatusBadRequest, "Failed to process the request")
	}

	if err := services.ValidateData(c, user); err != nil {
		return c.JSON(http.StatusBadRequest, "Failed to validate the data")
	}

	createdUser, err := u.userService.CreateUser(user)
	if err != nil {
		return c.JSON(http.StatusBadRequest, "Failed to create user")
	}

	return c.JSON(http.StatusOK, createdUser)
}

// InitializeUserProgress godoc
//
//		@Summary		Initializes user progress
//		@Description	Initializes all tasks and subtasks for a user
//		@ID				initialize-user-progress
//		@Tags			user
//		@Produce		json
//	    @Param          uid	  path  string	true	"UserID"
//		@Success		200	  {object}	  map[string]interface{}
//		@Failure        404   {string}    string "Failed to initialize user progress"
//		@Router			/api/users/{uid}/progress  [post]
func (u *UserController) InitializeUserProgress(c echo.Context) error {
	userID := c.Param("uid")

	task, subtask, err := u.userService.InitializeUserProgress(userID)
	if err != nil {
		return c.JSON(http.StatusNotFound, "Failed to initialize user progress")
	}

	return c.JSON(http.StatusOK, map[string]interface{}{
		"task":    task,
		"subtask": subtask,
	})
}

// UpdateUser godoc
//
//		@Summary		Updates a user
//		@Description	Updates a user
//		@ID				update-user
//		@Tags			user
//	 	@Accept         json
//		@Produce		json
//	    @Param          uid	  path  string	true	"UserID"
//		@Param			account	body	  docmodels.UserDTO	 true	"User"
//		@Success		200	  {object}	  models.User
//		@Failure        400   {string}    string "Failed to process the request"
//		@Failure        400   {string}    string "Failed to update user"
//		@Router			/api/users/{uid}  [patch]
func (u *UserController) UpdateUser(c echo.Context) error {
	var user models.User
	userID := c.Param("uid")

	if err := c.Bind(&user); err != nil {
		return c.JSON(http.StatusBadRequest, "Failed to process the request")
	}

	user, err := u.userService.UpdateUser(userID, user)
	if err != nil {
		return c.JSON(http.StatusBadRequest, "Failed to update user")
	}

	return c.JSON(http.StatusOK, user)
}

// DeleteUser godoc
//
//		@Summary		Deletes a user
//		@Description	Deletes a user
//		@ID				delete-user
//		@Tags			user
//		@Produce		json
//	    @Param          uid	  path  string	true	"UserID"
//		@Success		200	  {string}	  string "User successfully deleted"
//		@Failure        404   {string}    string "Failed to delete user"
//		@Router			/api/users/{uid}  [delete]
func (u *UserController) DeleteUser(c echo.Context) error {
	userID := c.Param("uid")
	err := u.userService.DeleteUser(userID)

	if err != nil {
		return c.JSON(http.StatusNotFound, "Failed to delete user")
	}

	return c.JSON(http.StatusOK, "User successfully deleted")
}
