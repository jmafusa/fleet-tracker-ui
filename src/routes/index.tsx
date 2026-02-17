import { createBrowserRouter, Navigate } from "react-router-dom";

import NewVehiclePage from "@/pages/NewVehiclePage";
import NotFoundPage from "@/pages/NotFoundPage";
import VehicleDetailPage from "@/pages/VehicleDetailPage";
import VehiclesListPage from "@/pages/VehiclesListPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/vehicles" replace />,
  },
  {
    path: "vehicles",
    children: [
      {
        index: true,
        element: <VehiclesListPage />,
      },
      {
        path: "new",
        element: <NewVehiclePage />,
      },
      {
        path: ":id",
        element: <VehicleDetailPage />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);
