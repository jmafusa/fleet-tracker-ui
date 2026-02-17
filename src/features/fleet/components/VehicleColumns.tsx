import type { ColumnDef } from "@tanstack/react-table";
import type { Vehicle } from "../types";
import { Badge } from "@/components/ui/badge";
import { VehicleActionCell } from "./VehicleActionCell";
import { Settings } from "lucide-react";

export const columns: ColumnDef<Vehicle>[] = [
  {
    accessorKey: "licensePlate",
    header: "Placa",
  },
  {
    accessorKey: "make",
    header: "Marca",
  },
  {
    accessorKey: "model",
    header: "Modelo",
  },
  {
    accessorKey: "year",
    header: "Año",
  },
  {
    accessorKey: "status",
    header: () => <div className="text-center">Estado</div>,
    cell: ({ row }) => {
      const status = row.getValue("status") as string;
      const variant =
        status === "Activo"
          ? "default"
          : status === "Mantenimiento"
            ? "outline"
            : "destructive";

      return (
        <div className="flex justify-center">
          <Badge variant={variant}>{status}</Badge>
        </div>
      );
    },
  },
  {
    id: "actions",
    header: () => (
      <div className="flex justify-end pr-2">
        <Settings className="h-4 w-4 text-muted-foreground" />
      </div>
    ),
    cell: ({ row }) => (
      <div className="flex justify-end">
        <VehicleActionCell vehicle={row.original} />
      </div>
    ),
  },
];
