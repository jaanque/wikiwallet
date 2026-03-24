"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useRef } from "react";
import { X } from "lucide-react";

interface FilterBarProps {
  tags: string[];
  activeTag?: string;
}

export default function FilterBar({ tags, activeTag }: FilterBarProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleTagClick = (tag: string | null) => {
    const params = new URLSearchParams(searchParams.toString());
    
    if (tag) {
      params.set("tag", tag);
    } else {
      params.delete("tag");
    }
    
    // Reset to page 1 on filter change
    params.set("page", "1");
    
    router.push(`/?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="relative mb-8 -mx-6">
      <div 
        ref={scrollRef}
        aria-label="Ecosistema de etiquetas"
        className="flex items-center gap-2 overflow-x-auto py-8 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] px-6 snap-x"
      >
        <button
          onClick={() => handleTagClick(null)}
          className={`
            px-7 py-2.5 rounded-full text-[13px] font-bold transition-all duration-300 shrink-0 shadow-sm snap-start
            ${!activeTag 
              ? "bg-[#111827] text-white dark:bg-white dark:text-black shadow-lg shadow-black/20 scale-105" 
              : "bg-white dark:bg-[#0d0d0d] text-[#4b5563] border border-border/60 hover:border-muted hover:text-[#111827] dark:hover:text-white"
            }
          `}
        >
          Todos
        </button>

        {tags.map((tag) => (
          <button
            key={tag}
            onClick={() => (activeTag === tag ? handleTagClick(null) : handleTagClick(tag))}
            className={`
              px-7 py-2.5 rounded-full text-[13px] font-bold transition-all duration-300 shrink-0 shadow-sm snap-start flex items-center gap-2
              ${activeTag === tag
                ? "bg-[#111827] text-white dark:bg-white dark:text-black shadow-lg shadow-black/20 scale-105"
                : "bg-white dark:bg-[#0d0d0d] text-[#4b5563] border border-border/60 hover:border-muted hover:text-[#111827] dark:hover:text-white"
              }
            `}
          >
            {tag}
            {activeTag === tag && (
              <X className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100 transition-opacity" />
            )}
          </button>
        ))}
        
        {/* Spacer at the end */}
        <div className="w-6 shrink-0" aria-hidden="true" />
      </div>
      
      {/* Right gradient only to indicate more tags */}
      <div className="absolute top-0 right-0 h-full w-20 bg-linear-to-l from-[#fcfdfe] dark:from-[#060606] to-transparent pointer-events-none z-10" />
    </div>
  );
}
