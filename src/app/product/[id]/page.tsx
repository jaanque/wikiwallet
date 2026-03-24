import { getProductById } from "@/lib/supabase";
import { fetchCompanyHistory } from "@/lib/finnhub";
import { notFound } from "next/navigation";
import Image from "next/image";
import { Cpu, Activity, Zap, Factory } from "lucide-react";
import CompanyChart from "@/components/CompanyChart";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

interface PageProps {
  params: Promise<{ id: string }>;
}

const ROLES = [
  { title: "Diseño & Arquitectura", desc: "Propiedad intelectual y estructura central del dispositivo.", icon: <Cpu className="w-4 h-4" /> },
  { title: "Semiconductores", desc: "Fabricación de procesadores de nodo avanzado.", icon: <Zap className="w-4 h-4" /> },
  { title: "Sensores Ópticos", desc: "Suministro de circuitería y lentes de precisión.", icon: <Activity className="w-4 h-4" /> },
  { title: "Ensamblaje Final", desc: "Unificación de hardware bajo estándares OEM.", icon: <Factory className="w-4 h-4" /> }
];

export default async function ProductPage(props: PageProps) {
  const params = await props.params;
  const product = await getProductById(params.id);

  if (!product) {
    notFound();
  }

  // Fetch charts in parallel for all companies
  const companiesWithHistory = await Promise.all(
    (product.companies || []).map(async (company, index) => {
      const history = await fetchCompanyHistory(company.name, company.symbol);
      return {
        ...company,
        history,
        role: ROLES[index % ROLES.length]
      };
    })
  );

  return (
    <div className="min-h-screen bg-background flex flex-col selection:bg-primary/20">
      <Navbar />

      <main className="max-w-[1440px] w-full mx-auto px-6 pb-32 pt-8 md:pt-12">
        {/* Main Product Hero */}
        <div className="flex flex-col lg:flex-row bg-white dark:bg-[#0a0a0a] rounded-[32px] border border-border/60 overflow-hidden shadow-sm mb-16 hover:border-border transition-all">
           <div className="relative w-full lg:w-1/2 min-h-[400px] bg-muted/5 border-b lg:border-b-0 lg:border-r border-border/40">
             <Image 
               src={product.image_url || "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=800"} 
               fill 
               className="object-cover hover:scale-105 transition-transform duration-700" 
               alt={product.name} 
               priority 
             />
           </div>
           
           <div className="w-full lg:w-1/2 p-10 md:p-16 flex flex-col justify-center">
             <div className="flex flex-wrap gap-2 mb-6">
                {product.tags?.map(tag => (
                   <span 
                     key={tag.id} 
                     className="px-3 py-1 bg-primary/5 text-primary text-xs font-bold rounded-full border border-primary/10 uppercase tracking-wider"
                   >
                     {tag.name}
                   </span>
                ))}
             </div>
             
             <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-[#111827] dark:text-white mb-6 leading-tight">
               {product.name}
             </h1>
             
             <p className="text-[#4b5563] dark:text-[#cbd5e1] text-lg leading-relaxed">
               {product.description}
             </p>
           </div>
        </div>

        {/* Proveedores */}
        <div className="mb-8 border-b border-border/40 pb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
           <div>
             <h2 className="text-3xl font-bold tracking-tight text-[#111827] dark:text-white">
               Proveedores Críticos
             </h2>
             <p className="text-[#4b5563] dark:text-[#cbd5e1] mt-2 text-sm max-w-lg font-medium">
               Explora la arquitectura corporativa subyacente de este producto y el rendimiento accionario de cada proveedor. (Datos reales por Finnhub).
             </p>
           </div>
        </div>

        <div className="grid grid-cols-1 gap-6">
           {companiesWithHistory.map((company) => {
              const color = company.color || "#3b82f6";
              const hasData = company.history && company.history.length > 0;

              return (
                <div 
                  key={company.id} 
                  className="flex flex-col xl:flex-row bg-white dark:bg-[#0a0a0a] rounded-[24px] border border-border/60 overflow-hidden shadow-sm hover:shadow-xl hover:shadow-primary/5 hover:border-primary/20 transition-all duration-300 w-full min-h-[200px]"
                >
                   {/* Left side info */}
                   <div className="w-full xl:w-1/2 p-8 md:p-10 flex flex-col justify-center bg-white dark:bg-[#0a0a0a]">
                      <div className="flex items-center gap-5 mb-6">
                         <div 
                           className="w-14 h-14 rounded-2xl flex items-center justify-center text-white font-black text-2xl shadow-md shrink-0" 
                           style={{ backgroundColor: color }}
                         >
                            {company.logo_letter || company.name.substring(0,1)}
                         </div>
                         <div>
                           <h3 className="text-2xl font-bold text-[#111827] dark:text-white tracking-tight">
                             {company.name}
                           </h3>
                           <div className="flex items-center gap-2 mt-1 text-primary">
                             {company.role.icon}
                             <span className="text-xs font-bold tracking-wider uppercase">{company.role.title}</span>
                           </div>
                         </div>
                      </div>
                      
                      <p className="text-[#4b5563] dark:text-[#cbd5e1] leading-relaxed line-clamp-2 md:line-clamp-none font-medium">
                        {company.role.desc} Entidad confirmada en la cadena de suministros para la manufactura de este producto analizada mediante la API Finnhub en tiempo real.
                      </p>
                   </div>

                   {/* Right side graph */}
                   <div className="w-full xl:w-1/2 bg-[#fcfdfe]/50 dark:bg-[#0d0d0d]/50 border-t xl:border-t-0 xl:border-l border-border/40 p-8 flex flex-col relative h-[250px] xl:h-[300px]">
                      {!hasData ? (
                         <div className="w-full h-full flex flex-col items-center justify-center text-center px-4">
                           <div className="w-16 h-16 bg-muted/10 rounded-full flex items-center justify-center mb-4">
                             <span className="text-3xl opacity-60">📡</span>
                           </div>
                           <span className="text-[#111827] dark:text-white font-bold mb-2">Faltan Datos de Rendimiento</span>
                           <span className="text-[#4b5563] dark:text-[#cbd5e1] text-sm max-w-sm font-medium">
                             La gráfica no pudo renderizarse debido a un error de conexión con la API Finnhub o porque el símbolo no fue localizado en el mercado.
                           </span>
                         </div>
                      ) : (
                         <div className="w-full h-full flex flex-col">
                           <div className="flex items-center justify-between mb-4">
                             <span className="text-xs font-bold text-[#4b5563] dark:text-[#cbd5e1] uppercase tracking-wider">
                               Rendimiento (Últimos 30 días)
                             </span>
                             <div className="flex items-center gap-2">
                               <span className="relative flex h-2.5 w-2.5">
                                 <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                 <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                               </span>
                               <span className="text-[10px] uppercase font-bold text-emerald-500 dark:text-emerald-400">Live API</span>
                             </div>
                           </div>
                           
                           <div className="flex-1 w-full relative">
                             <CompanyChart 
                               data={company.history} 
                               color={color} 
                               ticketName={company.name} 
                             />
                           </div>
                         </div>
                      )}
                   </div>

                </div>
              );
           })}

           {companiesWithHistory.length === 0 && (
              <div className="w-full bg-muted/5 border border-dashed border-border/60 py-16 rounded-[24px] flex flex-col items-center justify-center text-center">
                 <div className="w-16 h-16 bg-muted/10 rounded-full flex items-center justify-center mb-4">
                   <span className="text-3xl opacity-60">🔍</span>
                 </div>
                 <span className="text-[#111827] dark:text-white text-xl font-bold mb-2">No hay proveedores mapeados</span>
                 <span className="text-[#4b5563] dark:text-[#cbd5e1] text-sm max-w-sm">No tenemos registros suficientes de proveedores para esta tecnología en nuestro ecosistema en este momento.</span>
              </div>
           )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
