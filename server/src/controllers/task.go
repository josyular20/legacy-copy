package controllers

import (
	"net/http"
	"server/src/models"
	"server/src/services"
	"strings"

	"github.com/labstack/echo/v4"
)

type TaskController struct {
	taskService services.TaskServiceInterface
}

func NewTaskController(taskService services.TaskServiceInterface) *TaskController {
	return &TaskController{taskService: taskService}
}

// GetTask godoc
//
//		@Summary		Gets a task from task id
//		@Description	Returns a task from task id
//		@ID				get-task
//		@Tags			task
//		@Produce		json
//		@Param          tid	  path  string	true	"TaskID"
//		@Success		200	  {object}	  models.Task
//	 	@Failure        404   {string}    string "Failed to fetch task"
//		@Router			/api/tasks/{tid}  [get]
func (t *TaskController) GetTask(c echo.Context) error {
	taskID := c.Param("tid")

	task, err := t.taskService.GetTask(taskID)
	if err != nil {
		return c.JSON(http.StatusNotFound, "Failed to fetch task")
	}

	return c.JSON(http.StatusOK, task)
}

// GetTaskTag godoc
//
//		@Summary		Gets a task tag from task id
//		@Description	Returns a task tag from task id
//		@ID				get-task-tag
//		@Tags			task
//		@Produce		json
//		@Param          tid	  path  string	true	"TaskID"
//		@Success		200	  {object}	  string
//	 	@Failure        404   {string}    string "Failed to fetch task tag"
//		@Router			/api/tasks/{tid}/tags  [get]
func (t *TaskController) GetTaskTag(c echo.Context) error {
	taskID := c.Param("tid")

	tag, err := t.taskService.GetTaskTag(taskID)
	if err != nil {
		return c.JSON(http.StatusNotFound, "Failed to fetch task tag")
	}

	return c.JSON(http.StatusOK, tag)
}

// GetAllTasks godoc
//
//		@Summary		Gets all tasks
//		@Description	Returns all tasks
//		@ID				get-all-tasks
//		@Tags			task
//		@Produce		json
//		@Success		200	  {object}	  []models.Task
//	    @Failure        404   {string}    string "Failed to fetch tasks"
//		@Router			/api/tasks/  [get]
func (t *TaskController) GetAllTasks(c echo.Context) error {
	var tasks []models.Task

	tasks, err := t.taskService.GetAllTasks()
	if err != nil {
		return c.JSON(http.StatusNotFound, "Failed to fetch tasks")
	}

	return c.JSON(http.StatusOK, tasks)
}

// GetAllUserTasks godoc
//
//		@Summary		Gets all tasks of a user
//		@Description	Returns all tasks of a user
//		@ID				get-all-user-tasks
//		@Tags			task
//		@Produce		json
//		@Param          uid	  path  string	true	"UserID"
//	    @Param          tag	  query  string	false	"Tag"
//		@Success		200	  {object}	  []models.Task
//	    @Failure        404   {string}    string "Failed to fetch tasks"
//		@Router			/api/tasks/{uid}/user  [get]
func (t *TaskController) GetAllUserTasks(c echo.Context) error {
	userID := c.Param("uid")
	tag := c.QueryParam("tag")

	if tag != "" {
		tags := strings.Split(tag, ",")
		tasks, err := t.taskService.GetAllUserTasksWithTag(userID, tags)
		if err != nil {
			return c.JSON(http.StatusNotFound, "Failed to fetch tasks")
		}

		return c.JSON(http.StatusOK, tasks)
	}

	tasks, err := t.taskService.GetAllUserTasks(userID)
	if err != nil {
		return c.JSON(http.StatusNotFound, "Failed to fetch tasks")
	}

	return c.JSON(http.StatusOK, tasks)
}

// GetAllSubTasksOfTask godoc
//
//		@Summary		Gets all subtasks of a task
//		@Description	Returns all subtasks of a task
//		@ID				get-all-subtasks-of-task
//		@Tags			task
//		@Produce		json
//		@Param          tid	  path  string	true	"TaskID"
//		@Success		200	  {object}	  []models.Task
//	    @Failure        404   {string}    string "Failed to fetch subtasks"
//		@Router			/api/tasks/{tid}/subtasks  [get]
func (t *TaskController) GetAllSubTasksOfTask(c echo.Context) error {
	taskID := c.Param("tid")
	subtasks, err := t.taskService.GetAllSubTasksOfTask(taskID)

	if err != nil {
		return c.JSON(http.StatusNotFound, "Failed to fetch subtasks")
	}

	return c.JSON(http.StatusOK, subtasks)
}

// CreateTask godoc
//
//		@Summary		Creates a task
//		@Description	Creates a task
//		@ID				create-task
//		@Tags			task
//		@Accept			json
//		@Produce		json
//		@Param          task	  body  docmodels.TaskDTO	true	"Task"
//		@Success		200	  {object}	  models.Task
//		@Failure        400   {string}    string "Failed to process the request"
//	    @Failure        400   {string}    string "Failed to validate the data"
//		@Failure        400   {string}    string "Failed to create task"
//		@Router			/api/tasks/  [post]
func (t *TaskController) CreateTask(c echo.Context) error {
	var task models.Task

	if err := c.Bind(&task); err != nil {
		return c.JSON(http.StatusBadRequest, "Failed to process the request")
	}

	if err := services.ValidateData(c, task); err != nil {
		return c.JSON(http.StatusBadRequest, "Failed to validate the data")
	}

	createdTask, err := t.taskService.CreateTask(task)
	if err != nil {
		return c.JSON(http.StatusBadRequest, "Failed to create task")
	}

	return c.JSON(http.StatusOK, createdTask)
}

// UpdateTask godoc
//
//		@Summary		Updates a task
//		@Description	Updates a task
//		@ID				update-task
//		@Tags			task
//		@Accept			json
//		@Produce		json
//	    @Param          tid	  path  string	true	"TaskID"
//		@Param         	task	  body  docmodels.TaskDTO	true	"Task"
//		@Success		200	  {object}	  models.Task
//	  	@Failure        400   {string}    string "Failed to process the request"
//		@Failure        400   {string}    string "Failed to update task"
//		@Router			/api/tasks/{tid}  [patch]
func (t *TaskController) UpdateTask(c echo.Context) error {
	var task models.Task
	taskID := c.Param("tid")

	if err := c.Bind(&task); err != nil {
		return c.JSON(http.StatusBadRequest, "Failed to process the request")
	}

	task, err := t.taskService.UpdateTask(taskID, task)
	if err != nil {
		return c.JSON(http.StatusBadRequest, "Failed to update task")
	}

	return c.JSON(http.StatusOK, task)
}

// DeleteTask godoc
//
//	@Summary		Deletes a task
//	@Description	Deletes a task
//	@ID				delete-task
//	@Tags			task
//	@Produce		json
//	@Param          tid	  path  string	true	"TaskID"
//	@Success		200	  {string}	  string "Task successfully deleted"
//	@Failure        404   {string}    string "Failed to delete task"
//	@Router			/api/tasks/{tid}  [delete]
func (t *TaskController) DeleteTask(c echo.Context) error {
	taskID := c.Param("tid")
	err := t.taskService.DeleteTask(taskID)

	if err != nil {
		return c.JSON(http.StatusNotFound, "Failed to delete task")
	}

	return c.JSON(http.StatusOK, "Task successfully deleted")
}
