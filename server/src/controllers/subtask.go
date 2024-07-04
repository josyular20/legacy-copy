package controllers

import (
	"net/http"
	"server/src/models"
	"server/src/services"

	"github.com/labstack/echo/v4"
)

type SubTaskController struct {
	subTaskService services.SubTaskServiceInterface
}

func NewSubTaskController(subTaskService services.SubTaskServiceInterface) *SubTaskController {
	return &SubTaskController{subTaskService: subTaskService}
}

// GetSubTasks godoc
//
//		@Summary		Gets all subtasks
//		@Description	Returns all subtasks
//		@ID				get-all-subtasks
//		@Tags			subtask
//		@Produce		json
//		@Success		200	  {object}	  []models.SubTask
//	    @Failure        404   {string}    string "Failed to fetch subtasks"
//		@Router			/api/subtasks/  [get]
func (t *SubTaskController) GetAllSubTasks(c echo.Context) error {
	subtasks, err := t.subTaskService.GetAllSubTasks()
	if err != nil {
		return c.JSON(http.StatusNotFound, "Failed to fetch subtasks")
	}

	return c.JSON(http.StatusOK, subtasks)
}

// GetSubTask godoc
//
//		@Summary		Gets a subtask from subtask id
//		@Description	Returns a subtask from subtask id
//		@ID				get-subtask
//		@Tags			subtask
//		@Produce		json
//	    @Param          sid	  path  string	true	"SubTaskID"
//		@Success		200	  {object}	  models.SubTask
//	 	@Failure        404   {string}    string "Failed to fetch subtask"
//		@Router			/api/subtasks/{sid}  [get]
func (t *SubTaskController) GetSubTask(c echo.Context) error {
	subTaskID := c.Param("sid")
	subTask, err := t.subTaskService.GetSubTask(subTaskID)

	if err != nil {
		return c.JSON(http.StatusNotFound, "Failed to fetch subtask")
	}

	return c.JSON(http.StatusOK, subTask)
}

// GetActions godoc
//
//		@Summary		Gets all actions from subtask id
//		@Description	Returns all actions from subtask id
//		@ID				get-actions
//		@Tags			subtask
//		@Produce		json
//		@Param          sid	  path  string	true	"SubTaskID"
//		@Success		200	  {object}	  []models.SubTask
//	 	@Failure        404   {string}    string "Failed to fetch subtask"
//		@Router			/api/subtasks/{sid}/actions  [get]
func (t *SubTaskController) GetActions(c echo.Context) error {
	subTaskID := c.Param("sid")
	subTask, err := t.subTaskService.GetActions(subTaskID)

	if err != nil {
		return c.JSON(http.StatusNotFound, "Failed to fetch subtask")
	}

	return c.JSON(http.StatusOK, subTask)
}

// CreateSubTask godoc
//
//		@Summary		Creates a subtask
//		@Description	Creates a subtask
//		@ID				create-subtask
//		@Tags			subtask
//		@Accept			json
//		@Produce		json
//		@Param          subtask	  body  docmodels.SubTaskDTO	true	"SubTask"
//		@Success		200	  {object}	  models.SubTask
//	  	@Failure        400   {string}    string "Failed to process the request"
//	    @Failure        400   {string}    string "Failed to validate the data"
//		@Failure        400   {string}    string "Failed to create subtask"
//		@Router			/api/subtasks/  [post]
func (t *SubTaskController) CreateSubTask(c echo.Context) error {
	var subTask models.SubTask

	if err := c.Bind(&subTask); err != nil {
		return c.JSON(http.StatusBadRequest, "Failed to process the request")
	}

	if err := services.ValidateData(c, subTask); err != nil {
		return c.JSON(http.StatusBadRequest, "Failed to validate the data")
	}

	createdTask, err := t.subTaskService.CreateSubTask(subTask)
	if err != nil {
		return c.JSON(http.StatusBadRequest, "Failed to create subtask")
	}

	return c.JSON(http.StatusOK, createdTask)
}

// UpdateSubTask godoc
//
//		@Summary		Updates a subtask
//		@Description	Updates a subtask
//		@ID				update-subtask
//		@Tags			subtask
//		@Accept			json
//		@Produce		json
//	    @Param          sid	  path  string	true	"SubTaskID"
//		@Param			subtask	body	docmodels.SubTaskDTO true	"SubTask"
//		@Success		200	  {object}	  models.SubTask
//	  	@Failure        400   {string}    string "Failed to process the request"
//		@Failure        400   {string}    string "Failed to update subtask"
//		@Router			/api/subtasks/{sid}  [patch]
func (t *SubTaskController) UpdateSubTask(c echo.Context) error {
	var subTask models.SubTask
	subTaskID := c.Param("sid")

	if err := c.Bind(&subTask); err != nil {
		return c.JSON(http.StatusNotFound, "Failed to bind subtask")
	}

	subTask, err := t.subTaskService.UpdateSubTask(subTaskID, subTask)
	if err != nil {
		return c.JSON(http.StatusNotFound, "Failed to update subtask")
	}

	return c.JSON(http.StatusOK, subTask)
}

// DeleteSubTask godoc
//
//		@Summary		Deletes a subtask
//		@Description	Deletes a subtask
//		@ID				delete-subtask
//		@Tags			subtask
//		@Produce		json
//	    @Param          sid	  path  string	true	"SubTaskID"
//		@Success		200	  {string}	  string "Subtask successfully deleted"
//	  	@Failure        404   {string}    string "Failed to delete subtask"
//		@Router			/api/subtasks/{sid}  [delete]
func (t *SubTaskController) DeleteSubTask(c echo.Context) error {
	subTaskID := c.Param("sid")
	err := t.subTaskService.DeleteSubTask(subTaskID)

	if err != nil {
		return c.JSON(http.StatusNotFound, "Failed to delete subtask")
	}

	return c.JSON(http.StatusOK, "Subtask successfully deleted")
}
