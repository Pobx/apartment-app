package main

import (
	"log"
	"os"

	"apartment-api/internal/adapters/inbound/http"
	"apartment-api/internal/adapters/inbound/http/handlers"
	"apartment-api/internal/adapters/outbound/persistence/mysql"
	"apartment-api/internal/core/services"
)

func main() {
	log.Println("Starting Apartment API (Golang + Echo + Hexagonal)...")

	// 1. Initialize Outbound Persistence Adapter (MySQL / In-Memory Fallback)
	db := mysql.InitDB()
	repoContainer := mysql.NewRepositoryContainer(db)

	aptRepo := mysql.NewApartmentRepo(repoContainer)
	catRepo := mysql.NewRoomCategoryRepo(repoContainer)
	roomRepo := mysql.NewRoomRepo(repoContainer)
	renterRepo := mysql.NewRenterRepo(repoContainer)
	utilityRepo := mysql.NewUtilityRepo(repoContainer)
	dashboardRepo := mysql.NewDashboardRepo(repoContainer)

	// 2. Initialize Core Domain Services (Inbound Ports)
	aptService := services.NewApartmentService(aptRepo, catRepo)
	roomService := services.NewRoomService(roomRepo)
	renterService := services.NewRenterService(renterRepo)
	utilityService := services.NewUtilityService(utilityRepo)
	billingService := services.NewBillingService(roomRepo, utilityRepo)
	dashboardService := services.NewDashboardService(dashboardRepo)

	// 3. Initialize Inbound Driving Adapter (Echo HTTP Handlers & Router)
	apiHandler := handlers.NewAPIHandler(
		aptService,
		roomService,
		renterService,
		utilityService,
		billingService,
		dashboardService,
	)

	router := http.SetupRouter(apiHandler)

	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	log.Printf("Server listening on :%s", port)
	if err := router.Start(":" + port); err != nil {
		log.Fatalf("Server terminated: %v", err)
	}
}
