package routes

import (
	"server/src/controllers"
	"server/src/services"

	"github.com/labstack/echo/v4"
)

func FileRoutes(g *echo.Group, fileService services.FileServiceInterface) {
	fileController := controllers.NewFileController(fileService)

	g.GET("/", fileController.GetAllFiles)
	g.GET("/:fid/filename", fileController.GetFilename)
	g.GET("/:uid/user", fileController.GetAllUserFiles)
	g.GET("/:fid", fileController.GetFileURL) // to GetFileURL
	g.POST("/:uid", fileController.CreateFile)
	g.POST("/makepdf/:uid/:sub_task_name", fileController.GeneratePDF) // update makepdf to generate
	g.DELETE("/:fid", fileController.DeleteFile)
}
