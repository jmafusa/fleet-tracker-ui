import { useState } from "react";
import { Outlet } from "react-router-dom";
import { AppSidebar } from "./AppSidebar";
import { AppNavbar } from "./AppNavbar";

const MainLayout = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className="flex min-h-screen bg-slate-100">
      <AppSidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />

      <div className="flex-1 flex flex-col transition-all duration-300">
        <AppNavbar />
        <main className="px-8 py-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
