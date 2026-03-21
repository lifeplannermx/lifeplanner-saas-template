export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100">
      <div className="flex items-center gap-2 text-slate-500">
        <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
        </svg>
        <span className="text-sm">Cargando...</span>
      </div>
    </div>
  );
}
