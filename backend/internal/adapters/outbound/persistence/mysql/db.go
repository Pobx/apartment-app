package mysql

import (
	"log"
	"os"

	"gorm.io/driver/mysql"
	"gorm.io/gorm"
	"gorm.io/gorm/logger"

	"apartment-api/internal/core/domain"
)

func InitDB() *gorm.DB {
	dsn := os.Getenv("DATABASE_DSN")
	if dsn == "" {
		dsn = "root:rootpassword@tcp(127.0.0.1:3306)/apartment_db?charset=utf8mb4&parseTime=True&loc=Local"
	}

	db, err := gorm.Open(mysql.Open(dsn), &gorm.Config{
		Logger: logger.Default.LogMode(logger.Warn),
	})
	if err != nil {
		log.Printf("Warning: Failed to connect to MySQL database (%v). In-memory fallback will be used if needed.", err)
		return nil
	}

	// Auto migrate tables
	_ = db.AutoMigrate(
		&domain.Apartment{},
		&domain.RoomCategory{},
		&domain.Room{},
		&domain.UtilityCategory{},
		&domain.UtilityPackage{},
		&domain.UtilityPackageItem{},
		&domain.Renter{},
		&domain.RenterPartner{},
		&domain.RenterAttachedFile{},
		&domain.UtilityMonthlyUsage{},
	)

	return db
}
