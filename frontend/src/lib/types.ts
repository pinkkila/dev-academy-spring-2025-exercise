export type TSingleDayData = {
  date: string;
  totalConsumption: number;
  totalProduction: number;
  averagePrice: number;
  hourWithMostConsumptionVsProduction: string;
  hourlyPrices: THourlyPrice[];
};

export type THourlyPrice = {
  startTime: string;
  hourlyPrice: number;
};

export type TDailyData = {
  date: string;
  totalConsumption: number;
  totalProduction: number;
  averagePrice: number;
  consecutiveNegativeHours: number;
};

export type Theme = "dark" | "light" | "system";
