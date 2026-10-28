package outbound

import "apartment-api/internal/core/domain"

type ApartmentRepository interface {
	FindAll() ([]domain.Apartment, error)
	FindByID(id uint) (*domain.Apartment, error)
	Create(apt *domain.Apartment) error
	Update(apt *domain.Apartment) error
}

type RoomCategoryRepository interface {
	FindAll() ([]domain.RoomCategory, error)
	Create(cat *domain.RoomCategory) error
	Update(cat *domain.RoomCategory) error
}

type RoomRepository interface {
	FindAll() ([]domain.Room, error)
	FindByID(id uint) (*domain.Room, error)
	FindByApartmentID(apartmentID uint) ([]domain.Room, error)
	Create(room *domain.Room) error
	Update(room *domain.Room) error
}

type RenterRepository interface {
	FindAll() ([]domain.Renter, error)
	FindByID(id uint) (*domain.Renter, error)
	Create(renter *domain.Renter) error
	Update(renter *domain.Renter) error
	UpdateStatus(id uint, status string) error
	FindPartnersByRenterID(renterID uint) ([]domain.RenterPartner, error)
	CreatePartner(partner *domain.RenterPartner) error
	UpdatePartner(partner *domain.RenterPartner) error
	RemovePartner(id uint) error
	FindAttachedFilesByRenterID(renterID uint) ([]domain.RenterAttachedFile, error)
	CreateAttachedFile(file *domain.RenterAttachedFile) error
	RemoveAttachedFile(id uint) error
}

type UtilityRepository interface {
	FindCategories() ([]domain.UtilityCategory, error)
	FindCategoryByID(id uint) (*domain.UtilityCategory, error)
	CreateCategory(cat *domain.UtilityCategory) error
	UpdateCategory(cat *domain.UtilityCategory) error

	FindPackages() ([]domain.UtilityPackage, error)
	CreatePackage(pkg *domain.UtilityPackage) error
	UpdatePackage(pkg *domain.UtilityPackage) error

	FindPackageItems() ([]domain.UtilityPackageItem, error)
	FindPackageItemsByPackageID(packageID uint) ([]domain.UtilityPackageItem, error)
	CreatePackageItem(item *domain.UtilityPackageItem) error
	UpdatePackageItem(item *domain.UtilityPackageItem) error

	CreateMonthlyUsage(usage *domain.UtilityMonthlyUsage) error
	UpdateMonthlyUsage(usage *domain.UtilityMonthlyUsage) error
	FindMonthlyUsagesByRoomID(roomID uint) ([]domain.UtilityMonthlyUsage, error)
}

type DashboardRepository interface {
	GetDashboardStats() (*domain.DashboardStats, error)
}
