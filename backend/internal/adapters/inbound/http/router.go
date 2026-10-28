package http

import (
	"net/http"

	"github.com/labstack/echo/v4"
	echomiddleware "github.com/labstack/echo/v4/middleware"

	"apartment-api/internal/adapters/inbound/http/handlers"
	"apartment-api/internal/adapters/inbound/http/middleware"
)

func SetupRouter(h *handlers.APIHandler) *echo.Echo {
	e := echo.New()

	// Global Middleware
	e.Use(echomiddleware.Logger())
	e.Use(echomiddleware.Recover())
	e.Use(echomiddleware.CORSWithConfig(echomiddleware.CORSConfig{
		AllowOrigins: []string{"*"},
		AllowMethods: []string{http.MethodGet, http.MethodHead, http.MethodPut, http.MethodPatch, http.MethodPost, http.MethodDelete},
		AllowHeaders: []string{"*"},
	}))

	// Health check
	e.GET("/", func(c echo.Context) error {
		return c.String(http.StatusOK, "Apartment API (Go Echo + Hexagonal) v2.0")
	})

	// Public routes
	e.POST("/uploads/image", func(c echo.Context) error {
		return c.JSON(http.StatusOK, echo.Map{"status": "uploaded", "url": "/uploads/image.png"})
	})
	e.POST("/uploads/file", func(c echo.Context) error {
		return c.JSON(http.StatusOK, echo.Map{"status": "uploaded", "url": "/uploads/file.pdf"})
	})

	// Protected routes (Keycloak Auth + Legacy Token Compatibility)
	api := e.Group("", middleware.KeycloakAuthMiddleware())
	{
		// Dashboard Stats (New Endpoint)
		api.GET("/dashboard/stats", h.GetDashboardStats)

		// Apartments
		api.GET("/apartments", h.GetApartments)
		api.POST("/apartments/create", h.CreateApartment, middleware.RequireRole("admin"))
		api.PUT("/apartments/update", h.UpdateApartment, middleware.RequireRole("admin"))

		// Room Categories
		api.GET("/room-categories", h.GetRoomCategories)
		api.POST("/room-categories/create", h.CreateRoomCategory, middleware.RequireRole("admin"))
		api.PUT("/room-categories/update", h.UpdateRoomCategory, middleware.RequireRole("admin"))

		// Rooms
		api.GET("/rooms", h.GetRooms)
		api.GET("/rooms-by-id/:id", h.GetRoomByID)
		api.GET("/rooms-by-apartment-id/:id", h.GetRoomsByApartmentID)
		api.POST("/rooms/create", h.CreateRoom, middleware.RequireRole("admin"))
		api.PUT("/rooms/update", h.UpdateRoom, middleware.RequireRole("admin"))

		// Renters
		api.GET("/renters", h.GetRenters)
		api.GET("/renters-by-id/:id", h.GetRenterByID)
		api.POST("/renters/create", h.CreateRenter)
		api.PUT("/renters/update", h.UpdateRenter)
		api.PUT("/renters/update-status", h.UpdateRenterStatus)

		// Utilities
		api.GET("/utilities-categories", h.GetUtilityCategories)
		api.GET("/utilities-categories-by-id/:id", h.GetUtilityCategoryByID)
		api.POST("/utilities-monthly-usage/create", h.CreateMonthlyUsage)

		// Bills
		api.GET("/bills-by-rooms-id/:rooms_id", h.GetBillByRoomID)
		api.GET("/bills-by-rooms-id-and-month/create/:rooms_id/:month", h.CreateBillByRoomAndMonth)
	}

	return e
}
