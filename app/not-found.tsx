import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100 px-4">
      <div className="text-center max-w-sm">
        <div className="text-6xl font-bold text-slate-200 mb-2">404</div>
        <h2 className="text-lg font-semibold text-slate-900 mb-1">Página no encontrada</h2>
        <p className="text-sm text-slate-500 mb-6">La página que buscas no existe o fue movida.</p>
        <Link
          href="/"
          className="px-4 py-2 text-sm font-medium text-white bg-violet-600 rounded-lg hover:bg-violet-700 transition-colors"
        >
          Ir al inicio
        </Link>
      </div>
    </div>
  );
}
