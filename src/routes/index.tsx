import { createBrowserRouter, Navigate } from "react-router-dom";
import MainLayout from "@/components/layout/MainLayout";
import NewVehiclePage from "@/pages/NewVehiclePage";
import NotFoundPage from "@/pages/NotFoundPage";
import VehicleDetailPage from "@/pages/VehicleDetailPage";
import VehiclesListPage from "@/pages/VehiclesListPage";
import { VehicleCrumb } from "@/features/fleet/components/VehicleCrumb";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Navigate to="/vehicles" replace />,
      },
      {
        path: "vehicles",
        handle: { crumb: "Vehículos" },
        children: [
          {
            index: true,
            element: <VehiclesListPage />,
          },
          // {
          //   path: "new",
          //   element: <NewVehiclePage />,
          //   handle: { crumb: "Nuevo" },
          // },
          {
            path: ":id",
            element: <VehicleDetailPage />,
            handle: { crumb: <VehicleCrumb /> },
          },
        ],
      },
    ],
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);
