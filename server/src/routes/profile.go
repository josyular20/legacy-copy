package routes

import (
	"server/src/controllers"

	"server/src/services"

	"github.com/labstack/echo/v4"
)

func ProfileRoutes(g *echo.Group, profileService services.ProfileServiceInterface) {
	profileController := controllers.NewProfileController(profileService)

	g.GET("/", profileController.GetAllProfiles)
	g.GET("/:pid", profileController.GetProfile)
	g.POST("/", profileController.CreateProfile)
	g.PATCH("/:pid", profileController.UpdateProfile)
	g.PATCH("/response/:pid/:uid", profileController.InsertOnboardingResponse)
	g.PATCH("/complete/:pid", profileController.SetOnboardingComplete)
	g.DELETE("/:pid", profileController.DeleteProfile)
}
