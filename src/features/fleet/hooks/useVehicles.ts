import { useQuery } from "@tanstack/react-query";
import type { SortingState } from "@tanstack/react-table";
import { VehicleService } from "../services/VehicleService";

export const useVehicles = ({
  page,
  limit,
  search,
  statuses,
  sorting,
}: {
  page: number;
  limit: number;
  search?: string;
  statuses?: string[];
  sorting?: SortingState;
}) => {
  return useQuery({
    queryKey: ["vehicles", { page, limit, search, statuses, sorting }],
    queryFn: () =>
      VehicleService.getAll({ page, limit, search, statuses, sorting }),
    placeholderData: (previousData) => previousData,
  });
};
