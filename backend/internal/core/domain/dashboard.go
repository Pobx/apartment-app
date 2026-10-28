package domain

type MonthlyTrend struct {
	Month            string  `json:"month"`             // e.g. "พ.ค.", "มิ.ย."
	ElectricityUnits float64 `json:"electricity_units"` // kWh
	WaterUnits       float64 `json:"water_units"`       // m3
	TotalCost        float64 `json:"total_cost"`
}

type FinancialSummary struct {
	CurrentMonthExpected float64 `json:"current_month_expected"`
	Collected            float64 `json:"collected"`
	Pending              float64 `json:"pending"`
}

type PendingMeterTask struct {
	RoomID        uint   `json:"room_id"`
	RoomName      string `json:"room_name"`
	RenterName    string `json:"renter_name"`
	ApartmentName string `json:"apartment_name"`
	Floor         int    `json:"floor"`
}

type DashboardStats struct {
	TotalRooms       int                `json:"total_rooms"`
	OccupiedRooms    int                `json:"occupied_rooms"`
	VacantRooms      int                `json:"vacant_rooms"`
	OccupancyRate    float64            `json:"occupancy_rate"` // e.g. 93.8
	TotalMetersBilled float64           `json:"total_meters_billed"`
	UtilityTrends    []MonthlyTrend     `json:"utility_trends"`
	Financial        FinancialSummary   `json:"financial"`
	PendingTasks     []PendingMeterTask `json:"pending_tasks"`
}
