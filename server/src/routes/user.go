package routes

import (
	"server/src/controllers"
	"server/src/services"

	"github.com/labstack/echo/v4"
)

func UserRoutes(g *echo.Group, userService services.UserServiceInterface) {
	userController := controllers.NewUserController(userService)

	g.GET("/", userController.GetAllUsers)
	g.GET("/:uid", userController.GetUser)
	g.GET("/username/:username", userController.GetUserFromUsername)
	g.GET("/firebase/:firebaseid", userController.GetUserFromFirebaseID)

	g.GET("/:uid/persona", userController.GetUserPersona)
	g.GET("/:uid/profile", userController.GetUserProfile)

	g.POST("/", userController.CreateUser)
	g.PATCH("/:uid", userController.UpdateUser)
	g.DELETE("/:uid", userController.DeleteUser)

	g.POST("/:uid/progress", userController.InitializeUserProgress)
}
