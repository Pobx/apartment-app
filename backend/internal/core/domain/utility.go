package domain

import "time"

type UtilityType string

const (
	UtilityTypeUnit    UtilityType = "unit"
	UtilityTypeMonthly UtilityType = "monthly"
)

type UtilityCategory struct {
	ID                uint        `json:"id" gorm:"primaryKey;autoIncrement"`
	Name              string      `json:"name" gorm:"size:100;not null"`
	PricePerUnitCost  float64     `json:"price_per_unit_cost" gorm:"type:decimal(10,2);default:0"`
	PricePerUnit      float64     `json:"price_per_unit" gorm:"type:decimal(10,2);default:0"`
	UnitMinRate       float64     `json:"unit_min_rate" gorm:"type:decimal(10,2);default:0"`
	UnitMinPrice      float64     `json:"unit_min_price" gorm:"type:decimal(10,2);default:0"`
	Type              UtilityType `json:"type" gorm:"type:enum('unit','monthly');default:'unit'"`
	Status            string      `json:"status" gorm:"type:enum('active','disabled');default:'active'"`
	CreatedAt         time.Time   `json:"created_at"`
	UpdatedAt         time.Time   `json:"updated_at"`
}

type UtilityPackage struct {
	ID        uint                 `json:"id" gorm:"primaryKey;autoIncrement"`
	Name      string               `json:"name" gorm:"size:100;not null"`
	Status    string               `json:"status" gorm:"type:enum('active','disabled');default:'active'"`
	CreatedAt time.Time            `json:"created_at"`
	UpdatedAt time.Time            `json:"updated_at"`
	Items     []UtilityPackageItem `json:"items,omitempty" gorm:"foreignKey:UtilitiesPackagesID"`
}

type UtilityPackageItem struct {
	ID                  uint             `json:"id" gorm:"primaryKey;autoIncrement"`
	UtilitiesPackagesID uint             `json:"utilities_packages_id" gorm:"not null"`
	UtilityCategoriesID uint             `json:"utility_categories_id" gorm:"not null"`
	Status              string           `json:"status" gorm:"type:enum('active','disabled');default:'active'"`
	CreatedAt           time.Time        `json:"created_at"`
	UpdatedAt           time.Time        `json:"updated_at"`
	UtilityCategory     *UtilityCategory `json:"utility_category,omitempty" gorm:"foreignKey:UtilityCategoriesID"`
}

type UtilityMonthlyUsage struct {
	ID                  uint             `json:"id" gorm:"primaryKey;autoIncrement"`
	RoomID              *uint            `json:"room_id"`
	UtilityCategoriesID *uint            `json:"utility_categories_id"`
	UtilityMemoDate     *time.Time       `json:"utility_memo_date"`
	LatestUnitAmount    float64          `json:"latest_unit_amount" gorm:"type:decimal(10,2);default:0"`
	CurrentUnitAmount   float64          `json:"current_unit_amount" gorm:"type:decimal(10,2);default:0"`
	UnitAmount          float64          `json:"unit_amount" gorm:"type:decimal(10,2);default:0"`
	PricePerUnit        float64          `json:"price_per_unit" gorm:"type:decimal(10,2);default:0"`
	TotalPrice          float64          `json:"total_price" gorm:"type:decimal(10,2);default:0"`
	Status              string           `json:"status" gorm:"type:enum('active','disabled');default:'active'"`
	CreatedAt           time.Time        `json:"created_at"`
	UpdatedAt           time.Time        `json:"updated_at"`

	CategoryName        string           `json:"utilities_categories_name,omitempty" gorm:"->"`
	UtilityCategory     *UtilityCategory `json:"utility_category,omitempty" gorm:"foreignKey:UtilityCategoriesID"`
}
