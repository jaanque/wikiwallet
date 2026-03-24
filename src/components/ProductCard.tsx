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
    <div className="flex flex-col rounded-[16px] border border-border bg-white dark:bg-[#0a0a0a] transition-colors duration-200 cursor-pointer group overflow-hidden hover:border-muted/50">
      <div className="relative h-32 w-full overflow-hidden border-b border-border/50">
        <Image 
          src={image} 
          alt={`Imagen ilustrativa de ${name}`} 
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      
      <div className="flex flex-col p-5 pt-0 flex-1 relative">
        <div className="relative -mt-7 mb-3 flex items-center justify-center w-14 h-14" aria-hidden="true">
          {icon}
        </div>
        
        <h3 className="font-bold text-[17px] text-[#111827] dark:text-white mb-2 leading-snug">
          {name}
        </h3>
        
        <p className="text-[#64748b] dark:text-[#94a3b8] text-[14px] leading-relaxed line-clamp-2 mb-4">
          {description}
        </p>
      </div>
      
      <div className="px-5 py-4 bg-[#fcfdfe] dark:bg-[#0d0d0d] border-t border-border/40 overflow-hidden">
        <div className="flex flex-col gap-2">
          <span className="text-[11px] font-semibold text-muted/60 uppercase tracking-wider">
            Empresas participantes
          </span>
          <div className="flex -space-x-3 group-hover:space-x-1.5 transition-all duration-500 ease-out" role="list" aria-label="Lista de empresas componentes">
            {companies.slice(0, 6).map((company, index) => (
              <div 
                key={index}
                role="img"
                aria-label={`Logo de ${company.name}`}
                className="relative w-8 h-8 rounded-[10px] border-2 border-white dark:border-[#0d0d0d] flex items-center justify-center text-[10px] font-bold text-white transition-all duration-300 hover:scale-110! hover:z-20 cursor-help"
                style={{ 
                  backgroundColor: company.color,
                  zIndex: 10 - index
                }}
                title={company.name}
              >
                {company.logo || company.name.substring(0, 1)}
              </div>
            ))}
            {companies.length > 6 && (
              <div className="relative w-8 h-8 rounded-[10px] border-2 border-white dark:border-[#0d0d0d] bg-muted/10 flex items-center justify-center text-[10px] font-medium text-muted z-0">
                +{companies.length - 6}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
