package database

import (
	"fmt"
	"server/src/models"
	"server/src/routes"
	"server/src/services"
	"server/src/utils"

	"github.com/labstack/echo/v4"
	echoSwagger "github.com/swaggo/echo-swagger"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
	"gorm.io/gorm/logger"
)

func connectDatabase(host, user, password, dbname, port string) (*gorm.DB, error) {
	var dsn string
	if dbname != "" {
		dsn = fmt.Sprintf(
			"host=%s user=%s password=%s dbname=%s port=%s sslmode=disable",
			host, user, password, dbname, port,
		)
	} else {
		dsn = fmt.Sprintf(
			"host=%s user=%s password=%s port=%s sslmode=disable",
			host, user, password, port,
		)
	}

	return gorm.Open(postgres.Open(dsn), &gorm.Config{
		Logger: logger.Default.LogMode(logger.Info),
	})
}

func AddRoutes(db *gorm.DB, e *echo.Echo) {
	// Utility routes
	e.GET("/swagger/*", echoSwagger.WrapHandler)
	e.GET("/health", func(c echo.Context) error { return utils.HealthCheck(c, db) })

	// Service routes
	userService := services.UserService{DB: db}
	profileService := services.ProfileService{DB: db}
	personaService := services.PersonaService{DB: db}
	taskService := services.TaskService{DB: db}
	subTaskService := services.SubTaskService{DB: db}
	fileService := services.FileService{DB: db}
	guideService := services.GuideService{DB: db}
	progressService := services.ProgressService{DB: db}

	routes.UserRoutes(e.Group("/api/users"), &userService)
	routes.ProfileRoutes(e.Group("/api/profiles"), &profileService)
	routes.PersonaRoutes(e.Group("/api/personas"), &personaService)
	routes.TaskRoutes(e.Group("/api/tasks"), &taskService)
	routes.SubTaskRoutes(e.Group("/api/subtasks"), &subTaskService)
	routes.FileRoutes(e.Group("/api/files"), &fileService)
	routes.GuideRoutes(e.Group("/api/guides"), &guideService)
	routes.ProgressRoutes(e.Group("/api/progresses"), &progressService)
}

func InitDB() (*gorm.DB, error) {
	dbHost := "localhost"
	dbUser := "postgres"
	dbPassword := "postgres"
	dbPort := "5432"
	dbName := "legacy"

	db, err := connectDatabase(dbHost, dbUser, dbPassword, dbName, dbPort)
	if err != nil {
		// Connection failed, attempt to create the database
		defaultDb, err := connectDatabase(dbHost, dbUser, dbPassword, "", dbPort)
		if err != nil {
			return nil, fmt.Errorf("failed to connect to PostgreSQL: %v", err)
		}

		defaultDb.Exec("CREATE DATABASE " + dbName)

		// Try connecting to the new database
		db, err = connectDatabase(dbHost, dbUser, dbPassword, dbName, dbPort)
		if err != nil {
			return nil, fmt.Errorf("failed to connect to new PostgreSQL database: %v", err)
		}
	}

	if err := db.AutoMigrate(
		&models.File{},
		&models.Persona{},
		&models.SubTaskProgress{},
		&models.SubTask{},
		&models.TaskProgress{},
		&models.Task{},
		&models.Profile{},
		&models.User{},
		&models.Guide{},
		&models.Tag{},
	); err != nil {
		return nil, fmt.Errorf("failed to perform database auto migration: %v", err)
	}

	return db, nil
}
