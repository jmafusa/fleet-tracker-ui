import { Car, Plus } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { PATHS } from "@/routes/paths";
import { cn } from "@/lib/utils";
import logoIcon from "@/assets/react.svg";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface SidebarProps {
  isCollapsed: boolean;
  setIsCollapsed: (value: boolean) => void;
}

const menuItems = [
  { title: "Lista de Vehículos", icon: Car, path: PATHS.VEHICLES.LIST },
  { title: "Nuevo Vehículo", icon: Plus, path: PATHS.VEHICLES.NEW },
];

export const AppSidebar = ({ isCollapsed, setIsCollapsed }: SidebarProps) => {
  const { pathname } = useLocation();

  return (
    <TooltipProvider delayDuration={0}>
      <aside
        className={cn(
          " bg-white/80 shadow-md h-screen flex flex-col sticky top-0 transition-all duration-300 z-20",
          isCollapsed ? "w-20" : "w-64",
        )}
      >
        <div
          className={cn(
            "px-4 flex items-center h-20 border-b border-slate-50",
            isCollapsed ? "justify-center" : "justify-between",
          )}
        >
          {!isCollapsed && (
            <span className="text-xl font-bold text-blue-600 truncate animate-in fade-in duration-200">
              FleetTrackerUI
            </span>
          )}

          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="shrink-0 p-1 hover:bg-slate-50 rounded-lg transition-colors"
          >
            <img
              src={logoIcon}
              alt="Toggle"
              className={cn("transition-all duration-300 ease-linear w-8 h-8")}
            />
          </button>
        </div>

        <nav className="flex-1 px-3 space-y-2 mt-2">
          {menuItems.map((item) => {
            const isActive = pathname === item.path;

            return (
              <Tooltip key={item.path} delayDuration={0}>
                <TooltipTrigger asChild>
                  <Link
                    to={item.path}
                    className={cn(
                      "flex items-center gap-3 px-3 py-3 rounded-lg text-sm font-medium transition-colors",
                      isActive
                        ? "bg-blue-100 text-blue-600"
                        : "text-slate-600 hover:bg-slate-100 hover:text-slate-700",
                      isCollapsed && "justify-center px-0",
                    )}
                  >
                    <item.icon size={22} className="shrink-0" />
                    {!isCollapsed && (
                      <span className="truncate">{item.title}</span>
                    )}
                  </Link>
                </TooltipTrigger>
                {isCollapsed && (
                  <TooltipContent side="right" sideOffset={10}>
                    {item.title}
                  </TooltipContent>
                )}
              </Tooltip>
            );
          })}
        </nav>
      </aside>
    </TooltipProvider>
  );
};
