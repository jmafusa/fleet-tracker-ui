import { useMatches, Link } from "react-router-dom";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export const AppNavbar = () => {
  const matches = useMatches();

  const breadcrumbs = matches
    .filter((match: any) => Boolean(match.handle?.crumb))
    .map((match: any) => ({
      label: match.handle.crumb,
      path: match.pathname,
    }));

  return (
    <header className="h-16 bg-white/80 border-b border-slate-100 backdrop-blur-md sticky top-0 z-10 px-8 flex items-center">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link to="/">Panel</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>

          {breadcrumbs.map((crumb, index) => {
            const isLast = index === breadcrumbs.length - 1;

            return (
              <div key={crumb.path} className="flex items-center gap-2">
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  {isLast ? (
                    <BreadcrumbPage>{crumb.label}</BreadcrumbPage>
                  ) : (
                    <BreadcrumbLink asChild>
                      <Link to={crumb.path}>{crumb.label}</Link>
                    </BreadcrumbLink>
                  )}
                </BreadcrumbItem>
              </div>
            );
          })}
        </BreadcrumbList>
      </Breadcrumb>
    </header>
  );
};
