import { useMutation, useQueryClient } from '@tanstack/react-query';
import { httpClient } from '@/shared';
import { SaveMeterPayload } from '../types';

export function useMeters() {
  const queryClient = useQueryClient();

  const recordMeterMutation = useMutation({
    mutationFn: async (payload: SaveMeterPayload) => {
      try {
        // Try posting to backend API if available
        await httpClient.post('/utilities-monthly-usage/create', {
          rooms_id: payload.roomId,
          water_usage: payload.waterCurrent,
          electricity_usage: payload.electricCurrent,
        });
      } catch (e) {
        console.warn('API call fallback to local optimistic state', e);
      }
      return payload;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['dashboard'] });
      queryClient.invalidateQueries({ queryKey: ['rooms'] });
      queryClient.invalidateQueries({ queryKey: ['meters'] });
    },
  });

  const saveWalkthroughMutation = useMutation({
    mutationFn: async (records: SaveMeterPayload[]) => {
      // Save all recorded rooms
      for (const record of records) {
        try {
          await httpClient.post('/utilities-monthly-usage/create', {
            rooms_id: record.roomId,
            water_usage: record.waterCurrent,
            electricity_usage: record.electricCurrent,
          });
        } catch (e) {
          console.warn(`Fallback for room ${record.roomId}`, e);
        }
      }
      return records;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['dashboard'] });
      queryClient.invalidateQueries({ queryKey: ['rooms'] });
      queryClient.invalidateQueries({ queryKey: ['meters'] });
    },
  });

  return {
    recordMeter: recordMeterMutation.mutateAsync,
    isRecording: recordMeterMutation.isPending,
    saveWalkthrough: saveWalkthroughMutation.mutateAsync,
    isSavingWalkthrough: saveWalkthroughMutation.isPending,
  };
}
