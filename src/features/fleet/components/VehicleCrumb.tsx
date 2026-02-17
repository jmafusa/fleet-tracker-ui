import { useParams } from "react-router-dom";
import { useVehicle } from "@/features/fleet/hooks/useVehicle";
import { Skeleton } from "@/components/ui/skeleton";

export const VehicleCrumb = () => {
  const { id } = useParams<{ id: string }>();
  const { data: vehicle, isLoading } = useVehicle(id);

  if (isLoading) {
    return <Skeleton className="h-4 w-24" />;
  }

  return <span>{vehicle?.licensePlate || "Detalle"}</span>;
};
