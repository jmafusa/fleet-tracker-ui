import api from "@/lib/api";
import type { Vehicle } from "../types";
import type { SortingState } from "@tanstack/react-table";

export const VehicleService = {
  getAll: async (params: {
    page: number;
    limit: number;
    search?: string;
    statuses?: string[];
    sorting?: SortingState;
  }) => {
    const queryParams = new URLSearchParams();
    queryParams.append("_page", params.page.toString());
    queryParams.append("_limit", params.limit.toString());

    if (params.search) queryParams.append("q", params.search);
    params.statuses?.forEach((s) => queryParams.append("status", s));

    if (params.sorting?.length) {
      queryParams.append("_sort", params.sorting[0].id);
      queryParams.append("_order", params.sorting[0].desc ? "desc" : "asc");
    }

    const { data, headers } = await api.get<Vehicle[]>("/vehicles", {
      params: queryParams,
    });
    const total = parseInt(headers["x-total-count"] || "0");

    return {
      data,
      total,
      totalPages: Math.ceil(total / params.limit),
    };
  },

  update: async (id: string, vehicle: Partial<Vehicle>) => {
    const { data } = await api.patch<Vehicle>(`/vehicles/${id}`, vehicle);
    return data;
  },

  delete: async (id: string) => {
    await api.delete(`/vehicles/${id}`);
    return id;
  },
};
