package controllers

import (
	"net/http"
	"server/src/models"
	"server/src/services"

	"github.com/labstack/echo/v4"
)

type guideController struct {
	guideService services.GuideServiceInterface
}

func NewGuideController(guideService services.GuideServiceInterface) *guideController {
	return &guideController{guideService: guideService}
}

// GetAllGuides godoc
//
//		@Summary		Gets all guides
//		@Description	Returns all guides
//		@ID				get-all-guides
//		@Tags			guide
//		@Produce		json
//		@Success		200	  {object}	  []models.Guide
//	    @Failure        404   {string}    string "Failed to fetch guides"
//		@Router			/api/guides/  [get]
func (g *guideController) GetAllGuides(c echo.Context) error {
	guides, err := g.guideService.GetAllGuides()
	if err != nil {
		return c.JSON(http.StatusNotFound, "Failed to fetch guides")
	}

	return c.JSON(http.StatusOK, guides)
}

// GetGuide godoc
//
//		@Summary		Gets a guide from guide id
//		@Description	Returns a guide from guide id
//		@ID				get-guide
//		@Tags			guide
//		@Produce		json
//		@Param          g_name	  path  string	true	"GuideName"
//		@Success		200	  {object}	  models.Guide
//	 	@Failure        404   {string}    string "Failed to fetch guide"
//		@Router			/api/guides/{g_name}  [get]
func (g *guideController) GetGuide(c echo.Context) error {
	guideName := c.Param("g_name")
	guide, err := g.guideService.GetGuide(guideName)

	if err != nil {
		return c.JSON(http.StatusNotFound, "Failed to fetch guide")
	}

	return c.JSON(http.StatusOK, guide)
}

// CreateGuide godoc
//
//		@Summary		Creates a guide
//		@Description	Creates a guide
//		@ID				create-guide
//		@Tags			guide
//		@Accept			json
//		@Produce		json
//		@Param          guide	  body  docmodels.GuideDTO true	"Guide"
//		@Success		200	  {object}	  models.Guide
//	    @Failure        400   {string}    string "Failed to process the request"
//		@Failure        400   {string}    string "Failed to validate the data"
//		@Failure        400   {string}    string "Failed to create guide"
//		@Router			/api/guides/  [post]
func (g *guideController) CreateGuide(c echo.Context) error {
	var guide models.Guide

	if err := c.Bind(&guide); err != nil {
		return c.JSON(http.StatusBadRequest, "Failed to process the request")
	}

	if err := services.ValidateData(c, guide); err != nil {
		return c.JSON(http.StatusBadRequest, "Failed to validate the data")
	}

	user, err := g.guideService.CreateGuide(guide)
	if err != nil {
		return c.JSON(http.StatusBadRequest, "Failed to create guide")
	}

	return c.JSON(http.StatusOK, user)
}

// UpdateGuide godoc
//
//		@Summary		Updates a guide
//		@Description	Updates a guide
//		@ID				update-guide
//		@Tags			guide
//		@Accept			json
//		@Produce		json
//		@Param          g_name	  path  string	true	"GuideName"
//		@Param          guide	  body  docmodels.GuideDTO true	"Guide"
//		@Success		200	  {object}	  models.Guide
//	    @Failure        400   {string}    string "Failed to process the request"
//		@Failure        400   {string}    string "Failed to update guide"
//		@Router			/api/guides/{g_name}  [patch]
func (g *guideController) UpdateGuide(c echo.Context) error {
	var guide models.Guide
	guideID := c.Param("g_name")

	if err := c.Bind(&guide); err != nil {
		return c.JSON(http.StatusNotFound, "Failed to bind guide")
	}

	guide, err := g.guideService.UpdateGuide(guideID, guide)
	if err != nil {
		return c.JSON(http.StatusNotFound, "Failed to update guide")
	}

	return c.JSON(http.StatusOK, guide)
}

// DeleteGuide godoc
//
//		@Summary		Deletes a guide
//		@Description	Deletes a guide
//		@ID				delete-guide
//		@Tags			guide
//		@Produce		json
//		@Param          g_name	  path  string	true	"GuideName"
//		@Success		200	  {string}	  string "Guide successfully deleted"
//	    @Failure        404   {string}    string "Failed to delete guide"
//		@Router			/api/guides/{g_name}  [delete]
func (g *guideController) DeleteGuide(c echo.Context) error {
	guideName := c.Param("g_name")
	err := g.guideService.DeleteGuide(guideName)
	if err != nil {
		return c.JSON(http.StatusNotFound, "Failed to delete guide")
	}

	return c.JSON(http.StatusOK, "Guide successfully deleted")
}
