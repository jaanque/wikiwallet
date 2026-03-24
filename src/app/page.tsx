import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import ProductCard from "@/components/ProductCard";
import FilterBar from "@/components/FilterBar";
import Pagination from "@/components/Pagination";
import Footer from "@/components/Footer";
import { getProducts, getTags } from "@/lib/supabase";

interface PageProps {
  searchParams: Promise<{ q?: string; tag?: string; page?: string }>;
}

export default async function Page(props: PageProps) {
  const searchParams = await props.searchParams;
  const q = searchParams.q || "";
  const tag = searchParams.tag || "";
  const page = parseInt(searchParams.page || "1");
  const limit = 10;

  const { products, totalCount } = await getProducts(q, tag, page, limit);
  const allTags = await getTags();

  return (
    <div className="min-h-screen bg-background selection:bg-primary/10 flex flex-col">
      <Navbar />
      
      <main className="max-w-[1440px] mx-auto px-6 pb-20 flex-1 w-full">
        <div className="mb-16">
          <Hero />
          <p className="mt-8 text-center text-sm text-[#4b5563] dark:text-[#cbd5e1] font-medium max-w-lg mx-auto leading-relaxed">
            Explora la arquitectura técnica de la industria global. 
            Mapeamos los componentes clave y proveedores críticos para tus decisiones de inversión.
          </p>
        </div>

        <FilterBar tags={allTags.map(t => t.name)} activeTag={tag} />
        
        {/* Result Counter & Search Context */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4 border-b border-border/40 pb-6">
          <div>
            <h2 className="text-2xl font-bold text-[#111827] dark:text-white tracking-tight">
              {tag ? (
                <>Mapa del Ecosistema <span className="text-muted/40">/</span> {tag}</>
              ) : q ? (
                <>Resultados para <span className="text-muted/40">&quot;</span>{q}<span className="text-muted/40">&quot;</span></>
              ) : (
                "Catálogo Global de Productos"
              )}
            </h2>
            <p className="text-sm text-[#4b5563] dark:text-[#cbd5e1] mt-1 font-medium">
              Encontrados <span className="text-foreground font-bold">{totalCount}</span> productos industriales
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          {products.map((product, index) => (
            <ProductCard 
              key={product.id} 
              product={product} 
              priority={index < 4}
            />
          ))}
        </div>

        {products.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="w-16 h-16 bg-muted/5 rounded-full flex items-center justify-center mb-4">
              <span className="text-2xl">🔍</span>
            </div>
            <h3 className="text-xl font-bold text-foreground">No se encontraron productos</h3>
            <p className="text-muted mt-2 max-w-xs">
              Intenta ajustar tus filtros o buscar términos más generales.
            </p>
          </div>
        )}

        <Pagination 
          currentPage={page} 
          totalPages={Math.ceil(totalCount / limit)} 
        />
      </main>

      <Footer />
    </div>
  );
}
