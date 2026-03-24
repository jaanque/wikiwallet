// ProductCard.tsx

import Image from "next/image";

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
  return (
    <div className="flex flex-col md:flex-row rounded-[16px] border border-border bg-white dark:bg-[#0a0a0a] transition-colors duration-200 cursor-pointer group overflow-hidden hover:border-muted/50 w-full min-h-[180px]">
      <div className="relative h-48 md:h-auto md:w-64 shrink-0 overflow-hidden border-b md:border-b-0 md:border-r border-border/50">
        <Image 
          src={image || "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=800"} 
          alt={`Imagen ilustrativa de ${name}`} 
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 256px"
        />
      </div>
      
      <div className="flex flex-col flex-1 min-w-0">
        <div className="flex flex-col p-6 flex-1 relative justify-center">
          <div className="flex-1 min-w-0">
            <h3 className="font-bold text-[18px] text-[#111827] dark:text-white leading-snug truncate">
              {name}
            </h3>
            <p className="text-[#64748b] dark:text-[#94a3b8] text-[14px] leading-relaxed line-clamp-2 mt-1">
              {description}
            </p>
          </div>
        </div>
        
        <div className="px-6 py-3 bg-[#fcfdfe] dark:bg-[#0d0d0d] border-t border-border/40">
          <div className="flex items-center justify-between gap-4">
            <div className="flex flex-wrap gap-1.5 max-h-5 overflow-hidden items-center">
              {tags.map((tag, index) => (
                <span 
                  key={index} 
                  className="px-2 py-0.5 rounded-full bg-muted/10 border border-border/40 text-[9px] font-bold text-muted-foreground uppercase tracking-wider shrink-0"
                >
                  {tag}
                </span>
              ))}
            </div>
            <div className="flex -space-x-2 group-hover:space-x-1.5 transition-all duration-500 ease-out" role="list" aria-label="Lista de empresas componentes">
              {companies.slice(0, 8).map((company, index) => (
                <div 
                  key={index}
                  role="img"
                  aria-label={`Logo de ${company.name}`}
                  className="relative w-7 h-7 rounded-[8px] border-2 border-white dark:border-[#0d0d0d] flex items-center justify-center text-[10px] font-bold text-white transition-all duration-300 hover:scale-110! hover:z-20 cursor-help"
                  style={{ 
                    backgroundColor: company.color,
                    zIndex: 10 - index
                  }}
                  title={company.name}
                >
                  {company.logo || company.name.substring(0, 1)}
                </div>
              ))}
              {companies.length > 8 && (
                <div className="relative w-7 h-7 rounded-[8px] border-2 border-white dark:border-[#0d0d0d] bg-muted/10 flex items-center justify-center text-[9px] font-medium text-muted z-0">
                  +{companies.length - 8}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
