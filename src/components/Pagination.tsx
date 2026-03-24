"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { ChevronLeft, ChevronRight } from "./Icons";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
}

export default function Pagination({ currentPage, totalPages }: PaginationProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return;
    
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", page.toString());
    router.push(`/?${params.toString()}`, { scroll: true });
  };

  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-center gap-4 mt-12 pb-16">
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage <= 1}
        aria-label="Ir a la página anterior"
        className="flex items-center gap-1 px-4 py-2 rounded-xl border border-border bg-white dark:bg-[#0a0a0a] text-sm font-medium disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer hover:bg-muted/5 transition-all active:scale-95 translate-y-0 hover:-translate-y-0.5"
      >
        <ChevronLeft className="w-4 h-4" />
        <span className="hidden sm:inline">Anterior</span>
      </button>

      <div className="flex items-center gap-2">
        <span className="text-sm text-[#4b5563] dark:text-[#cbd5e1] font-medium">
          Página <span className="font-bold text-foreground">{currentPage}</span> de <span className="font-bold text-foreground">{totalPages}</span>
        </span>
      </div>

      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage >= totalPages}
        aria-label="Ir a la página siguiente"
        className="flex items-center gap-1 px-4 py-2 rounded-xl border border-border bg-white dark:bg-[#0a0a0a] text-sm font-medium disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer hover:bg-muted/5 transition-all active:scale-95 translate-y-0 hover:-translate-y-0.5"
      >
        <span className="hidden sm:inline">Siguiente</span>
        <ChevronRight className="w-4 h-4" />
      </button>
    </div>
  );
}
