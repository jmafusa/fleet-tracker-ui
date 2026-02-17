import { useMutation, useQueryClient } from "@tanstack/react-query";
import { VehicleService } from "../services/VehicleService";
import { toast } from "sonner";
import type { VehicleFormValues } from "../schemas/VehicleSchema";

export const useVehicleMutations = () => {
  const queryClient = useQueryClient();

  const createMutation = useMutation({
    mutationFn: (data: VehicleFormValues) => VehicleService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["vehicles"] });
      toast.success("Vehículo registrado", {
        description: "La unidad ha sido añadida a la flota.",
      });
    },
    onError: () => toast.error("Error al crear el vehículo"),
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: VehicleFormValues }) =>
      VehicleService.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["vehicles"] });
      toast.success("Cambios guardados", {
        description: "La información del vehículo se actualizó correctamente.",
      });
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
    createVehicle: createMutation.mutate,
    isCreating: createMutation.isPending,
    updateVehicle: updateMutation.mutate,
    isUpdating: updateMutation.isPending,
    deleteVehicle: deleteMutation.mutate,
    isDeleting: deleteMutation.isPending,
  };
};
