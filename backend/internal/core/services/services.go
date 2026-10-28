package services

import (
	"fmt"
	"time"

	"apartment-api/internal/core/domain"
	"apartment-api/internal/core/ports/inbound"
	"apartment-api/internal/core/ports/outbound"
)

type apartmentService struct {
	aptRepo outbound.ApartmentRepository
	catRepo outbound.RoomCategoryRepository
}

func NewApartmentService(aptRepo outbound.ApartmentRepository, catRepo outbound.RoomCategoryRepository) inbound.ApartmentService {
	return &apartmentService{aptRepo: aptRepo, catRepo: catRepo}
}

func (s *apartmentService) GetAllApartments() ([]domain.Apartment, error) {
	return s.aptRepo.FindAll()
}

func (s *apartmentService) CreateApartment(apt *domain.Apartment) error {
	return s.aptRepo.Create(apt)
}

func (s *apartmentService) UpdateApartment(apt *domain.Apartment) error {
	return s.aptRepo.Update(apt)
}

func (s *apartmentService) GetAllRoomCategories() ([]domain.RoomCategory, error) {
	return s.catRepo.FindAll()
}

func (s *apartmentService) CreateRoomCategory(cat *domain.RoomCategory) error {
	return s.catRepo.Create(cat)
}

func (s *apartmentService) UpdateRoomCategory(cat *domain.RoomCategory) error {
	return s.catRepo.Update(cat)
}

// Room Service
type roomService struct {
	roomRepo outbound.RoomRepository
}

func NewRoomService(roomRepo outbound.RoomRepository) inbound.RoomService {
	return &roomService{roomRepo: roomRepo}
}

func (s *roomService) GetAllRooms() ([]domain.Room, error) {
	return s.roomRepo.FindAll()
}

func (s *roomService) GetRoomByID(id uint) (*domain.Room, error) {
	return s.roomRepo.FindByID(id)
}

func (s *roomService) GetRoomsByApartmentID(apartmentID uint) ([]domain.Room, error) {
	return s.roomRepo.FindByApartmentID(apartmentID)
}

func (s *roomService) CreateRoom(room *domain.Room) error {
	return s.roomRepo.Create(room)
}

func (s *roomService) UpdateRoom(room *domain.Room) error {
	return s.roomRepo.Update(room)
}

// Renter Service
type renterService struct {
	repo outbound.RenterRepository
}

func NewRenterService(repo outbound.RenterRepository) inbound.RenterService {
	return &renterService{repo: repo}
}

func (s *renterService) GetAllRenters() ([]domain.Renter, error) {
	return s.repo.FindAll()
}

func (s *renterService) GetRenterByID(id uint) (*domain.Renter, error) {
	return s.repo.FindByID(id)
}

func (s *renterService) CreateRenter(renter *domain.Renter) error {
	return s.repo.Create(renter)
}

func (s *renterService) UpdateRenter(renter *domain.Renter) error {
	return s.repo.Update(renter)
}

func (s *renterService) UpdateRenterStatus(id uint, status string) error {
	return s.repo.UpdateStatus(id, status)
}

func (s *renterService) GetPartners(renterID uint) ([]domain.RenterPartner, error) {
	return s.repo.FindPartnersByRenterID(renterID)
}

func (s *renterService) CreatePartner(partner *domain.RenterPartner) error {
	return s.repo.CreatePartner(partner)
}

func (s *renterService) UpdatePartner(partner *domain.RenterPartner) error {
	return s.repo.UpdatePartner(partner)
}

func (s *renterService) RemovePartner(id uint) error {
	return s.repo.RemovePartner(id)
}

func (s *renterService) GetAttachedFiles(renterID uint) ([]domain.RenterAttachedFile, error) {
	return s.repo.FindAttachedFilesByRenterID(renterID)
}

func (s *renterService) CreateAttachedFile(file *domain.RenterAttachedFile) error {
	return s.repo.CreateAttachedFile(file)
}

func (s *renterService) RemoveAttachedFile(id uint) error {
	return s.repo.RemoveAttachedFile(id)
}

// Utility Service
type utilityService struct {
	repo outbound.UtilityRepository
}

func NewUtilityService(repo outbound.UtilityRepository) inbound.UtilityService {
	return &utilityService{repo: repo}
}

func (s *utilityService) GetCategories() ([]domain.UtilityCategory, error) {
	return s.repo.FindCategories()
}

func (s *utilityService) GetCategoryByID(id uint) (*domain.UtilityCategory, error) {
	return s.repo.FindCategoryByID(id)
}

func (s *utilityService) CreateCategory(cat *domain.UtilityCategory) error {
	return s.repo.CreateCategory(cat)
}

func (s *utilityService) UpdateCategory(cat *domain.UtilityCategory) error {
	return s.repo.UpdateCategory(cat)
}

func (s *utilityService) GetPackages() ([]domain.UtilityPackage, error) {
	return s.repo.FindPackages()
}

func (s *utilityService) CreatePackage(pkg *domain.UtilityPackage) error {
	return s.repo.CreatePackage(pkg)
}

func (s *utilityService) UpdatePackage(pkg *domain.UtilityPackage) error {
	return s.repo.UpdatePackage(pkg)
}

func (s *utilityService) GetPackageItems() ([]domain.UtilityPackageItem, error) {
	return s.repo.FindPackageItems()
}

func (s *utilityService) GetPackageItemsByPackageID(packageID uint) ([]domain.UtilityPackageItem, error) {
	return s.repo.FindPackageItemsByPackageID(packageID)
}

func (s *utilityService) CreatePackageItem(item *domain.UtilityPackageItem) error {
	return s.repo.CreatePackageItem(item)
}

func (s *utilityService) UpdatePackageItem(item *domain.UtilityPackageItem) error {
	return s.repo.UpdatePackageItem(item)
}

func (s *utilityService) RecordMonthlyUsage(usage *domain.UtilityMonthlyUsage) error {
	cat, err := s.repo.FindCategoryByID(*usage.UtilityCategoriesID)
	if err == nil && cat != nil {
		usage.PricePerUnit = cat.PricePerUnit
		usage.UnitAmount, usage.TotalPrice = domain.CalculateUtilityPrice(
			usage.CurrentUnitAmount,
			usage.LatestUnitAmount,
			cat.UnitMinRate,
			cat.UnitMinPrice,
			cat.PricePerUnit,
		)
	}
	now := time.Now()
	usage.UtilityMemoDate = &now
	usage.Status = "active"
	return s.repo.CreateMonthlyUsage(usage)
}

func (s *utilityService) UpdateMonthlyUsage(usage *domain.UtilityMonthlyUsage) error {
	return s.repo.UpdateMonthlyUsage(usage)
}

func (s *utilityService) GetMonthlyUsagesByRoomID(roomID uint) ([]domain.UtilityMonthlyUsage, error) {
	return s.repo.FindMonthlyUsagesByRoomID(roomID)
}

// Billing Service
type billingService struct {
	roomRepo    outbound.RoomRepository
	utilityRepo outbound.UtilityRepository
}

func NewBillingService(roomRepo outbound.RoomRepository, utilityRepo outbound.UtilityRepository) inbound.BillingService {
	return &billingService{roomRepo: roomRepo, utilityRepo: utilityRepo}
}

func (s *billingService) GetBillByRoomID(roomID uint) (*domain.BillReceipt, error) {
	room, err := s.roomRepo.FindByID(roomID)
	if err != nil {
		return nil, err
	}
	usages, err := s.utilityRepo.FindMonthlyUsagesByRoomID(roomID)
	if err != nil {
		return nil, err
	}

	var items []domain.BillItem
	var utilitiesTotal float64
	for _, u := range usages {
		catName := u.CategoryName
		if catName == "" && u.UtilityCategory != nil {
			catName = u.UtilityCategory.Name
		}
		item := domain.BillItem{
			CategoryName:      catName,
			LatestUnitAmount:  u.LatestUnitAmount,
			CurrentUnitAmount: u.CurrentUnitAmount,
			UnitAmount:        u.UnitAmount,
			PricePerUnit:      u.PricePerUnit,
			TotalPrice:        u.TotalPrice,
		}
		items = append(items, item)
		utilitiesTotal += u.TotalPrice
	}

	aptName := ""
	if room.Apartments != nil {
		aptName = room.Apartments.Name
	}
	renterName := ""
	if room.Renters != nil {
		renterName = fmt.Sprintf("%s %s", room.Renters.FirstName, room.Renters.LastName)
	}

	now := time.Now()
	receipt := &domain.BillReceipt{
		RoomID:              room.ID,
		RoomName:            room.Name,
		ApartmentName:       aptName,
		RenterName:          renterName,
		Month:               now.Format("2006-01"),
		UtilityMemoDateTH:   domain.FormatThaiBuddhistDate(now),
		UtilityMemoDateEN:   now.Format("2006-01-02"),
		UtilityMemoYearTH:   fmt.Sprintf("%d", now.Year()+543),
		RoomPrice:           room.Price,
		Items:               items,
		TotalUtilitiesPrice: utilitiesTotal,
		GrandTotalPrice:     domain.CalculateGrandTotal(room.Price, utilitiesTotal),
	}
	return receipt, nil
}

func (s *billingService) CreateBill(roomID uint, month string) (*domain.BillReceipt, error) {
	return s.GetBillByRoomID(roomID)
}

// Dashboard Service
type dashboardService struct {
	repo outbound.DashboardRepository
}

func NewDashboardService(repo outbound.DashboardRepository) inbound.DashboardService {
	return &dashboardService{repo: repo}
}

func (s *dashboardService) GetStats() (*domain.DashboardStats, error) {
	return s.repo.GetDashboardStats()
}
