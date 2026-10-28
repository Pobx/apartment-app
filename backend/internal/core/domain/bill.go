package domain

import "time"

type BillItem struct {
	CategoryName      string  `json:"category_name"`
	LatestUnitAmount  float64 `json:"latest_unit_amount"`
	CurrentUnitAmount float64 `json:"current_unit_amount"`
	UnitAmount        float64 `json:"unit_amount"`
	PricePerUnit      float64 `json:"price_per_unit"`
	TotalPrice        float64 `json:"total_price"`
}

type BillReceipt struct {
	RoomID              uint       `json:"room_id"`
	RoomName            string     `json:"room_name"`
	ApartmentName       string     `json:"apartment_name"`
	RenterName          string     `json:"renter_name"`
	Month               string     `json:"month"`
	UtilityMemoDateTH   string     `json:"utility_memo_date_th"` // d/m/YYYY (Buddhist Era +543)
	UtilityMemoDateEN   string     `json:"utility_memo_date_en"`
	UtilityMemoYearTH   string     `json:"utility_memo_year_th"`
	RoomPrice           float64    `json:"room_price"`
	Items               []BillItem `json:"items"`
	TotalUtilitiesPrice float64    `json:"total_utilities_price"`
	GrandTotalPrice     float64    `json:"grand_total_price"`
	Filename            string     `json:"filename,omitempty"`
	LinkURL             string     `json:"link_url,omitempty"`
}

func CalculateUtilityPrice(currentUnit, latestUnit, minRate, minPrice, pricePerUnit float64) (unitAmount float64, totalPrice float64) {
	if currentUnit > latestUnit {
		unitAmount = currentUnit - latestUnit
	} else {
		unitAmount = 0
	}

	if unitAmount <= minRate {
		totalPrice = minPrice
	} else {
		totalPrice = unitAmount * pricePerUnit
	}
	return unitAmount, totalPrice
}

func CalculateGrandTotal(roomPrice float64, utilityItemsTotal float64) float64 {
	return roomPrice + utilityItemsTotal
}

func FormatThaiBuddhistDate(t time.Time) string {
	buddhistYear := t.Year() + 543
	return t.Format("02/01/") + string(rune(buddhistYear))
}
