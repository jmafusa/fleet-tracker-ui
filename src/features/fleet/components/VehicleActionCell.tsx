import type { Vehicle } from "../types";
import { Button } from "@/components/ui/button";
import { MoreVertical, Edit, Trash, Eye } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { PATHS } from "@/routes/paths";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface VehicleActionCellProps {
  vehicle: Vehicle;
  onEdit: (vehicle: Vehicle) => void;
  onDelete: (vehicle: Vehicle) => void;
}

export const VehicleActionCell = ({
  vehicle,
  onEdit,
  onDelete,
}: VehicleActionCellProps) => {
  const navigate = useNavigate();

  return (
    <TooltipProvider delayDuration={300}>
      <div className="flex items-center justify-end">
        <DropdownMenu>
          <Tooltip>
            <TooltipTrigger asChild>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="h-8 w-8 p-0 hover:bg-slate-100"
                >
                  <MoreVertical className="h-4 w-4" />
                  <span className="sr-only">Acciones</span>
                </Button>
              </DropdownMenuTrigger>
            </TooltipTrigger>
            <TooltipContent side="left">
              <p>Acciones de unidad</p>
            </TooltipContent>
          </Tooltip>

          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuItem
              onClick={() => navigate(PATHS.VEHICLES.DETAILS(vehicle.id))}
              className="cursor-pointer"
            >
              <Eye className="mr-2 h-4 w-4" />
              <span>Ver Detalles</span>
            </DropdownMenuItem>

            <DropdownMenuItem
              onClick={() => onEdit(vehicle)}
              className="cursor-pointer"
            >
              <Edit className="mr-2 h-4 w-4" />
              <span>Editar</span>
            </DropdownMenuItem>

            <DropdownMenuItem
              className="text-red-600 focus:text-red-600 focus:bg-red-50 cursor-pointer"
              onClick={() => onDelete(vehicle)}
            >
              <Trash className="mr-2 h-4 w-4" />
              <span>Borrar</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </TooltipProvider>
  );
};
