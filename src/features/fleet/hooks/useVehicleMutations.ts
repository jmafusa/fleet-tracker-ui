import { useMutation, useQueryClient } from "@tanstack/react-query";
import { VehicleService } from "../services/VehicleService";
import { toast } from "sonner";

export const useVehicleMutations = () => {
  const queryClient = useQueryClient();

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) =>
      VehicleService.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["vehicles"] });
      toast.success("Vehículo actualizado correctamente");
    },
    onError: () => toast.error("Error al actualizar el vehículo"),
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => VehicleService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["vehicles"] });
      toast.success("Vehículo eliminado");
    },
    onError: () => toast.error("Error al eliminar el vehículo"),
  });

  return {
    updateVehicle: updateMutation.mutate,
    isUpdating: updateMutation.isPending,
    deleteVehicle: deleteMutation.mutate,
    isDeleting: deleteMutation.isPending,
  };
};
