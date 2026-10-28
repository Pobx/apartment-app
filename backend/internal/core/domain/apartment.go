package domain

import "time"

type ApartmentStatus string

const (
	ApartmentStatusNew         ApartmentStatus = "new_apartment"
	ApartmentStatusActive      ApartmentStatus = "active_apartment"
	ApartmentStatusDisabled    ApartmentStatus = "disabled_apartment"
	ApartmentStatusMaintenance ApartmentStatus = "maintennace_apartment"
)

type Apartment struct {
	ID        uint            `json:"id" gorm:"primaryKey;autoIncrement"`
	Name      string          `json:"name" gorm:"size:100;not null"`
	Status    ApartmentStatus `json:"status" gorm:"type:enum('new_apartment','active_apartment','disabled_apartment','maintennace_apartment');default:'new_apartment'"`
	CreatedAt time.Time       `json:"created_at"`
	UpdatedAt time.Time       `json:"updated_at"`
}

type RoomCategory struct {
	ID        uint      `json:"id" gorm:"primaryKey;autoIncrement"`
	Name      string    `json:"name" gorm:"size:100;not null"`
	Status    string    `json:"status" gorm:"type:enum('active','disabled');default:'active'"`
	CreatedAt time.Time `json:"created_at"`
	UpdatedAt time.Time `json:"updated_at"`
}
