package domain

import "time"

type Renter struct {
	ID                 uint                  `json:"id" gorm:"primaryKey;autoIncrement"`
	Prefix             *string               `json:"prefix" gorm:"type:enum('mister','miss','mrs')"`
	FirstName          string                `json:"first_name" gorm:"size:100;not null"`
	LastName           string                `json:"last_name" gorm:"size:100;not null"`
	IDCard             *string               `json:"id_card" gorm:"size:13"`
	DateOfBirth        *time.Time            `json:"date_of_birth"`
	Address            *string               `json:"address" gorm:"type:text"`
	AttachedFileImage  *string               `json:"attached_file_image" gorm:"size:100"`
	Mobile             *string               `json:"mobile" gorm:"size:100"`
	Email              *string               `json:"email" gorm:"size:100"`
	Status             string                `json:"status" gorm:"type:enum('active','disabled');default:'active'"`
	CreatedAt          time.Time             `json:"created_at"`
	UpdatedAt          time.Time             `json:"updated_at"`

	Partners           []RenterPartner       `json:"partners,omitempty" gorm:"foreignKey:RentersID"`
	AttachedFiles      []RenterAttachedFile  `json:"attached_files,omitempty" gorm:"foreignKey:RentersID"`
}

type RenterPartner struct {
	ID        uint      `json:"id" gorm:"primaryKey;autoIncrement"`
	RentersID uint      `json:"renters_id" gorm:"not null"`
	FirstName string    `json:"first_name" gorm:"size:100;not null"`
	LastName  string    `json:"last_name" gorm:"size:100;not null"`
	Mobile    *string   `json:"mobile" gorm:"size:100"`
	Status    string    `json:"status" gorm:"type:enum('active','disabled');default:'active'"`
	CreatedAt time.Time `json:"created_at"`
	UpdatedAt time.Time `json:"updated_at"`
}

type RenterAttachedFile struct {
	ID           uint      `json:"id" gorm:"primaryKey;autoIncrement"`
	RentersID    uint      `json:"renters_id" gorm:"not null"`
	AttachedName string    `json:"attached_name" gorm:"size:100;not null"`
	Status       string    `json:"status" gorm:"type:enum('active','disabled');default:'active'"`
	CreatedAt    time.Time `json:"created_at"`
	UpdatedAt    time.Time `json:"updated_at"`
}
