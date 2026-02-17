import type { Vehicle } from "../types";
import { Button } from "@/components/ui/button";
import { MoreVertical, Edit, Trash } from "lucide-react";
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
}

export const VehicleActionCell = ({ vehicle }: VehicleActionCellProps) => {
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

          <DropdownMenuContent align="end" className="w-[160px]">
            <DropdownMenuItem
              onClick={() => console.log("Editar", vehicle.id)}
              className="cursor-pointer"
            >
              <Edit className="mr-2 h-4 w-4" />
              <span>Editar</span>
            </DropdownMenuItem>

            <DropdownMenuItem
              className="text-red-600 focus:text-red-600 focus:bg-red-50 cursor-pointer"
              onClick={() => console.log("Borrar", vehicle.id)}
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
