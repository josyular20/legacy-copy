package controllers

import (
	"net/http"
	"server/src/models"
	"server/src/services"

	"github.com/labstack/echo/v4"
)

type PersonaController struct {
	personaService services.PersonaServiceInterface
}

func NewPersonaController(personaService services.PersonaServiceInterface) *PersonaController {
	return &PersonaController{personaService: personaService}
}

// GetAllPersonas godoc
//
//		@Summary		Gets all personas
//		@Description	Returns all personas
//		@ID				get-all-personas
//		@Tags			persona
//		@Produce		json
//		@Success		200	  {object}	  []models.Persona
//	    @Failure        404   {string}    string "Failed to fetch personas"
//		@Router			/api/personas/  [get]
func (p *PersonaController) GetAllPersonas(c echo.Context) error {
	personas, err := p.personaService.GetAllPersonas()
	if err != nil {
		return c.JSON(http.StatusNotFound, "Failed to fetch personas")
	}

	return c.JSON(http.StatusOK, personas)
}

// GetPersona godoc
//
//		@Summary		Gets a persona from persona id
//		@Description	Returns a persona from persona id
//		@ID				get-persona
//		@Tags			persona
//		@Produce		json
//		@Param          pid	  path  string	true	"PersonaID"
//		@Success		200	  {object}	  models.Persona
//	 	@Failure        404   {string}    string "Failed to fetch persona"
//		@Router			/api/personas/{pid}  [get]
func (p *PersonaController) GetPersona(c echo.Context) error {
	personaID := c.Param("pid")
	persona, err := p.personaService.GetPersona(personaID)

	if err != nil {
		return c.JSON(http.StatusNotFound, "Failed to fetch persona")
	}

	return c.JSON(http.StatusOK, persona)
}

// GetPersonaTasks godoc
//
//		@Summary		Gets all tasks for a persona
//		@Description	Returns all tasks for a persona
//		@ID				get-persona-tasks
//		@Tags			persona
//		@Produce		json
//		@Param          pid	  path  string	true	"PersonaID"
//		@Success		200	  {object}	  []models.Task
//	 	@Failure        404   {string}    string "Failed to fetch persona tasks"
//		@Router			/api/personas/{pid}/tasks  [get]
func (p *PersonaController) GetPersonaTasks(c echo.Context) error {
	personaID := c.Param("pid")
	tasks, err := p.personaService.GetPersonaTasks(personaID)

	if err != nil {
		return c.JSON(http.StatusNotFound, "Failed to fetch persona tasks")
	}

	return c.JSON(http.StatusOK, tasks)
}

// CreatePersona godoc
//
//		@Summary		Creates a persona
//		@Description	Creates a persona
//		@ID				create-persona
//		@Tags			persona
//		@Accept			json
//		@Produce		json
//		@Param			persona body docmodels.PersonaDTO true "Persona"
//		@Success		200	  {object}	  models.Persona
//	    @Failure        400   {string}    string "Failed to process the request"
//	    @Failure        400   {string}    string "Failed to validate the data"
//		@Failure        400   {string}    string "Failed to create persona"
//		@Router			/api/personas/  [post]
func (p *PersonaController) CreatePersona(c echo.Context) error {
	var persona models.Persona

	if err := c.Bind(&persona); err != nil {
		return c.JSON(http.StatusBadRequest, "Failed to process the request")
	}

	if err := services.ValidateData(c, persona); err != nil {
		return c.JSON(http.StatusBadRequest, "Failed to validate the data")
	}

	user, err := p.personaService.CreatePersona(persona)
	if err != nil {
		return c.JSON(http.StatusBadRequest, "Failed to create persona")
	}

	return c.JSON(http.StatusOK, user)
}

// UpdatePersona godoc
//
//		@Summary		Updates a persona
//		@Description	Updates a persona
//		@ID				update-persona
//		@Tags			persona
//		@Accept			json
//		@Produce		json
//		@Param          pid	  path  string	true	"PersonaID"
//		@Param			persona body docmodels.PersonaDTO true "Persona"
//		@Success		200	  {object}	  models.Persona
//	    @Failure        400   {string}    string "Failed to process the request"
//		@Failure        400   {string}    string "Failed to update persona"
//		@Router			/api/personas/{pid}  [patch]
func (p *PersonaController) UpdatePersona(c echo.Context) error {
	var persona models.Persona
	personaID := c.Param("pid")

	if err := c.Bind(&persona); err != nil {
		return c.JSON(http.StatusNotFound, "Failed to bind persona")
	}

	persona, err := p.personaService.UpdatePersona(personaID, persona)
	if err != nil {
		return c.JSON(http.StatusNotFound, "Failed to update persona")
	}

	return c.JSON(http.StatusOK, persona)
}

// DeletePersona godoc
//
//		@Summary		Deletes a persona
//		@Description	Deletes a persona
//		@ID				delete-persona
//		@Tags			persona
//		@Produce		json
//	    @Param          pid	  path  string	true	"PersonaID"
//		@Success		200	  {string}	  string "Persona successfully deleted"
//		@Failure        404   {string}    string "Failed to delete persona"
//		@Router			/api/personas/{pid}  [delete]
func (p *PersonaController) DeletePersona(c echo.Context) error {
	personaID := c.Param("pid")
	err := p.personaService.DeletePersona(personaID)
	if err != nil {
		return c.JSON(http.StatusNotFound, "Failed to delete persona")
	}

	return c.JSON(http.StatusOK, "Persona successfully deleted")
}
