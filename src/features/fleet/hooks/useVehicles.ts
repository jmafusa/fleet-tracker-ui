import { useQuery } from "@tanstack/react-query";
import type { SortingState } from "@tanstack/react-table";
import { VehicleService } from "../services/VehicleService";

export const useVehicles = (filters: {
  page: number;
  limit: number;
  search?: string;
  statuses?: string[];
  sorting?: SortingState;
}) => {
  return useQuery({
    queryKey: ["vehicles", filters],
    queryFn: () => VehicleService.getAll(filters),
    placeholderData: (previousData) => previousData,
  });
};
