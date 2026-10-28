package handlers

import (
	"net/http"
	"strconv"

	"github.com/labstack/echo/v4"

	"apartment-api/internal/core/domain"
	"apartment-api/internal/core/ports/inbound"
)

type APIHandler struct {
	aptService       inbound.ApartmentService
	roomService      inbound.RoomService
	renterService    inbound.RenterService
	utilityService   inbound.UtilityService
	billingService   inbound.BillingService
	dashboardService inbound.DashboardService
}

func NewAPIHandler(
	aptService inbound.ApartmentService,
	roomService inbound.RoomService,
	renterService inbound.RenterService,
	utilityService inbound.UtilityService,
	billingService inbound.BillingService,
	dashboardService inbound.DashboardService,
) *APIHandler {
	return &APIHandler{
		aptService:       aptService,
		roomService:      roomService,
		renterService:    renterService,
		utilityService:   utilityService,
		billingService:   billingService,
		dashboardService: dashboardService,
	}
}

// Apartments
func (h *APIHandler) GetApartments(c echo.Context) error {
	list, err := h.aptService.GetAllApartments()
	if err != nil {
		return c.JSON(http.StatusInternalServerError, err.Error())
	}
	return c.JSON(http.StatusOK, list)
}

func (h *APIHandler) CreateApartment(c echo.Context) error {
	var apt domain.Apartment
	if err := c.Bind(&apt); err != nil {
		return c.JSON(http.StatusBadRequest, err.Error())
	}
	if err := h.aptService.CreateApartment(&apt); err != nil {
		return c.JSON(http.StatusInternalServerError, err.Error())
	}
	return c.JSON(http.StatusCreated, apt)
}

func (h *APIHandler) UpdateApartment(c echo.Context) error {
	var apt domain.Apartment
	if err := c.Bind(&apt); err != nil {
		return c.JSON(http.StatusBadRequest, err.Error())
	}
	if err := h.aptService.UpdateApartment(&apt); err != nil {
		return c.JSON(http.StatusInternalServerError, err.Error())
	}
	return c.JSON(http.StatusOK, apt)
}

// Room Categories
func (h *APIHandler) GetRoomCategories(c echo.Context) error {
	list, err := h.aptService.GetAllRoomCategories()
	if err != nil {
		return c.JSON(http.StatusInternalServerError, err.Error())
	}
	return c.JSON(http.StatusOK, list)
}

func (h *APIHandler) CreateRoomCategory(c echo.Context) error {
	var cat domain.RoomCategory
	if err := c.Bind(&cat); err != nil {
		return c.JSON(http.StatusBadRequest, err.Error())
	}
	if err := h.aptService.CreateRoomCategory(&cat); err != nil {
		return c.JSON(http.StatusInternalServerError, err.Error())
	}
	return c.JSON(http.StatusCreated, cat)
}

func (h *APIHandler) UpdateRoomCategory(c echo.Context) error {
	var cat domain.RoomCategory
	if err := c.Bind(&cat); err != nil {
		return c.JSON(http.StatusBadRequest, err.Error())
	}
	if err := h.aptService.UpdateRoomCategory(&cat); err != nil {
		return c.JSON(http.StatusInternalServerError, err.Error())
	}
	return c.JSON(http.StatusOK, cat)
}

// Rooms
func (h *APIHandler) GetRooms(c echo.Context) error {
	list, err := h.roomService.GetAllRooms()
	if err != nil {
		return c.JSON(http.StatusInternalServerError, err.Error())
	}
	return c.JSON(http.StatusOK, list)
}

func (h *APIHandler) GetRoomByID(c echo.Context) error {
	id, _ := strconv.Atoi(c.Param("id"))
	room, err := h.roomService.GetRoomByID(uint(id))
	if err != nil {
		return c.JSON(http.StatusNotFound, "Room not found")
	}
	return c.JSON(http.StatusOK, room)
}

func (h *APIHandler) GetRoomsByApartmentID(c echo.Context) error {
	id, _ := strconv.Atoi(c.Param("id"))
	list, err := h.roomService.GetRoomsByApartmentID(uint(id))
	if err != nil {
		return c.JSON(http.StatusInternalServerError, err.Error())
	}
	return c.JSON(http.StatusOK, list)
}

func (h *APIHandler) CreateRoom(c echo.Context) error {
	var room domain.Room
	if err := c.Bind(&room); err != nil {
		return c.JSON(http.StatusBadRequest, err.Error())
	}
	if err := h.roomService.CreateRoom(&room); err != nil {
		return c.JSON(http.StatusInternalServerError, err.Error())
	}
	return c.JSON(http.StatusCreated, room.ID)
}

func (h *APIHandler) UpdateRoom(c echo.Context) error {
	var room domain.Room
	if err := c.Bind(&room); err != nil {
		return c.JSON(http.StatusBadRequest, err.Error())
	}
	if err := h.roomService.UpdateRoom(&room); err != nil {
		return c.JSON(http.StatusInternalServerError, err.Error())
	}
	return c.JSON(http.StatusOK, room)
}

// Renters
func (h *APIHandler) GetRenters(c echo.Context) error {
	list, err := h.renterService.GetAllRenters()
	if err != nil {
		return c.JSON(http.StatusInternalServerError, err.Error())
	}
	return c.JSON(http.StatusOK, list)
}

func (h *APIHandler) GetRenterByID(c echo.Context) error {
	id, _ := strconv.Atoi(c.Param("id"))
	r, err := h.renterService.GetRenterByID(uint(id))
	if err != nil {
		return c.JSON(http.StatusNotFound, "Renter not found")
	}
	return c.JSON(http.StatusOK, r)
}

func (h *APIHandler) CreateRenter(c echo.Context) error {
	var renter domain.Renter
	if err := c.Bind(&renter); err != nil {
		return c.JSON(http.StatusBadRequest, err.Error())
	}
	if err := h.renterService.CreateRenter(&renter); err != nil {
		return c.JSON(http.StatusInternalServerError, err.Error())
	}
	return c.JSON(http.StatusCreated, renter)
}

func (h *APIHandler) UpdateRenter(c echo.Context) error {
	var renter domain.Renter
	if err := c.Bind(&renter); err != nil {
		return c.JSON(http.StatusBadRequest, err.Error())
	}
	if err := h.renterService.UpdateRenter(&renter); err != nil {
		return c.JSON(http.StatusInternalServerError, err.Error())
	}
	return c.JSON(http.StatusOK, renter)
}

func (h *APIHandler) UpdateRenterStatus(c echo.Context) error {
	type StatusReq struct {
		ID     uint   `json:"id"`
		Status string `json:"status"`
	}
	var req StatusReq
	if err := c.Bind(&req); err != nil {
		return c.JSON(http.StatusBadRequest, err.Error())
	}
	if err := h.renterService.UpdateRenterStatus(req.ID, req.Status); err != nil {
		return c.JSON(http.StatusInternalServerError, err.Error())
	}
	return c.JSON(http.StatusOK, req)
}

// Utilities
func (h *APIHandler) GetUtilityCategories(c echo.Context) error {
	list, err := h.utilityService.GetCategories()
	if err != nil {
		return c.JSON(http.StatusInternalServerError, err.Error())
	}
	return c.JSON(http.StatusOK, list)
}

func (h *APIHandler) GetUtilityCategoryByID(c echo.Context) error {
	id, _ := strconv.Atoi(c.Param("id"))
	cat, err := h.utilityService.GetCategoryByID(uint(id))
	if err != nil {
		return c.JSON(http.StatusNotFound, "Utility category not found")
	}
	return c.JSON(http.StatusOK, cat)
}

func (h *APIHandler) CreateMonthlyUsage(c echo.Context) error {
	var usage domain.UtilityMonthlyUsage
	if err := c.Bind(&usage); err != nil {
		return c.JSON(http.StatusBadRequest, err.Error())
	}
	if err := h.utilityService.RecordMonthlyUsage(&usage); err != nil {
		return c.JSON(http.StatusInternalServerError, err.Error())
	}
	return c.JSON(http.StatusCreated, usage)
}

// Bills
func (h *APIHandler) GetBillByRoomID(c echo.Context) error {
	roomID, _ := strconv.Atoi(c.Param("rooms_id"))
	receipt, err := h.billingService.GetBillByRoomID(uint(roomID))
	if err != nil {
		return c.JSON(http.StatusInternalServerError, err.Error())
	}
	return c.JSON(http.StatusOK, receipt)
}

func (h *APIHandler) CreateBillByRoomAndMonth(c echo.Context) error {
	roomID, _ := strconv.Atoi(c.Param("rooms_id"))
	month := c.Param("month")
	receipt, err := h.billingService.CreateBill(uint(roomID), month)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, err.Error())
	}
	return c.JSON(http.StatusOK, echo.Map{
		"results":  receipt,
		"filename": "bill_" + month + ".png",
		"path":     "/public/attached_files/bill.png",
		"link_url": "/attached_files/bill.png",
	})
}

// Dashboard
func (h *APIHandler) GetDashboardStats(c echo.Context) error {
	stats, err := h.dashboardService.GetStats()
	if err != nil {
		return c.JSON(http.StatusInternalServerError, err.Error())
	}
	return c.JSON(http.StatusOK, stats)
}
