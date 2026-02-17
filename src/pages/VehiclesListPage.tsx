import { useState, useMemo } from "react";
import { useVehicles } from "@/features/fleet/hooks/useVehicles";
import { useVehicleMutations } from "@/features/fleet/hooks/useVehicleMutations";
import { getColumns } from "@/features/fleet/components/VehicleColumns";
import { DataTable } from "@/components/shared/DataTable";
import { DataCard } from "@/components/shared/DataCard";
import { DataTableToolbar } from "@/components/shared/DataTableToolbar";
import { ConfirmDialog } from "@/components/shared/ConfirmDialog";
import { Button } from "@/components/ui/button";
import type { Vehicle } from "@/features/fleet/types";
import type { VehicleFormValues } from "@/features/fleet/schemas/VehicleSchema";
import { VehicleDialog } from "@/features/fleet/components/VehicleDialog";

export default function VehiclesListPage() {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [search, setSearch] = useState("");

  const { data, isLoading } = useVehicles({ page, limit, search });
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
          showSorting
          currentSortLabel="Ordenar lista"
          onSortClick={() => console.log("Lógica de ordenamiento")}
          showFilters
          filterContent={
            <div className="p-2">
              <h4 className="text-xs font-semibold uppercase text-slate-400 px-2">
                Filtrar por Estado
              </h4>
              <div className="flex flex-col gap-1">
                <Button
                  variant="ghost"
                  size="sm"
                  className="justify-start font-normal"
                >
                  Activos
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="justify-start font-normal"
                >
                  Mantenimiento
                </Button>
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
