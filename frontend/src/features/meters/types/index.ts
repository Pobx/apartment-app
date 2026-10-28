export interface UtilityRateConfig {
  waterRatePerUnit: number;
  waterMinCharge: number;
  electricityRatePerUnit: number;
  electricityMinCharge: number;
  commonFeeMonthly: number;
}

export interface MeterReading {
  previous: number;
  current: number;
  units: number;
  ratePerUnit: number;
  minCharge: number;
  subtotal: number;
}

export interface RoomMeterRecord {
  roomId: number;
  roomName: string;
  floor: number;
  renterName?: string;
  waterPrevious: number;
  waterCurrent?: number;
  electricPrevious: number;
  electricCurrent?: number;
  status: 'pending' | 'completed' | 'vacant';
}

export interface CalculationResult {
  waterUnits: number;
  waterCharge: number;
  electricUnits: number;
  electricCharge: number;
  commonFee: number;
  grandTotal: number;
}

export interface SaveMeterPayload {
  roomId: number;
  waterCurrent: number;
  electricCurrent: number;
}
