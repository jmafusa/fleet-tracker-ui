import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { DataCard } from "@/components/shared/DataCard";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { ConfirmDialog } from "@/components/shared/ConfirmDialog";
import { VehicleDialog } from "@/features/fleet/components/VehicleDialog";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  ChevronLeft,
  Car,
  Calendar,
  Gauge,
  MapPin,
  Activity,
  Trash2,
  Edit3,
} from "lucide-react";

import { useVehicle } from "@/features/fleet/hooks/useVehicle";
import { useVehicleMutations } from "@/features/fleet/hooks/useVehicleMutations";
import { PATHS } from "@/routes/paths";
import type { VehicleFormValues } from "@/features/fleet/schemas/VehicleSchema";
import { useQueryClient } from "@tanstack/react-query";

export default function VehicleDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data: vehicle, isLoading, error } = useVehicle(id);
  const { updateVehicle, deleteVehicle, isUpdating, isDeleting } =
    useVehicleMutations();

  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const formatDate = (dateString: string | undefined) => {
    if (!dateString) return "---";
    const date = new Date(dateString);
    return isNaN(date.getTime()) ? "---" : date.toLocaleDateString("es-MX");
  };

  const handleEditSubmit = (values: VehicleFormValues) => {
    if (!id) return;

    updateVehicle(
      { id, data: values },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["vehicle", id] });
          setIsEditDialogOpen(false);
          queryClient.invalidateQueries({ queryKey: ["vehicles"] });
        },
      },
    );
  };

  const handleDeleteConfirm = () => {
    if (!id) return;
    deleteVehicle(id, {
      onSuccess: () => navigate(PATHS.VEHICLES.LIST),
    });
  };

  return (
    <div className="mt-1 space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div className="flex items-center gap-4">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-10 w-10 rounded-full shadow-sm bg-white"
                  onClick={() => navigate(PATHS.VEHICLES.LIST)}
                >
                  <ChevronLeft className="h-5 w-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="right">Volver a la lista</TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <div className="space-y-1">
            {isLoading ? (
              <>
                <Skeleton className="h-7 w-40" />
                <Skeleton className="h-4 w-56" />
              </>
            ) : error || !vehicle ? (
              <h1 className="text-3xl font-bold text-slate-400 uppercase">
                Unidad No Encontrada
              </h1>
            ) : (
              <>
                <div className="flex items-center gap-3">
                  <h1 className="text-3xl font-bold tracking-tight text-slate-900 uppercase">
                    {vehicle.licensePlate}
                  </h1>
                  <Badge
                    variant={
                      vehicle.status === "Activo"
                        ? "default"
                        : vehicle.status === "Mantenimiento"
                          ? "outline"
                          : "destructive"
                    }
                  >
                    {vehicle.status}
                  </Badge>
                </div>
                <p className="text-sm text-slate-500 font-medium">
                  {vehicle.make} {vehicle.model}
                </p>
              </>
            )}
          </div>
        </div>

        {!isLoading && !error && (
          <div className="flex items-center gap-2">
            <Button
              variant="destructive"
              size="sm"
              className="gap-2 hover:cursor-pointer"
              onClick={() => setIsDeleteDialogOpen(true)}
            >
              <Trash2 className="h-4 w-4" /> Borrar
            </Button>
            <Button
              size="sm"
              className="gap-2 hover:cursor-pointer"
              onClick={() => setIsEditDialogOpen(true)}
            >
              <Edit3 className="h-4 w-4" /> Editar
            </Button>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <DataCard className="py-6">
          <div className="flex items-center gap-2 mb-4">
            <Gauge className="h-4 w-4 text-blue-600" />
            <h3 className="text-sm font-semibold text-slate-700">Métricas</h3>
          </div>
          <div className="space-y-4">
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">
                Kilometraje Actual
              </p>
              {isLoading ? (
                <Skeleton className="h-7 w-24" />
              ) : (
                <p className="text-lg font-bold text-slate-900">
                  {vehicle?.mileage?.toLocaleString()}{" "}
                  <span className="text-xs font-normal text-slate-500 uppercase tracking-tighter">
                    km
                  </span>
                </p>
              )}
            </div>
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">
                Último Servicio
              </p>
              {isLoading ? (
                <Skeleton className="h-6 w-32" />
              ) : (
                <div className="flex items-center gap-2 text-slate-700">
                  <Calendar className="h-3.5 w-3.5 text-slate-400" />
                  <p className="text-sm font-semibold">
                    {formatDate(vehicle?.lastServiceDate)}
                  </p>
                </div>
              )}
            </div>
          </div>
        </DataCard>

        <DataCard className="py-6">
          <div className="flex items-center gap-2 mb-4">
            <Car className="h-4 w-4 text-slate-400" />
            <h3 className="text-sm font-semibold text-slate-700">
              Ficha Técnica
            </h3>
          </div>
          <div className="space-y-4">
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">
                Marca / Modelo
              </p>
              {isLoading ? (
                <Skeleton className="h-6 w-full" />
              ) : (
                <p className="text-sm font-semibold text-slate-900">
                  {vehicle?.make} {vehicle?.model}
                </p>
              )}
            </div>
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">
                Año Vehicular
              </p>
              {isLoading ? (
                <Skeleton className="h-6 w-16" />
              ) : (
                <p className="text-sm font-semibold text-slate-900">
                  {vehicle?.year}
                </p>
              )}
            </div>
          </div>
        </DataCard>

        <DataCard className="py-6">
          <div className="flex items-center gap-2 mb-4">
            <Activity className="h-4 w-4 text-emerald-600" />
            <h3 className="text-sm font-semibold text-slate-700">Telemetría</h3>
          </div>
          <div className="space-y-4">
            <div className="flex justify-between items-center pt-1">
              <span className="text-[10px] font-bold text-slate-400 uppercase">
                Señal
              </span>
              {isLoading ? (
                <Skeleton className="h-6 w-16" />
              ) : (
                <div className="flex items-center gap-1.5">
                  <span
                    className={`h-2 w-2 rounded-full ${vehicle?.gpsStatus === "En línea" ? "bg-emerald-500" : "bg-red-500"}`}
                  />
                  <span className="text-xs font-bold text-slate-900">
                    {vehicle?.gpsStatus}
                  </span>
                </div>
              )}
            </div>
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                Ubicación GPS
              </p>
              {isLoading ? (
                <Skeleton className="h-10 w-full rounded-md" />
              ) : (
                <div className="flex items-start gap-2 p-2.5 bg-slate-50 border border-slate-100 rounded-lg text-slate-700">
                  <MapPin className="h-3.5 w-3.5 text-red-500 mt-0.5 shrink-0" />
                  <p className="text-xs font-medium leading-snug">
                    {vehicle?.location || "Sin señal"}
                  </p>
                </div>
              )}
            </div>
          </div>
        </DataCard>
      </div>

      <VehicleDialog
        open={isEditDialogOpen}
        onOpenChange={setIsEditDialogOpen}
        onSubmit={handleEditSubmit}
        vehicle={vehicle}
        isPending={isUpdating}
      />

      <ConfirmDialog
        isOpen={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        onConfirm={handleDeleteConfirm}
        title="Eliminar Unidad"
        description={`¿Estás seguro de eliminar permanentemente la unidad ${vehicle?.licensePlate}? Esta acción no se puede deshacer.`}
        isLoading={isDeleting}
      />
    </div>
  );
}
