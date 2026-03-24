"use client";

import { Moon, Sun, MintifyLogo, Search } from "./Icons";
import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";

function SearchInput() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const q = searchParams.get("q") || "";
  const [searchQuery, setSearchQuery] = useState(q);

  // Sync searchQuery with URL params if they change externally (e.g. back button)
  useEffect(() => {
    setSearchQuery(q);
  }, [q]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set("q", value);
    } else {
      params.delete("q");
    }
    router.replace(`/?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="flex-1 max-w-md relative">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <Search className="h-4 w-4 text-muted" />
      </div>
      <input
        type="text"
        placeholder="Buscar productos o empresas..."
        value={searchQuery}
        onChange={handleSearch}
        className="block w-full pl-10 pr-3 py-2 border border-border rounded-xl bg-muted/5 text-sm placeholder:text-muted/60 focus:outline-hidden focus:ring-2 focus:ring-primary/5 transition-all"
      />
    </div>
  );
}

export default function Navbar() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDark]);

  return (
    <nav className="flex items-center justify-between px-6 py-3 max-w-[1440px] mx-auto w-full border-b border-border/50 mb-8 gap-4">
      <div className="flex items-center gap-2 shrink-0">
        <MintifyLogo className="w-8 h-8 text-foreground" />
        <span className="font-bold text-xl tracking-tight hidden sm:block">wikiwallet</span>
      </div>

      <Suspense fallback={<div className="flex-1 max-w-md h-10 bg-muted/5 rounded-xl border border-border animate-pulse" />}>
        <SearchInput />
      </Suspense>

      <button
        onClick={() => setIsDark(!isDark)}
        className="p-2 rounded-lg hover:bg-hover-bg transition-colors border border-border shrink-0"
        aria-label="Toggle theme"
      >
        {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
      </button>
    </nav>
  );
}
