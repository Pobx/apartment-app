package inbound

import "apartment-api/internal/core/domain"

type ApartmentService interface {
	GetAllApartments() ([]domain.Apartment, error)
	CreateApartment(apt *domain.Apartment) error
	UpdateApartment(apt *domain.Apartment) error

	GetAllRoomCategories() ([]domain.RoomCategory, error)
	CreateRoomCategory(cat *domain.RoomCategory) error
	UpdateRoomCategory(cat *domain.RoomCategory) error
}

type RoomService interface {
	GetAllRooms() ([]domain.Room, error)
	GetRoomByID(id uint) (*domain.Room, error)
	GetRoomsByApartmentID(apartmentID uint) ([]domain.Room, error)
	CreateRoom(room *domain.Room) error
	UpdateRoom(room *domain.Room) error
}

type RenterService interface {
	GetAllRenters() ([]domain.Renter, error)
	GetRenterByID(id uint) (*domain.Renter, error)
	CreateRenter(renter *domain.Renter) error
	UpdateRenter(renter *domain.Renter) error
	UpdateRenterStatus(id uint, status string) error

	GetPartners(renterID uint) ([]domain.RenterPartner, error)
	CreatePartner(partner *domain.RenterPartner) error
	UpdatePartner(partner *domain.RenterPartner) error
	RemovePartner(id uint) error

	GetAttachedFiles(renterID uint) ([]domain.RenterAttachedFile, error)
	CreateAttachedFile(file *domain.RenterAttachedFile) error
	RemoveAttachedFile(id uint) error
}

type UtilityService interface {
	GetCategories() ([]domain.UtilityCategory, error)
	GetCategoryByID(id uint) (*domain.UtilityCategory, error)
	CreateCategory(cat *domain.UtilityCategory) error
	UpdateCategory(cat *domain.UtilityCategory) error

	GetPackages() ([]domain.UtilityPackage, error)
	CreatePackage(pkg *domain.UtilityPackage) error
	UpdatePackage(pkg *domain.UtilityPackage) error

	GetPackageItems() ([]domain.UtilityPackageItem, error)
	GetPackageItemsByPackageID(packageID uint) ([]domain.UtilityPackageItem, error)
	CreatePackageItem(item *domain.UtilityPackageItem) error
	UpdatePackageItem(item *domain.UtilityPackageItem) error

	RecordMonthlyUsage(usage *domain.UtilityMonthlyUsage) error
	UpdateMonthlyUsage(usage *domain.UtilityMonthlyUsage) error
	GetMonthlyUsagesByRoomID(roomID uint) ([]domain.UtilityMonthlyUsage, error)
}

type BillingService interface {
	GetBillByRoomID(roomID uint) (*domain.BillReceipt, error)
	CreateBill(roomID uint, month string) (*domain.BillReceipt, error)
}

type DashboardService interface {
	GetStats() (*domain.DashboardStats, error)
}
