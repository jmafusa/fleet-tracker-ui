export type VehicleStatus = "Activo" | "Fuera de Servicio" | "Mantenimiento";
export type GPSStatus = "En línea" | "Fuera de línea";

export interface Vehicle {
  id: string;
  licensePlate: string;
  make: string;
  model: string;
  year: number;
  status: VehicleStatus;
  lastServiceDate: string;
  mileage: number;
  gpsStatus: GPSStatus;
  location: string;
}

export interface VehicleResponse {
  vehicles: Vehicle[];
}
