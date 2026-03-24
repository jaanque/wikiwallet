import { getProductById } from "@/lib/supabase";
import { fetchCompanyHistory } from "@/lib/alphavantage";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import CompanyChart from "@/components/CompanyChart";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function ProductPage(props: PageProps) {
  const params = await props.params;
  const product = await getProductById(params.id);

  if (!product) {
    notFound();
  }

  // Fetch charts in parallel for all companies
  const companiesWithHistory = await Promise.all(
    (product.companies || []).map(async (company) => {
      const history = await fetchCompanyHistory(company.name);
      return {
        ...company,
        history,
      };
    })
  );

  return (
    <div className="min-h-screen bg-background flex flex-col selection:bg-primary/20">
      <Navbar />

      <main className="max-w-[1200px] mx-auto px-6 py-12 flex-1 w-full">
        {/* Back navigation */}
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-10 transition-colors font-medium"
        >
          <ChevronLeft size={18} />
          Volver al catálogo
        </Link>

        {/* Product Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 mb-20 items-center">
          <div className="relative aspect-video lg:aspect-square w-full rounded-[32px] overflow-hidden border border-border shadow-2xl shadow-primary/5">
            <Image
              src={product.image_url || "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=800"}
              alt={product.name}
              fill
              className="object-cover hover:scale-105 transition-transform duration-[2s] ease-out"
              priority
            />
          </div>

          <div className="flex flex-col justify-center">
            <div className="flex flex-wrap gap-2 mb-6">
              {product.tags?.map((tag) => (
                <span 
                  key={tag.id}
                  className="px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-xs font-bold text-primary uppercase tracking-wider"
                >
                  {tag.name}
                </span>
              ))}
            </div>
            
            <h1 className="text-5xl lg:text-7xl font-black text-foreground mb-6 tracking-tight leading-none">
              {product.name}
            </h1>
            
            <p className="text-xl text-muted-foreground leading-relaxed">
              {product.description}
            </p>
          </div>
        </div>

        {/* Architecture & Companies section */}
        <div className="pt-20 border-t border-border/40">
          <h2 className="text-3xl md:text-5xl font-extrabold text-foreground mb-4 tracking-tight">
            Proveedores Críticos
          </h2>
          <p className="text-muted-foreground text-lg mb-12 max-w-2xl leading-relaxed">
            Explora las empresas corporativas subyacentes que hacen posible la manufactura y funcionamiento de {product.name}. A continuación, se muestra el rendimiento accionario de cada componente.
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {companiesWithHistory.map((company) => {
              const color = company.color || "#06b6d4"; // Default cyan
              return (
                <div 
                  key={company.id}
                  className="rounded-[24px] border border-border/60 bg-muted/5 backdrop-blur-sm p-8 hover:border-border transition-colors hover:shadow-xl hover:shadow-primary/5 flex flex-col gap-6"
                >
                  <div className="flex items-center gap-5">
                    <div 
                      className="w-14 h-14 rounded-2xl flex items-center justify-center text-white font-black text-2xl shadow-md"
                      style={{ backgroundColor: color }}
                    >
                      {company.logo_letter || company.name.substring(0, 1)}
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-foreground">
                        {company.name}
                      </h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        Socio tecnológico clave de {product.name}
                      </p>
                    </div>
                  </div>

                  {/* Chart space */}
                  <div className="h-48 w-full mt-4 bg-background rounded-2xl border border-border/50 p-4 relative overflow-hidden group">
                    <CompanyChart 
                      data={company.history} 
                      color={color} 
                      ticketName={company.name}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          {companiesWithHistory.length === 0 && (
            <div className="py-20 text-center text-muted-foreground border border-dashed border-border rounded-3xl">
              No hay proveedores listados para este producto.
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
