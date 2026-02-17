import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Search,
  X,
  Filter,
  ArrowUpDown,
  ChevronDown,
  Plus,
  type LucideIcon,
} from "lucide-react";
import { useEffect, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface DataTableToolbarProps {
  showSearch?: boolean;
  searchPlaceholder?: string;
  onSearch?: (value: string) => void;
  showFilters?: boolean;
  filterContent?: React.ReactNode;
  showSorting?: boolean;
  onSortClick?: () => void;
  currentSortLabel?: string;
  primaryAction?: {
    label: string;
    icon?: LucideIcon;
    onClick: () => void;
    disabled?: boolean;
  };
}

export const DataTableToolbar = ({
  showSearch = false,
  searchPlaceholder = "Buscar...",
  onSearch,
  showFilters = false,
  filterContent,
  showSorting = false,
  onSortClick,
  currentSortLabel = "Ordenar",
  primaryAction,
}: DataTableToolbarProps) => {
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    if (!onSearch) return;
    const timer = setTimeout(() => onSearch(searchValue), 400);
    return () => clearTimeout(timer);
  }, [searchValue, onSearch]);

  return (
    <div className="flex flex-wrap items-center justify-between gap-4 py-4">
      <div className="flex flex-1 items-center gap-2">
        {showSearch && (
          <div className="relative w-full min-w-xs max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <Input
              placeholder={searchPlaceholder}
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              className="pl-9 bg-white focus-visible:ring-primary-300 focus-visible:ring-offset-0 focus-visible:ring-1"
            />
            {searchValue && (
              <Button
                variant="ghost"
                onClick={() => setSearchValue("")}
                className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
              >
                <X className="h-4 w-4 text-slate-400" />
              </Button>
            )}
          </div>
        )}

        {showSorting && (
          <Button
            variant="outline"
            size="sm"
            className="h-10"
            onClick={onSortClick}
          >
            <ArrowUpDown className="mr-2 h-4 w-4" />
            {currentSortLabel}
          </Button>
        )}

        {showFilters && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="h-10">
                <Filter className="mr-2 h-4 w-4" />
                Filtros
                <ChevronDown className="ml-2 h-4 w-4 opacity-50" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-50 p-2">
              {filterContent}
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>

      {primaryAction && (
        <Button
          onClick={primaryAction.onClick}
          disabled={primaryAction.disabled}
          className="h-10 px-4 hover:cursor-pointer"
        >
          {primaryAction.icon ? (
            <primaryAction.icon className="mr-2 h-4 w-4" />
          ) : (
            <Plus className="mr-2 h-4 w-4" />
          )}
          {primaryAction.label}
        </Button>
      )}
    </div>
  );
};
