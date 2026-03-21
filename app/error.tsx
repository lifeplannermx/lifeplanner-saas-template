"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100 px-4">
      <div className="text-center max-w-sm">
        <h2 className="text-lg font-semibold text-slate-900 mb-1">Algo salió mal</h2>
        <p className="text-sm text-slate-500 mb-4">{error.message || "Error inesperado"}</p>
        <button
          onClick={reset}
          className="px-4 py-2 text-sm font-medium text-white bg-violet-600 rounded-lg hover:bg-violet-700 transition-colors"
        >
          Reintentar
        </button>
      </div>
    </div>
  );
}
