export interface UtilityTrendDTO {
  month: string;
  electricity_units: number;
  water_units: number;
  total_cost: number;
}

export interface PendingTaskDTO {
  room_id: number;
  room_name: string;
  renter_name: string;
  apartment_name?: string;
  floor: number;
}

export interface FinancialSummaryDTO {
  current_month_expected: number;
  collected: number;
  pending: number;
}

export interface DashboardStatsDTO {
  total_rooms: number;
  occupied_rooms: number;
  vacant_rooms: number;
  occupancy_rate: number;
  total_meters_billed: number;
  financial: FinancialSummaryDTO;
  utility_trends: UtilityTrendDTO[];
  pending_tasks: PendingTaskDTO[];
}
