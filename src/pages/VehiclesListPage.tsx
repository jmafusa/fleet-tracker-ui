import { useState, useMemo } from "react";
import { useVehicles } from "@/features/fleet/hooks/useVehicles";
import { useVehicleMutations } from "@/features/fleet/hooks/useVehicleMutations";
import { getColumns } from "@/features/fleet/components/VehicleColumns";
import { DataTable } from "@/components/shared/DataTable";
import { DataCard } from "@/components/shared/DataCard";
import { DataTableToolbar } from "@/components/shared/DataTableToolbar";
import { ConfirmDialog } from "@/components/shared/ConfirmDialog";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Vehicle } from "@/features/fleet/types";
import type { VehicleFormValues } from "@/features/fleet/schemas/VehicleSchema";
import { VehicleDialog } from "@/features/fleet/components/VehicleDialog";

export default function VehiclesListPage() {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [search, setSearch] = useState("");
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([]);

  const { data, isLoading } = useVehicles({
    page,
    limit,
    search,
    statuses: selectedStatuses,
  });

  const {
    createVehicle,
    updateVehicle,
    deleteVehicle,
    isCreating,
    isUpdating,
    isDeleting,
  } = useVehicleMutations();

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [vehicleToDelete, setVehicleToDelete] = useState<Vehicle | null>(null);

  const handleCreate = () => {
    setSelectedVehicle(null);
    setIsDialogOpen(true);
  };

  const handleEdit = (vehicle: Vehicle) => {
    setSelectedVehicle(vehicle);
    setIsDialogOpen(true);
  };

  const handleDelete = (vehicle: Vehicle) => {
    setVehicleToDelete(vehicle);
    setIsDeleteDialogOpen(true);
  };

  const handleConfirmDelete = () => {
    if (vehicleToDelete) {
      deleteVehicle(vehicleToDelete.id, {
        onSuccess: () => {
          setIsDeleteDialogOpen(false);
          setVehicleToDelete(null);
        },
      });
    }
  };

  const handleCloseDeleteDialog = () => {
    if (!isDeleting) {
      setIsDeleteDialogOpen(false);
      setVehicleToDelete(null);
    }
  };

  const toggleStatus = (status: string) => {
    setPage(1);
    setSelectedStatuses((prev) =>
      prev.includes(status)
        ? prev.filter((s) => s !== status)
        : [...prev, status],
    );
  };

  const columns = useMemo(() => getColumns(handleEdit, handleDelete), []);

  const handleFormSubmit = (values: VehicleFormValues) => {
    if (selectedVehicle) {
      updateVehicle(
        { id: selectedVehicle.id, data: values },
        {
          onSuccess: () => setIsDialogOpen(false),
        },
      );
    } else {
      createVehicle(values, {
        onSuccess: () => setIsDialogOpen(false),
      });
    }
  };

  const handleSearch = (value: string) => {
    if (value !== search) {
      setSearch(value);
      setPage(1);
    }
  };

  return (
    <div className="bg-slate-50/50 ">
      <div className="flex justify-between items-center px-2 mb-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">
            Lista de Vehículos
          </h1>
          <p className="text-slate-500">
            Gestiona y monitorea las unidades registradas en tiempo real.
          </p>
        </div>

        <DataTableToolbar
          showSearch
          searchPlaceholder="Buscar por placa, marca o modelo..."
          onSearch={handleSearch}
          showFilters
          filterContent={
            <div className="p-1 min-w-[180px]">
              <h4 className="text-[10px] font-bold uppercase text-slate-400 px-2 py-2 tracking-widest">
                Estado
              </h4>
              <div className="flex flex-col gap-1">
                {["Activo", "Mantenimiento", "Fuera de Servicio"].map(
                  (status) => {
                    const isSelected = selectedStatuses.includes(status);
                    return (
                      <Button
                        key={status}
                        variant="ghost"
                        size="sm"
                        className={cn(
                          "justify-between font-medium h-9 px-2 transition-all",
                          isSelected
                            ? "bg-slate-100 text-slate-900 hover:bg-slate-200"
                            : "text-slate-500 hover:text-slate-900 hover:bg-slate-50",
                        )}
                        onClick={() => toggleStatus(status)}
                      >
                        <div className="flex items-center gap-2">
                          <div
                            className={cn(
                              "h-2 w-2 rounded-full shadow-sm",
                              status === "Activo"
                                ? "bg-emerald-500"
                                : status === "Mantenimiento"
                                  ? "bg-amber-500"
                                  : "bg-red-500",
                            )}
                          />
                          {status}
                        </div>
                        {isSelected && (
                          <Check className="h-4 w-4 text-slate-900" />
                        )}
                      </Button>
                    );
                  },
                )}

                {selectedStatuses.length > 0 && (
                  <>
                    <div className="h-px bg-slate-100" />
                    <Button
                      variant="ghost"
                      size="sm"
                      className="justify-center font-bold text-xs text-red-500 hover:text-red-600 hover:bg-red-50 h-8"
                      onClick={() => setSelectedStatuses([])}
                    >
                      Limpiar Filtros
                    </Button>
                  </>
                )}
              </div>
            </div>
          }
          primaryAction={{
            label: "Nuevo Vehículo",
            onClick: handleCreate,
            disabled: isLoading || isCreating,
          }}
        />
      </div>

      <DataCard>
        <DataTable
          columns={columns}
          data={data?.data || []}
          pageCount={data?.totalPages || 1}
          page={page}
          limit={limit}
          onPageChange={setPage}
          onLimitChange={setLimit}
          loading={isLoading}
        />
      </DataCard>

      <VehicleDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        onSubmit={handleFormSubmit}
        vehicle={selectedVehicle}
        isPending={isCreating || isUpdating}
      />

      <ConfirmDialog
        isOpen={isDeleteDialogOpen}
        onClose={handleCloseDeleteDialog}
        onConfirm={handleConfirmDelete}
        title="Eliminar Vehículo"
        description={`¿Estás seguro de eliminar el vehículo con placa ${vehicleToDelete?.licensePlate}?`}
        isLoading={isDeleting}
      />
    </div>
  );
}
