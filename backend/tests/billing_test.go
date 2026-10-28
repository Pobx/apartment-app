package tests

import (
	"testing"

	"apartment-api/internal/core/domain"
)

func TestCalculateUtilityPrice_UnderMinRate(t *testing.T) {
	// Min rate = 5 units, Min price = 100 THB, Unit price = 18 THB
	current := 454.0
	latest := 450.0 // usage = 4 units (<= 5)
	minRate := 5.0
	minPrice := 100.0
	pricePerUnit := 18.0

	usage, total := domain.CalculateUtilityPrice(current, latest, minRate, minPrice, pricePerUnit)

	if usage != 4.0 {
		t.Errorf("Expected usage 4.0, got %v", usage)
	}
	if total != 100.0 {
		t.Errorf("Expected total 100.0 (min price), got %v", total)
	}
}

func TestCalculateUtilityPrice_OverMinRate(t *testing.T) {
	current := 1320.0
	latest := 1240.0 // usage = 80 units (> 1)
	minRate := 1.0
	minPrice := 50.0
	pricePerUnit := 8.0

	usage, total := domain.CalculateUtilityPrice(current, latest, minRate, minPrice, pricePerUnit)

	if usage != 80.0 {
		t.Errorf("Expected usage 80.0, got %v", usage)
	}
	expectedTotal := 80.0 * 8.0 // 640.0
	if total != expectedTotal {
		t.Errorf("Expected total %v, got %v", expectedTotal, total)
	}
}

func TestCalculateGrandTotal(t *testing.T) {
	roomPrice := 3500.0
	utilityTotal := 640.0 + 380.0 // 1020.0

	grandTotal := domain.CalculateGrandTotal(roomPrice, utilityTotal)
	if grandTotal != 4520.0 {
		t.Errorf("Expected grand total 4520.0, got %v", grandTotal)
	}
}
