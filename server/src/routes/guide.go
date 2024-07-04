package routes

import (
	"server/src/controllers"
	"server/src/services"

	"github.com/labstack/echo/v4"
)

func GuideRoutes(g *echo.Group, guideService services.GuideServiceInterface) {
	guideController := controllers.NewGuideController(guideService)

	g.GET("/", guideController.GetAllGuides)
	g.GET("/:g_name", guideController.GetGuide)
	g.POST("/", guideController.CreateGuide)
	g.DELETE("/:g_name", guideController.DeleteGuide)
}
