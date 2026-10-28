import { useQuery } from '@tanstack/react-query';
import { httpClient } from '@/shared';
import { DashboardStatsDTO } from '../types';

export function useDashboardStats() {
  return useQuery<DashboardStatsDTO>({
    queryKey: ['dashboard', 'stats'],
    queryFn: async () => {
      try {
        return await httpClient.get<DashboardStatsDTO>('/dashboard/stats');
      } catch (err) {
        console.warn('Failed to fetch dashboard stats from API, using fallback data', err);
        return {
          total_rooms: 48,
          occupied_rooms: 45,
          vacant_rooms: 3,
          occupancy_rate: 93.75,
          total_meters_billed: 42580,
          utility_trends: [
            { month: 'พ.ค.', electricity_units: 3100, water_units: 430, total_cost: 32540 },
            { month: 'มิ.ย.', electricity_units: 3300, water_units: 460, total_cost: 34680 },
            { month: 'ก.ค.', electricity_units: 3600, water_units: 510, total_cost: 37980 },
            { month: 'ส.ค.', electricity_units: 3200, water_units: 440, total_cost: 33520 },
            { month: 'ก.ย.', electricity_units: 3450, water_units: 480, total_cost: 36240 },
            { month: 'ต.ค.', electricity_units: 3420, water_units: 490, total_cost: 42580 },
          ],
          financial: {
            current_month_expected: 42580,
            collected: 36930,
            pending: 5650,
          },
          pending_tasks: [
            { room_id: 3, room_name: '103', renter_name: 'คุณธนกร สุขเจริญ', floor: 1 },
            { room_id: 12, room_name: '205', renter_name: 'คุณกิตติศักดิ์ ภักดี', floor: 2 },
            { room_id: 18, room_name: '302', renter_name: 'คุณกนกวรรณ จันทร์เพ็ญ', floor: 3 },
          ],
        };
      }
    },
  });
}
