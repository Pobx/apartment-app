package mysql

import (
	"sync"
	"time"

	"gorm.io/gorm"

	"apartment-api/internal/core/domain"
	"apartment-api/internal/core/ports/outbound"
)

type RepositoryContainer struct {
	db *gorm.DB
	mu sync.RWMutex

	// In-memory cache/seed for standalone runner without live DB
	apartments       []domain.Apartment
	roomCategories   []domain.RoomCategory
	rooms            []domain.Room
	renters          []domain.Renter
	utilityCats      []domain.UtilityCategory
	utilityPkgs      []domain.UtilityPackage
	monthlyUsages    []domain.UtilityMonthlyUsage
}

func NewRepositoryContainer(db *gorm.DB) *RepositoryContainer {
	rc := &RepositoryContainer{db: db}
	rc.initSeedData()
	return rc
}

func (rc *RepositoryContainer) initSeedData() {
	rc.apartments = []domain.Apartment{
		{ID: 1, Name: "แกรนด์ วิลล์ อาคาร A", Status: domain.ApartmentStatusActive},
		{ID: 2, Name: "แกรนด์ วิลล์ อาคาร B", Status: domain.ApartmentStatusActive},
	}
	rc.roomCategories = []domain.RoomCategory{
		{ID: 1, Name: "Standard Room", Status: "active"},
		{ID: 2, Name: "Deluxe Room", Status: "active"},
		{ID: 3, Name: "Suite Room", Status: "active"},
	}
	rc.utilityCats = []domain.UtilityCategory{
		{ID: 1, Name: "ไฟฟ้า (kWh)", PricePerUnitCost: 5.0, PricePerUnit: 8.0, UnitMinRate: 1.0, UnitMinPrice: 50.0, Type: domain.UtilityTypeUnit, Status: "active"},
		{ID: 2, Name: "น้ำประปา (m3)", PricePerUnitCost: 12.0, PricePerUnit: 18.0, UnitMinRate: 5.0, UnitMinPrice: 100.0, Type: domain.UtilityTypeUnit, Status: "active"},
	}
	rc.renters = []domain.Renter{
		{ID: 1, FirstName: "สมชาย", LastName: "ใจดี", Mobile: strPtr("081-234-5678"), Email: strPtr("somchai@gmail.com"), Status: "active"},
		{ID: 2, FirstName: "อรอนงค์", LastName: "มีสุข", Mobile: strPtr("089-876-5432"), Email: strPtr("on-anong@gmail.com"), Status: "active"},
		{ID: 3, FirstName: "ธนกร", LastName: "สุขเจริญ", Mobile: strPtr("086-555-1212"), Email: strPtr("thanakorn@gmail.com"), Status: "active"},
	}
	aptID1 := uint(1)
	catID1 := uint(1)
	renterID1 := uint(1)
	renterID2 := uint(2)
	renterID3 := uint(3)

	rc.rooms = []domain.Room{
		{ID: 1, Name: "101", ApartmentsID: &aptID1, RoomCategoriesID: &catID1, RentersID: &renterID1, Price: 3500.0, Status: domain.RoomStatusActive,
			Apartments: &rc.apartments[0], Renters: &rc.renters[0]},
		{ID: 2, Name: "102", ApartmentsID: &aptID1, RoomCategoriesID: &catID1, RentersID: &renterID2, Price: 3500.0, Status: domain.RoomStatusActive,
			Apartments: &rc.apartments[0], Renters: &rc.renters[1]},
		{ID: 3, Name: "103", ApartmentsID: &aptID1, RoomCategoriesID: &catID1, RentersID: &renterID3, Price: 3500.0, Status: domain.RoomStatusActive,
			Apartments: &rc.apartments[0], Renters: &rc.renters[2]},
		{ID: 4, Name: "104", ApartmentsID: &aptID1, RoomCategoriesID: &catID1, Price: 3500.0, Status: domain.RoomStatusDisabled,
			Apartments: &rc.apartments[0]},
	}

	roomID1 := uint(1)
	catElec := uint(1)
	catWater := uint(2)
	now := time.Now()

	rc.monthlyUsages = []domain.UtilityMonthlyUsage{
		{ID: 1, RoomID: &roomID1, UtilityCategoriesID: &catElec, UtilityMemoDate: &now, LatestUnitAmount: 1240, CurrentUnitAmount: 1320, UnitAmount: 80, PricePerUnit: 8, TotalPrice: 640, Status: "active", CategoryName: "ไฟฟ้า (kWh)"},
		{ID: 2, RoomID: &roomID1, UtilityCategoriesID: &catWater, UtilityMemoDate: &now, LatestUnitAmount: 450, CurrentUnitAmount: 458, UnitAmount: 8, PricePerUnit: 18, TotalPrice: 144, Status: "active", CategoryName: "น้ำประปา (m3)"},
	}
}

func strPtr(s string) *string {
	return &s
}

// Implement ApartmentRepository
func (rc *RepositoryContainer) FindAll() ([]domain.Apartment, error) {
	if rc.db != nil {
		var list []domain.Apartment
		err := rc.db.Find(&list).Error
		return list, err
	}
	rc.mu.RLock()
	defer rc.mu.RUnlock()
	return rc.apartments, nil
}

func (rc *RepositoryContainer) FindByID(id uint) (*domain.Apartment, error) {
	if rc.db != nil {
		var item domain.Apartment
		err := rc.db.First(&item, id).Error
		return &item, err
	}
	rc.mu.RLock()
	defer rc.mu.RUnlock()
	for _, a := range rc.apartments {
		if a.ID == id {
			return &a, nil
		}
	}
	return nil, gorm.ErrRecordNotFound
}

func (rc *RepositoryContainer) Create(apt *domain.Apartment) error {
	if rc.db != nil {
		return rc.db.Create(apt).Error
	}
	rc.mu.Lock()
	defer rc.mu.Unlock()
	apt.ID = uint(len(rc.apartments) + 1)
	rc.apartments = append(rc.apartments, *apt)
	return nil
}

func (rc *RepositoryContainer) Update(apt *domain.Apartment) error {
	if rc.db != nil {
		return rc.db.Save(apt).Error
	}
	rc.mu.Lock()
	defer rc.mu.Unlock()
	for i, a := range rc.apartments {
		if a.ID == apt.ID {
			rc.apartments[i] = *apt
			return nil
		}
	}
	return nil
}

// Room Category Repository
func (rc *RepositoryContainer) FindAllRoomCategories() ([]domain.RoomCategory, error) {
	if rc.db != nil {
		var list []domain.RoomCategory
		err := rc.db.Find(&list).Error
		return list, err
	}
	rc.mu.RLock()
	defer rc.mu.RUnlock()
	return rc.roomCategories, nil
}

func (rc *RepositoryContainer) CreateRoomCategory(cat *domain.RoomCategory) error {
	if rc.db != nil {
		return rc.db.Create(cat).Error
	}
	rc.mu.Lock()
	defer rc.mu.Unlock()
	cat.ID = uint(len(rc.roomCategories) + 1)
	rc.roomCategories = append(rc.roomCategories, *cat)
	return nil
}

func (rc *RepositoryContainer) UpdateRoomCategory(cat *domain.RoomCategory) error {
	if rc.db != nil {
		return rc.db.Save(cat).Error
	}
	rc.mu.Lock()
	defer rc.mu.Unlock()
	for i, c := range rc.roomCategories {
		if c.ID == cat.ID {
			rc.roomCategories[i] = *cat
			return nil
		}
	}
	return nil
}

// Room Repository
func (rc *RepositoryContainer) FindAllRooms() ([]domain.Room, error) {
	if rc.db != nil {
		var list []domain.Room
		err := rc.db.Preload("Apartments").Preload("RoomCategories").Preload("Renters").Preload("UtilitiesPackages").Find(&list).Error
		return list, err
	}
	rc.mu.RLock()
	defer rc.mu.RUnlock()
	return rc.rooms, nil
}

func (rc *RepositoryContainer) FindRoomByID(id uint) (*domain.Room, error) {
	if rc.db != nil {
		var room domain.Room
		err := rc.db.Preload("Apartments").Preload("RoomCategories").Preload("Renters").Preload("UtilitiesPackages").First(&room, id).Error
		return &room, err
	}
	rc.mu.RLock()
	defer rc.mu.RUnlock()
	for _, r := range rc.rooms {
		if r.ID == id {
			return &r, nil
		}
	}
	return nil, gorm.ErrRecordNotFound
}

func (rc *RepositoryContainer) FindRoomsByApartmentID(apartmentID uint) ([]domain.Room, error) {
	if rc.db != nil {
		var list []domain.Room
		err := rc.db.Where("apartments_id = ?", apartmentID).Find(&list).Error
		return list, err
	}
	rc.mu.RLock()
	defer rc.mu.RUnlock()
	var list []domain.Room
	for _, r := range rc.rooms {
		if r.ApartmentsID != nil && *r.ApartmentsID == apartmentID {
			list = append(list, r)
		}
	}
	return list, nil
}

func (rc *RepositoryContainer) CreateRoom(room *domain.Room) error {
	if rc.db != nil {
		return rc.db.Create(room).Error
	}
	rc.mu.Lock()
	defer rc.mu.Unlock()
	room.ID = uint(len(rc.rooms) + 1)
	rc.rooms = append(rc.rooms, *room)
	return nil
}

func (rc *RepositoryContainer) UpdateRoom(room *domain.Room) error {
	if rc.db != nil {
		return rc.db.Save(room).Error
	}
	rc.mu.Lock()
	defer rc.mu.Unlock()
	for i, r := range rc.rooms {
		if r.ID == room.ID {
			rc.rooms[i] = *room
			return nil
		}
	}
	return nil
}

// Renter Repository
func (rc *RepositoryContainer) FindAllRenters() ([]domain.Renter, error) {
	if rc.db != nil {
		var list []domain.Renter
		err := rc.db.Preload("Partners").Preload("AttachedFiles").Find(&list).Error
		return list, err
	}
	rc.mu.RLock()
	defer rc.mu.RUnlock()
	return rc.renters, nil
}

func (rc *RepositoryContainer) FindRenterByID(id uint) (*domain.Renter, error) {
	if rc.db != nil {
		var renter domain.Renter
		err := rc.db.Preload("Partners").Preload("AttachedFiles").First(&renter, id).Error
		return &renter, err
	}
	rc.mu.RLock()
	defer rc.mu.RUnlock()
	for _, r := range rc.renters {
		if r.ID == id {
			return &r, nil
		}
	}
	return nil, gorm.ErrRecordNotFound
}

func (rc *RepositoryContainer) CreateRenter(renter *domain.Renter) error {
	if rc.db != nil {
		return rc.db.Create(renter).Error
	}
	rc.mu.Lock()
	defer rc.mu.Unlock()
	renter.ID = uint(len(rc.renters) + 1)
	rc.renters = append(rc.renters, *renter)
	return nil
}

func (rc *RepositoryContainer) UpdateRenter(renter *domain.Renter) error {
	if rc.db != nil {
		return rc.db.Save(renter).Error
	}
	rc.mu.Lock()
	defer rc.mu.Unlock()
	for i, r := range rc.renters {
		if r.ID == renter.ID {
			rc.renters[i] = *renter
			return nil
		}
	}
	return nil
}

func (rc *RepositoryContainer) UpdateRenterStatus(id uint, status string) error {
	if rc.db != nil {
		return rc.db.Model(&domain.Renter{}).Where("id = ?", id).Update("status", status).Error
	}
	rc.mu.Lock()
	defer rc.mu.Unlock()
	for i, r := range rc.renters {
		if r.ID == id {
			rc.renters[i].Status = status
			return nil
		}
	}
	return nil
}

func (rc *RepositoryContainer) FindPartnersByRenterID(renterID uint) ([]domain.RenterPartner, error) {
	return []domain.RenterPartner{}, nil
}

func (rc *RepositoryContainer) CreatePartner(partner *domain.RenterPartner) error {
	return nil
}

func (rc *RepositoryContainer) UpdatePartner(partner *domain.RenterPartner) error {
	return nil
}

func (rc *RepositoryContainer) RemovePartner(id uint) error {
	return nil
}

func (rc *RepositoryContainer) FindAttachedFilesByRenterID(renterID uint) ([]domain.RenterAttachedFile, error) {
	return []domain.RenterAttachedFile{}, nil
}

func (rc *RepositoryContainer) CreateAttachedFile(file *domain.RenterAttachedFile) error {
	return nil
}

func (rc *RepositoryContainer) RemoveAttachedFile(id uint) error {
	return nil
}

// Utility Repository
func (rc *RepositoryContainer) FindCategories() ([]domain.UtilityCategory, error) {
	return rc.utilityCats, nil
}

func (rc *RepositoryContainer) FindCategoryByID(id uint) (*domain.UtilityCategory, error) {
	for _, c := range rc.utilityCats {
		if c.ID == id {
			return &c, nil
		}
	}
	return nil, gorm.ErrRecordNotFound
}

func (rc *RepositoryContainer) CreateCategory(cat *domain.UtilityCategory) error {
	rc.utilityCats = append(rc.utilityCats, *cat)
	return nil
}

func (rc *RepositoryContainer) UpdateCategory(cat *domain.UtilityCategory) error {
	return nil
}

func (rc *RepositoryContainer) FindPackages() ([]domain.UtilityPackage, error) {
	return rc.utilityPkgs, nil
}

func (rc *RepositoryContainer) CreatePackage(pkg *domain.UtilityPackage) error {
	return nil
}

func (rc *RepositoryContainer) UpdatePackage(pkg *domain.UtilityPackage) error {
	return nil
}

func (rc *RepositoryContainer) FindPackageItems() ([]domain.UtilityPackageItem, error) {
	return []domain.UtilityPackageItem{}, nil
}

func (rc *RepositoryContainer) FindPackageItemsByPackageID(packageID uint) ([]domain.UtilityPackageItem, error) {
	return []domain.UtilityPackageItem{}, nil
}

func (rc *RepositoryContainer) CreatePackageItem(item *domain.UtilityPackageItem) error {
	return nil
}

func (rc *RepositoryContainer) UpdatePackageItem(item *domain.UtilityPackageItem) error {
	return nil
}

func (rc *RepositoryContainer) CreateMonthlyUsage(usage *domain.UtilityMonthlyUsage) error {
	rc.mu.Lock()
	defer rc.mu.Unlock()
	usage.ID = uint(len(rc.monthlyUsages) + 1)
	rc.monthlyUsages = append(rc.monthlyUsages, *usage)
	return nil
}

func (rc *RepositoryContainer) UpdateMonthlyUsage(usage *domain.UtilityMonthlyUsage) error {
	return nil
}

func (rc *RepositoryContainer) FindMonthlyUsagesByRoomID(roomID uint) ([]domain.UtilityMonthlyUsage, error) {
	rc.mu.RLock()
	defer rc.mu.RUnlock()
	var list []domain.UtilityMonthlyUsage
	for _, u := range rc.monthlyUsages {
		if u.RoomID != nil && *u.RoomID == roomID {
			list = append(list, u)
		}
	}
	return list, nil
}

// Dashboard Repository
func (rc *RepositoryContainer) GetDashboardStats() (*domain.DashboardStats, error) {
	rc.mu.RLock()
	defer rc.mu.RUnlock()

	totalRooms := 48
	occupiedRooms := 45
	vacantRooms := 3
	occupancyRate := (float64(occupiedRooms) / float64(totalRooms)) * 100.0

	trends := []domain.MonthlyTrend{
		{Month: "พ.ค.", ElectricityUnits: 3100, WaterUnits: 430, TotalCost: 32540},
		{Month: "มิ.ย.", ElectricityUnits: 3300, WaterUnits: 460, TotalCost: 34680},
		{Month: "ก.ค.", ElectricityUnits: 3600, WaterUnits: 510, TotalCost: 37980},
		{Month: "ส.ค.", ElectricityUnits: 3200, WaterUnits: 440, TotalCost: 33520},
		{Month: "ก.ย.", ElectricityUnits: 3450, WaterUnits: 480, TotalCost: 36240},
		{Month: "ต.ค.", ElectricityUnits: 3420, WaterUnits: 490, TotalCost: 42580},
	}

	financial := domain.FinancialSummary{
		CurrentMonthExpected: 42580.0,
		Collected:            36930.0,
		Pending:              5650.0,
	}

	pendingTasks := []domain.PendingMeterTask{
		{RoomID: 3, RoomName: "103", RenterName: "คุณธนกร สุขเจริญ", ApartmentName: "แกรนด์ วิลล์ อาคาร A", Floor: 1},
		{RoomID: 12, RoomName: "205", RenterName: "คุณกิตติศักดิ์ ภักดี", ApartmentName: "แกรนด์ วิลล์ อาคาร A", Floor: 2},
		{RoomID: 18, RoomName: "302", RenterName: "คุณกนกวรรณ จันทร์เพ็ญ", ApartmentName: "แกรนด์ วิลล์ อาคาร A", Floor: 3},
	}

	return &domain.DashboardStats{
		TotalRooms:        totalRooms,
		OccupiedRooms:     occupiedRooms,
		VacantRooms:       vacantRooms,
		OccupancyRate:     occupancyRate,
		TotalMetersBilled: 42580.0,
		UtilityTrends:     trends,
		Financial:         financial,
		PendingTasks:      pendingTasks,
	}, nil
}

// Adapters wrappers conforming to outbound interfaces
type apartmentRepoAdapter struct{ rc *RepositoryContainer }
func (a *apartmentRepoAdapter) FindAll() ([]domain.Apartment, error) { return a.rc.FindAll() }
func (a *apartmentRepoAdapter) FindByID(id uint) (*domain.Apartment, error) { return a.rc.FindByID(id) }
func (a *apartmentRepoAdapter) Create(apt *domain.Apartment) error { return a.rc.Create(apt) }
func (a *apartmentRepoAdapter) Update(apt *domain.Apartment) error { return a.rc.Update(apt) }

type roomCategoryRepoAdapter struct{ rc *RepositoryContainer }
func (a *roomCategoryRepoAdapter) FindAll() ([]domain.RoomCategory, error) { return a.rc.FindAllRoomCategories() }
func (a *roomCategoryRepoAdapter) Create(cat *domain.RoomCategory) error { return a.rc.CreateRoomCategory(cat) }
func (a *roomCategoryRepoAdapter) Update(cat *domain.RoomCategory) error { return a.rc.UpdateRoomCategory(cat) }

type roomRepoAdapter struct{ rc *RepositoryContainer }
func (a *roomRepoAdapter) FindAll() ([]domain.Room, error) { return a.rc.FindAllRooms() }
func (a *roomRepoAdapter) FindByID(id uint) (*domain.Room, error) { return a.rc.FindRoomByID(id) }
func (a *roomRepoAdapter) FindByApartmentID(apartmentID uint) ([]domain.Room, error) { return a.rc.FindRoomsByApartmentID(apartmentID) }
func (a *roomRepoAdapter) Create(room *domain.Room) error { return a.rc.CreateRoom(room) }
func (a *roomRepoAdapter) Update(room *domain.Room) error { return a.rc.UpdateRoom(room) }

type renterRepoAdapter struct{ rc *RepositoryContainer }
func (a *renterRepoAdapter) FindAll() ([]domain.Renter, error) { return a.rc.FindAllRenters() }
func (a *renterRepoAdapter) FindByID(id uint) (*domain.Renter, error) { return a.rc.FindRenterByID(id) }
func (a *renterRepoAdapter) Create(renter *domain.Renter) error { return a.rc.CreateRenter(renter) }
func (a *renterRepoAdapter) Update(renter *domain.Renter) error { return a.rc.UpdateRenter(renter) }
func (a *renterRepoAdapter) UpdateStatus(id uint, status string) error { return a.rc.UpdateRenterStatus(id, status) }
func (a *renterRepoAdapter) FindPartnersByRenterID(renterID uint) ([]domain.RenterPartner, error) { return a.rc.FindPartnersByRenterID(renterID) }
func (a *renterRepoAdapter) CreatePartner(partner *domain.RenterPartner) error { return a.rc.CreatePartner(partner) }
func (a *renterRepoAdapter) UpdatePartner(partner *domain.RenterPartner) error { return a.rc.UpdatePartner(partner) }
func (a *renterRepoAdapter) RemovePartner(id uint) error { return a.rc.RemovePartner(id) }
func (a *renterRepoAdapter) FindAttachedFilesByRenterID(renterID uint) ([]domain.RenterAttachedFile, error) { return a.rc.FindAttachedFilesByRenterID(renterID) }
func (a *renterRepoAdapter) CreateAttachedFile(file *domain.RenterAttachedFile) error { return a.rc.CreateAttachedFile(file) }
func (a *renterRepoAdapter) RemoveAttachedFile(id uint) error { return a.rc.RemoveAttachedFile(id) }

type utilityRepoAdapter struct{ rc *RepositoryContainer }
func (a *utilityRepoAdapter) FindCategories() ([]domain.UtilityCategory, error) { return a.rc.FindCategories() }
func (a *utilityRepoAdapter) FindCategoryByID(id uint) (*domain.UtilityCategory, error) { return a.rc.FindCategoryByID(id) }
func (a *utilityRepoAdapter) CreateCategory(cat *domain.UtilityCategory) error { return a.rc.CreateCategory(cat) }
func (a *utilityRepoAdapter) UpdateCategory(cat *domain.UtilityCategory) error { return a.rc.UpdateCategory(cat) }
func (a *utilityRepoAdapter) FindPackages() ([]domain.UtilityPackage, error) { return a.rc.FindPackages() }
func (a *utilityRepoAdapter) CreatePackage(pkg *domain.UtilityPackage) error { return a.rc.CreatePackage(pkg) }
func (a *utilityRepoAdapter) UpdatePackage(pkg *domain.UtilityPackage) error { return a.rc.UpdatePackage(pkg) }
func (a *utilityRepoAdapter) FindPackageItems() ([]domain.UtilityPackageItem, error) { return a.rc.FindPackageItems() }
func (a *utilityRepoAdapter) FindPackageItemsByPackageID(packageID uint) ([]domain.UtilityPackageItem, error) { return a.rc.FindPackageItemsByPackageID(packageID) }
func (a *utilityRepoAdapter) CreatePackageItem(item *domain.UtilityPackageItem) error { return a.rc.CreatePackageItem(item) }
func (a *utilityRepoAdapter) UpdatePackageItem(item *domain.UtilityPackageItem) error { return a.rc.UpdatePackageItem(item) }
func (a *utilityRepoAdapter) CreateMonthlyUsage(usage *domain.UtilityMonthlyUsage) error { return a.rc.CreateMonthlyUsage(usage) }
func (a *utilityRepoAdapter) UpdateMonthlyUsage(usage *domain.UtilityMonthlyUsage) error { return a.rc.UpdateMonthlyUsage(usage) }
func (a *utilityRepoAdapter) FindMonthlyUsagesByRoomID(roomID uint) ([]domain.UtilityMonthlyUsage, error) { return a.rc.FindMonthlyUsagesByRoomID(roomID) }

type dashboardRepoAdapter struct{ rc *RepositoryContainer }
func (a *dashboardRepoAdapter) GetDashboardStats() (*domain.DashboardStats, error) { return a.rc.GetDashboardStats() }

func NewApartmentRepo(rc *RepositoryContainer) outbound.ApartmentRepository { return &apartmentRepoAdapter{rc} }
func NewRoomCategoryRepo(rc *RepositoryContainer) outbound.RoomCategoryRepository { return &roomCategoryRepoAdapter{rc} }
func NewRoomRepo(rc *RepositoryContainer) outbound.RoomRepository { return &roomRepoAdapter{rc} }
func NewRenterRepo(rc *RepositoryContainer) outbound.RenterRepository { return &renterRepoAdapter{rc} }
func NewUtilityRepo(rc *RepositoryContainer) outbound.UtilityRepository { return &utilityRepoAdapter{rc} }
func NewDashboardRepo(rc *RepositoryContainer) outbound.DashboardRepository { return &dashboardRepoAdapter{rc} }
