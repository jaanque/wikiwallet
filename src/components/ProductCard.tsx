"use client";

import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";

interface Company {
  name: string;
  logo: string;
  color: string;
}

interface ProductCardProps {
  name: string;
  description: string;
  companies: Company[];
  tags: string[];
  image: string;
}

export default function ProductCard({ name, description, companies, tags, image }: ProductCardProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleTagClick = (tag: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const params = new URLSearchParams(searchParams.toString());
    params.set("tag", tag);
    params.delete("page"); // Reset to first page
    router.push(`/?${params.toString()}`);
  };

  return (
    <div className="flex flex-col md:flex-row rounded-[24px] border border-border/60 bg-white dark:bg-[#0a0a0a] transition-all duration-300 cursor-pointer group overflow-hidden hover:border-primary/20 hover:shadow-xl hover:shadow-primary/5 w-full min-h-[200px]">
      <div className="relative h-56 md:h-auto md:w-72 shrink-0 overflow-hidden border-b md:border-b-0 md:border-r border-border/40">
        <Image 
          src={image || "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=800"} 
          alt={`Imagen ilustrativa de ${name}`} 
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 288px"
        />
      </div>
      
      <div className="flex flex-col flex-1 min-w-0">
        <div className="flex flex-col p-8 flex-1 relative justify-center">
          <div className="flex-1 min-w-0">
            <h3 className="font-bold text-[22px] text-[#111827] dark:text-white leading-tight mb-2 group-hover:text-primary transition-colors">
              {name}
            </h3>
            <p className="text-[#64748b] dark:text-[#94a3b8] text-[15px] leading-relaxed line-clamp-2">
              {description}
            </p>
          </div>
        </div>
        
        <div className="px-8 py-4 bg-[#fcfdfe]/50 dark:bg-[#0d0d0d]/50 border-t border-border/40">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex flex-wrap gap-2">
              {tags.map((tag, index) => (
                <button 
                  key={index} 
                  onClick={(e) => handleTagClick(tag, e)}
                  className="px-3 py-1 rounded-full bg-primary/5 hover:bg-primary/10 border border-primary/10 text-[10px] font-bold text-primary uppercase tracking-wider transition-all hover:scale-105 cursor-pointer"
                >
                  {tag}
                </button>
              ))}
            </div>
            <div className="flex -space-x-2.5 group-hover:-space-x-1 transition-all duration-500 ease-out" role="list" aria-label="Lista de empresas componentes">
              {companies.slice(0, 8).map((company, index) => (
                <div 
                  key={index}
                  role="img"
                  aria-label={`Logo de ${company.name}`}
                  className="relative w-8 h-8 rounded-[10px] border-2 border-white dark:border-[#0d0d0d] flex items-center justify-center text-[11px] font-bold text-white transition-all duration-300 hover:scale-125 hover:z-50 cursor-help"
                  style={{ 
                    backgroundColor: company.color,
                    zIndex: 10 - index
                  }}
                  title={company.name}
                >
                  {company.logo || company.name.substring(0, 1)}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
