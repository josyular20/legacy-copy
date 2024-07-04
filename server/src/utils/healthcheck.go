package utils

import (
	"github.com/labstack/echo/v4"
	"gorm.io/gorm"
)

func HealthCheck(c echo.Context, db *gorm.DB) error {
	if err := db.Exec("SELECT 1").Error; err != nil {
		return c.JSON(500, "Database connection failed")
	}

	return c.JSON(200, "OK")
}
