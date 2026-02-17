import { Link } from "react-router-dom";
import { AlertTriangle } from "lucide-react";
import { PATHS } from "@/routes/paths";

const NotFoundPage = () => {
  return (
    <div className="h-screen w-full flex flex-col items-center justify-center bg-slate-50 p-4">
      <div className="text-center space-y-6 max-w-md">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-amber-100 text-amber-600 mb-4 shadow-sm">
          <AlertTriangle size={40} />
        </div>

        <div className="space-y-2">
          <h1 className="text-6xl font-black text-slate-900 tracking-tighter">
            404
          </h1>
          <h2 className="text-2xl font-bold text-slate-800">
            Página no encontrada
          </h2>
        </div>

        <div className="pt-0">
          <Link
            to={PATHS.ROOT}
            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-all shadow-lg shadow-blue-200"
          >
            Volver al panel principal
          </Link>
        </div>
      </div>

      <div className="fixed bottom-10 text-slate-300 text-sm font-medium tracking-widest uppercase">
        Fleet Tracker UI
      </div>
    </div>
  );
};

export default NotFoundPage;
