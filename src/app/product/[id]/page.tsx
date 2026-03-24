import { getProductById } from "@/lib/supabase";
import { fetchCompanyHistory } from "@/lib/alphavantage";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Cpu, Activity, Zap, Factory } from "lucide-react";
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
      const history = await fetchCompanyHistory(company.name);
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

      <main className="flex-1 w-full pb-32">
        {/* Technical Top Hero */}
        <section className="w-full border-y border-border/40 bg-[url('/grid.svg')] bg-center relative overflow-hidden">
          <div className="absolute inset-0 bg-background/90" />
          
          <div className="relative z-10 max-w-[1440px] w-full mx-auto p-6 md:p-12 lg:p-20 flex flex-col md:flex-row gap-12 items-center">
            
            <div className="w-full md:w-1/2 flex flex-col items-start gap-6">
              <Link 
                href="/" 
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-sm bg-muted/30 border border-border/60 hover:bg-muted/50 transition-all text-[11px] font-mono font-bold text-muted-foreground hover:text-foreground uppercase tracking-wider"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                Regresar / Base de Datos
              </Link>
              
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-2 py-0.5 border border-primary/50 text-primary font-mono text-[10px] uppercase tracking-widest bg-primary/5">
                  SYS.ID: {product.id.split("-")[0].toUpperCase()}
                </span>
                {product.tags?.map((tag) => (
                  <span 
                    key={tag.id}
                    className="px-2 py-0.5 border border-border/80 text-foreground font-mono text-[10px] uppercase tracking-widest bg-muted/20"
                  >
                    {tag.name}
                  </span>
                ))}
              </div>

              <h1 className="text-4xl md:text-6xl font-black text-foreground uppercase tracking-tighter leading-[0.9]">
                {product.name}
              </h1>
              
              <p className="text-sm text-foreground/70 font-mono leading-relaxed max-w-lg border-l-2 border-primary/40 pl-4 py-1 bg-muted/5">
                {product.description}
              </p>
            </div>

            <div className="w-full md:w-1/2 h-[300px] md:h-[400px] border border-border/50 relative bg-muted/10 p-2">
              <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-primary" />
              <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-primary" />
              <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-primary" />
              <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-primary" />
              
              <div className="relative w-full h-full border border-border/30 overflow-hidden bg-background/50">
                <Image
                  src={product.image_url || "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=800"}
                  alt={product.name}
                  fill
                  className="object-cover opacity-90 mix-blend-multiply dark:mix-blend-luminosity hover:mix-blend-normal hover:opacity-100 transition-all duration-700"
                  priority
                />
                <div className="absolute top-4 left-4 bg-background/90 px-2 py-1 border border-border/50 font-mono text-[10px] text-foreground/80 shadow-sm">
                  CAM_FEED_01
                </div>
              </div>
            </div>
            
          </div>
        </section>

        {/* Technical Data Rows */}
        <section className="max-w-[1440px] mx-auto px-6 mt-16">
          <div className="mb-8 border-b border-border/40 pb-4">
            <h2 className="text-2xl font-black text-foreground uppercase tracking-widest font-mono flex items-center gap-3">
              <span className="w-3 h-3 bg-primary animate-pulse shadow-[0_0_10px_rgba(var(--primary),0.5)]" />
              Mapa de Proveedores Críticos
            </h2>
            <p className="text-xs font-mono text-muted-foreground mt-2 uppercase tracking-wide">
              Análisis de rendimiento mercantil de las entidades productoras subyacentes.
            </p>
          </div>

          <div className="flex flex-col gap-6">
            {companiesWithHistory.map((company, index) => {
              const color = company.color || "#10b981";

              return (
                <div key={company.id} className="flex flex-col xl:flex-row w-full border border-border bg-card shadow-xs relative overflow-hidden group hover:border-primary/40 transition-colors">
                  {/* Accent Line */}
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-border group-hover:bg-primary transition-colors" style={{ backgroundColor: color }} />

                  {/* Left Side: Information Display */}
                  <div className="flex-1 flex flex-col justify-between p-6 md:p-8">
                    <div>
                      <div className="flex items-center gap-4 mb-6">
                        <div 
                          className="w-12 h-12 flex items-center justify-center font-mono font-bold text-xl border shadow-[inset_0_0_15px_rgba(0,0,0,0.05)] bg-background"
                          style={{ borderColor: `${color}40`, color: color }}
                        >
                          {company.logo_letter || company.name.substring(0, 1)}
                        </div>
                        <div>
                          <h3 className="text-2xl font-bold font-mono uppercase tracking-tight text-foreground">
                            {company.name}
                          </h3>
                          <div className="flex items-center gap-2 mt-1" style={{ color: color }}>
                            {company.role.icon}
                            <span className="text-[11px] font-mono tracking-widest uppercase font-bold">
                              {company.role.title}
                            </span>
                          </div>
                        </div>
                      </div>
                      
                      <p className="text-sm text-foreground/70 font-mono leading-relaxed max-w-xl">
                        {company.role.desc} Operaciones vitales de la cadena de suministro vinculadas explícitamente a la materialización del esquema de este producto.
                      </p>
                    </div>

                    {/* Faux telemetry / data readouts */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 pt-4 border-t border-border/40 w-full lg:w-3/4">
                      <div className="flex flex-col">
                        <span className="text-[10px] text-muted-foreground font-mono uppercase tracking-widest">Estado</span>
                        <span className="text-xs text-green-600 dark:text-green-400 font-mono font-bold tracking-wider">EN LÍNEA</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[10px] text-muted-foreground font-mono uppercase tracking-widest">Riesgo</span>
                        <span className="text-xs text-yellow-600 dark:text-yellow-400 font-mono font-bold tracking-wider">NOMINAL</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[10px] text-muted-foreground font-mono uppercase tracking-widest">Nivel de Nodo</span>
                        <span className="text-xs text-foreground font-mono font-bold tracking-wider">Tier {Math.max(1, (index % 3) + 1)}</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[10px] text-muted-foreground font-mono uppercase tracking-widest">Última Acc.</span>
                        <span className="text-xs text-foreground font-mono font-bold tracking-wider">Hace 12h</span>
                      </div>
                    </div>
                  </div>

                  {/* Right Side: Graph Display */}
                  <div className="w-full xl:w-[45%] h-[240px] xl:h-auto border-t xl:border-t-0 xl:border-l border-border bg-muted/10 relative p-1">
                    <div className="absolute top-3 left-4 z-10 flex items-center gap-2">
                       <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: color }} />
                       <span className="text-[10px] font-mono text-foreground/60 uppercase tracking-widest font-bold">Rendimiento (30 Días)</span>
                    </div>
                    {/* Targeting reticle accents */}
                    <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-border/60" />
                    <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-border/60" />
                    <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-border/60" />
                    <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-border/60" />
                    
                    <div className="w-full h-full pt-8 pb-2 pr-2">
                      <CompanyChart 
                        data={company.history} 
                        color={color} 
                        ticketName={company.name}
                      />
                    </div>
                  </div>

                </div>
              );
            })}

            {companiesWithHistory.length === 0 && (
              <div className="w-full border border-dashed border-primary/30 bg-primary/5 py-12 flex flex-col items-center justify-center font-mono">
                <span className="text-primary text-xl font-bold uppercase mb-2">Error de Telemetría</span>
                <span className="text-xs text-muted-foreground">Datos de mapeo no resueltos para este identificador.</span>
              </div>
            )}
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}
