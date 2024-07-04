package routes

import (
	"server/src/controllers"
	"server/src/services"

	"github.com/labstack/echo/v4"
)

func TaskRoutes(g *echo.Group, taskService services.TaskServiceInterface) {
	taskController := controllers.NewTaskController(taskService)

	g.GET("/", taskController.GetAllTasks)
	g.GET("/:tid", taskController.GetTask)
	g.GET("/:tid/tag", taskController.GetTaskTag)
	g.GET("/:uid/user", taskController.GetAllUserTasks)
	g.GET("/:tid/subtasks", taskController.GetAllSubTasksOfTask)
	g.POST("/", taskController.CreateTask)
	g.PATCH("/:tid", taskController.UpdateTask)
	g.DELETE("/:tid", taskController.DeleteTask)
}
