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
  icon: React.ReactNode;
  image: string;
}

export default function ProductCard({ name, description, companies, icon, image }: ProductCardProps) {
  return (
    <div className="flex flex-col md:flex-row rounded-[16px] border border-border bg-white dark:bg-[#0a0a0a] transition-colors duration-200 cursor-pointer group overflow-hidden hover:border-muted/50 w-full min-h-[180px]">
      <div className="relative h-48 md:h-auto md:w-64 shrink-0 overflow-hidden border-b md:border-b-0 md:border-r border-border/50">
        <Image 
          src={image || "/banners/macbook.png"} 
          alt={`Imagen ilustrativa de ${name}`} 
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 256px"
        />
      </div>
      
      <div className="flex flex-col flex-1 min-w-0">
        <div className="flex flex-col p-6 flex-1 relative">
          <div className="flex items-start gap-4 mb-3">
            <div className="shrink-0 w-12 h-12 flex items-center justify-center rounded-xl bg-muted/5 border border-border/50" aria-hidden="true">
              {icon}
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-bold text-[18px] text-[#111827] dark:text-white leading-snug truncate">
                {name}
              </h3>
              <p className="text-[#64748b] dark:text-[#94a3b8] text-[14px] leading-relaxed line-clamp-2 mt-1">
                {description}
              </p>
            </div>
          </div>
        </div>
        
        <div className="px-6 py-3 bg-[#fcfdfe] dark:bg-[#0d0d0d] border-t border-border/40">
          <div className="flex items-center justify-between gap-4">
            <span className="text-[10px] font-semibold text-muted/60 uppercase tracking-wider shrink-0">
              Ecosistema
            </span>
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
