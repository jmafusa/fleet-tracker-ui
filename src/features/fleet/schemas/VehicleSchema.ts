import * as z from "zod";

export const VehicleSchema = z.object({
  licensePlate: z
    .string()
    .min(6, "La placa debe tener al menos 6 caracteres")
    .max(20, "La placa no puede tener más de 20 caracteres"),
  make: z.string().min(2, "La marca es requerida"),
  model: z.string().min(1, "El modelo es requerido"),
  year: z.coerce
    .number()
    .int()
    .min(1900, "El año debe ser mayor o igual a 1900")
    .max(new Date().getFullYear() + 2, "Año no válido"),
  status: z.enum(["Activo", "Mantenimiento", "Fuera de Servicio"]),
  lastServiceDate: z
    .string()
    .min(1, "La fecha de último servicio es requerida")
    .refine((date) => {
      const [year, month, day] = date.split("-").map(Number);
      const selectedDate = new Date(year, month - 1, day);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      return selectedDate <= today;
    }, "La fecha del último servicio no puede ser futura"),
  mileage: z.coerce.number().min(0, "El kilometraje no puede ser negativo"),
  gpsStatus: z.enum(["En línea", "Fuera de línea"]),
  location: z.string().min(1, "La ubicación es requerida"),
});

export type VehicleFormValues = z.infer<typeof VehicleSchema>;
