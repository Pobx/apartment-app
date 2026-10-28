package domain

import "time"

type RoomStatus string

const (
	RoomStatusActive   RoomStatus = "active"
	RoomStatusDisabled RoomStatus = "disabled"
	RoomStatusRented   RoomStatus = "rented_room"
)

type Room struct {
	ID                  uint            `json:"id" gorm:"primaryKey;autoIncrement"`
	Name                string          `json:"name" gorm:"size:100;not null"`
	ApartmentsID        *uint           `json:"apartments_id"`
	RoomCategoriesID    *uint           `json:"room_categories_id"`
	RentersID           *uint           `json:"renters_id"`
	UtilitiesPackagesID *uint           `json:"utilities_packages_id"`
	Price               float64         `json:"price" gorm:"type:decimal(10,2);default:0"`
	Status              RoomStatus      `json:"status" gorm:"type:enum('active','disabled','rented_room');default:'active'"`
	CreatedAt           time.Time       `json:"created_at"`
	UpdatedAt           time.Time       `json:"updated_at"`

	Apartments          *Apartment      `json:"apartments,omitempty" gorm:"foreignKey:ApartmentsID"`
	RoomCategories      *RoomCategory   `json:"room_categories,omitempty" gorm:"foreignKey:RoomCategoriesID"`
	Renters             *Renter         `json:"renters,omitempty" gorm:"foreignKey:RentersID"`
	UtilitiesPackages   *UtilityPackage `json:"utilities_packages,omitempty" gorm:"foreignKey:UtilitiesPackagesID"`
}
