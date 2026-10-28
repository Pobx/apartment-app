import {
  UtilityRateConfig,
  CalculationResult,
} from '../types';

export const DEFAULT_RATE_CONFIG: UtilityRateConfig = {
  waterRatePerUnit: 18,
  waterMinCharge: 100,
  electricityRatePerUnit: 8,
  electricityMinCharge: 0,
  commonFeeMonthly: 300,
};

export function calculateUtilityUnits(current: number, previous: number): number {
  if (isNaN(current) || isNaN(previous)) return 0;
  return Math.max(0, current - previous);
}

export function calculateUtilityPrice(
  units: number,
  ratePerUnit: number,
  minCharge = 0
): number {
  const calculated = units * ratePerUnit;
  return Math.max(calculated, minCharge);
}

export function calculateRoomTotal(
  waterCurrent: number,
  waterPrevious: number,
  electricCurrent: number,
  electricPrevious: number,
  config: UtilityRateConfig = DEFAULT_RATE_CONFIG
): CalculationResult {
  const waterUnits = calculateUtilityUnits(waterCurrent, waterPrevious);
  const electricUnits = calculateUtilityUnits(electricCurrent, electricPrevious);

  const waterCharge = calculateUtilityPrice(
    waterUnits,
    config.waterRatePerUnit,
    config.waterMinCharge
  );

  const electricCharge = calculateUtilityPrice(
    electricUnits,
    config.electricityRatePerUnit,
    config.electricityMinCharge
  );

  const grandTotal = waterCharge + electricCharge + config.commonFeeMonthly;

  return {
    waterUnits,
    waterCharge,
    electricUnits,
    electricCharge,
    commonFee: config.commonFeeMonthly,
    grandTotal,
  };
}
