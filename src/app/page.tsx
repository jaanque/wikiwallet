import Navbar from "@/components/Navbar";
import ProductCard from "@/components/ProductCard";
import { 
  RepoIcon,
  getIconByName
} from "@/components/Icons";
import { supabase } from "@/lib/supabase";

interface DBCompany {
  name: string;
  logo_letter: string;
  color: string;
}

interface DBProduct {
  id: string;
  name: string;
  description: string;
  image_url: string;
  icon_name: string;
  icon_color: string;
  companies: DBCompany[];
}

interface UIProduct {
  id: string;
  name: string;
  description: string;
  image: string;
  icon: React.ReactNode;
  companies: { name: string; logo: string; color: string }[];
}

async function getProducts(searchTerm?: string): Promise<UIProduct[]> {
  let query = supabase
    .from('products')
    .select(`
      *,
      companies (*)
    `)
    .order('created_at', { ascending: true });

  if (searchTerm) {
    // Search in product name or description
    query = query.or(`name.ilike.%${searchTerm}%,description.ilike.%${searchTerm}%`);
  }

  const { data, error } = await query;

  if (error) {
    console.error('Error fetching products:', error);
    return [];
  }

  return (data as DBProduct[]).map((product) => ({
    id: product.id,
    name: product.name,
    description: product.description,
    image: product.image_url,
    icon: (
      <RepoIcon color={product.icon_color}>
        {(() => {
          const IconComponent = getIconByName(product.icon_name);
          return <IconComponent className="w-10 h-10" />;
        })()}
      </RepoIcon>
    ),
    companies: product.companies.map((company) => ({
      name: company.name,
      logo: company.logo_letter,
      color: company.color
    }))
  }));
}

interface PageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function Home({ searchParams }: PageProps) {
  const params = await searchParams;
  const q = typeof params.q === 'string' ? params.q : undefined;
  const products = await getProducts(q);

  return (
    <main className="min-h-screen bg-[#fcfdfe] dark:bg-[#060606]">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-6 pt-10 pb-16">
        <div className="max-w-3xl mb-16 mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-[#111827] dark:text-white mb-6 tracking-tight">
            Ecosistema de Inversiones <span className="text-muted/40">WikiWallet</span>
          </h1>
          <p className="text-lg text-[#64748b] dark:text-[#94a3b8] leading-relaxed">
            Explora las empresas, componentes y proveedores tecnológicos que mueven el mercado global.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
          {products.length > 0 ? (
            products.map((product: UIProduct) => (
              <ProductCard key={product.id} {...product} />
            ))
          ) : (
            <div className="col-span-full py-20 text-center">
              <p className="text-muted italic">
                {q ? `No se encontraron productos para "${q}"` : "No se encontraron productos en la base de datos."}
              </p>
              {!q && <p className="text-xs text-muted/50 mt-2">Asegúrate de haber ejecutado el script SQL en Supabase.</p>}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
