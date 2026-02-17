import { useQuery } from "@tanstack/react-query";
import { VehicleService } from "../services/VehicleService";

export const useVehicle = (id: string | undefined) => {
  return useQuery({
    queryKey: ["vehicle", id],
    queryFn: () => {
      if (!id) throw new Error("ID no proporcionado");
      return VehicleService.getById(id);
    },
    enabled: !!id,
  });
};
