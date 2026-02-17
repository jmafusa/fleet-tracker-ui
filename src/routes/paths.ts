export const PATHS = {
  ROOT: "/",
  VEHICLES: {
    LIST: "/vehicles",
    NEW: "/vehicles/new",
    DETAILS: (id: string) => `/vehicles/${id}`,
  },
};
