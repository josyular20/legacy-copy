package controllers

import (
	"net/http"
	"server/src/services"

	"github.com/labstack/echo/v4"
)

type ProgressController struct {
	progressService services.ProgressServiceInterface
}

func NewProgressController(progressService services.ProgressServiceInterface) *ProgressController {
	return &ProgressController{progressService: progressService}
}

// GetTaskProgress godoc
//
// 	@Summary Get task progress
// 	@Description Get progress of a specific task for a user
// 	@ID get-task-progress
// 	@Tags progress
// 	@Param uid path string true "User ID"
// 	@Param tid path string true "Task ID"
// 	@Produce json
// 	@Success 200 {object} models.TaskProgress
// 	@Failure 404 {string} string "Failed to fetch task progress"
// 	@Router /api/progresses/task/{uid}/{tid} [get]
func (p *ProgressController) GetTaskProgress(c echo.Context) error {
	userID := c.Param("uid")
	taskID := c.Param("tid")
	taskProgress, err := p.progressService.GetTaskProgress(userID, taskID)

	if err != nil {
		return c.JSON(http.StatusNotFound, "failed to fetch task progress")
	}

	return c.JSON(http.StatusOK, taskProgress)
}

// GetSubTaskProgress godoc
// 
// 	@Summary Get subtask progress
// 	@Description Get progress of a specific subtask for a user
// 	@ID get-subtask-progress
// 	@Tags progress
// 	@Param uid path string true "User ID"
// 	@Param sid path string true "Subtask ID"
// 	@Produce json
// 	@Success 200 {object} models.SubTaskProgress
//	@Failure 404 {string} string "Failed to fetch subtask progress"
//	@Router /api/progresses/subtask/{uid}/{sid} [get]
func (p *ProgressController) GetSubTaskProgress(c echo.Context) error {
	userID := c.Param("uid")
	subTaskID := c.Param("sid")
	subTaskProgress, err := p.progressService.GetSubTaskProgress(userID, subTaskID)

	if err != nil {
		return c.JSON(http.StatusNotFound, "failed to fetch subtask progress")
	}

	return c.JSON(http.StatusOK, subTaskProgress)
}

// CompleteSubTaskProgress godoc
// 
// 	@Summary Complete subtask progress
// 	@Description Mark a subtask as completed for a user
//	@ID complete-subtask-progress
//	@Tags progress
// 	@Param uid path string true "User ID"
// 	@Param sid path string true "Subtask ID"
// 	@Produce json
// 	@Success 200 {object} models.SubTaskProgress
// 	@Failure 404 {string} string "Failed to complete subtask progress"
// 	@Router /api/progresses/subtask/{uid}/{sid}/complete [put]
func (p *ProgressController) CompleteSubTaskProgress(c echo.Context) error {
	userID := c.Param("uid")
	subTaskID := c.Param("sid")
	subTaskProgress, err := p.progressService.CompleteSubTaskProgress(userID, subTaskID)

	if err != nil {
		return c.JSON(http.StatusNotFound, "failed to complete subtask progress")
	}

	return c.JSON(http.StatusOK, subTaskProgress)
}

// GetAllSubTaskProgressOfTask godoc
//
// 	@Summary Get all subtask progresses of a task
//	@Description Get all subtask progresses for a specific task of a user
// 	@ID get-all-subtask-progress
// 	@Tags progress
// 	@Param uid path string true "User ID"
// 	@Param tid path string true "Task ID"
// 	@Produce json
// 	@Success 200 {object} []models.SubTaskProgress
// 	@Failure 404 {string} string "Failed to fetch all subtask progresses of task"
// 	@Router /api/progresses/{uid}/{tid} [get]
func (p *ProgressController) GetAllSubTaskProgressOfTask(c echo.Context) error {
	userID := c.Param("uid")
	taskID := c.Param("tid")
	subTaskProgress, err := p.progressService.GetAllSubTaskProgressOfTask(userID, taskID)

	if err != nil {
		return c.JSON(http.StatusNotFound, "failed to fetch all subtask progresses of task")
	}

	return c.JSON(http.StatusOK, subTaskProgress)
}
