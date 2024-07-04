package routes

import (
	"server/src/controllers"
	"server/src/services"

	"github.com/labstack/echo/v4"
)

func PersonaRoutes(g *echo.Group, personaService services.PersonaServiceInterface) {
	personaController := controllers.NewPersonaController(personaService)

	g.GET("/", personaController.GetAllPersonas)
	g.GET("/:pid", personaController.GetPersona)
	g.GET("/:pid/tasks", personaController.GetPersonaTasks)

	g.POST("/", personaController.CreatePersona)
	g.PATCH("/:pid", personaController.UpdatePersona)
	g.DELETE("/:pid", personaController.DeletePersona)
}
