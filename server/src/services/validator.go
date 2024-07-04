package services

import (
	"github.com/go-playground/validator/v10"
	"github.com/labstack/echo/v4"
)

// Validate the data sent to the server if the data is invalid, return an error otherwise, return nil
func ValidateData(c echo.Context, model interface{}) error {
	validate := validator.New(validator.WithRequiredStructEnabled())
	if err := validate.Struct(model); err != nil {
		return err
	}

	return nil
}
