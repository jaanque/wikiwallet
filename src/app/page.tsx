import FilterBar from "@/components/FilterBar";
import Navbar from "@/components/Navbar";
import ProductCard from "@/components/ProductCard";
import { supabase } from "@/lib/supabase";
import React from "react";
import Pagination from "@/components/Pagination";

interface DBCompany {
  id: string;
  name: string;
  logo: string | null;
  color: string;
}

interface DBProduct {
  id: string;
  name: string;
  description: string;
  image_url: string;
  icon_name: string;
  icon_color: string;
  companies: { company: DBCompany }[];
  tags: { tag: { name: string } }[];
}

interface UIProduct {
  id: string;
  name: string;
  description: string;
  image: string;
  companies: { name: string; logo: string; color: string }[];
  tags: string[];
}

async function getTags() {
  const { data, error } = await supabase
    .from("tags")
    .select("*")
    .order("name");

  if (error) {
    console.error("Error fetching tags:", error);
    return [];
  }
  return data;
}

async function getProducts(keyword?: string, page: number = 1, tag?: string): Promise<{ products: UIProduct[], totalPages: number }> {
  const ITEMS_PER_PAGE = 10;
  const from = (page - 1) * ITEMS_PER_PAGE;
  const to = from + ITEMS_PER_PAGE - 1;

  // Si hay un tag, usamos !inner para filtrar solo esos productos
  // Si no hay tag, usamos el join normal para que salgan TODOS los productos (aunque no tengan tags)
  const selectQuery = tag 
    ? `
      *,
      companies:product_companies(company:companies(*)),
      tags:product_tags!inner(tag:tags!inner(*))
    `
    : `
      *,
      companies:product_companies(company:companies(*)),
      tags:product_tags(tag:tags(*))
    `;

  let query = supabase
    .from("products")
    .select(selectQuery, { count: 'exact' });

  if (keyword) {
    query = query.or(`name.ilike.%${keyword}%,description.ilike.%${keyword}%`);
  }

  if (tag) {
    query = query.eq('tags.tag.name', tag);
  }

  const { data, count, error } = await query
    .order('created_at', { ascending: false })
    .range(from, to);

  if (error || !data) {
    console.error("Error fetching products:", JSON.stringify(error, null, 2));
    return { products: [], totalPages: 0 };
  }

  const products: UIProduct[] = (data as unknown as DBProduct[]).map((p) => ({
    id: p.id,
    name: p.name,
    description: p.description,
    image: p.image_url,
    companies: p.companies.map((c) => ({
      name: c.company.name,
      logo: c.company.logo || "",
      color: c.company.color
    })),
    tags: p.tags?.map((t) => t.tag.name) || []
  }));

  const totalPages = Math.ceil((count || 0) / ITEMS_PER_PAGE);

  return { products, totalPages };
}


export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ q?: string, page?: string, tag?: string }>;
}) {
  const { q, page, tag } = await searchParams;
  const currentPage = Number(page) || 1;
  const [{ products, totalPages }, allTags] = await Promise.all([
    getProducts(q, currentPage, tag),
    getTags()
  ]);

  return (
    <main className="min-h-screen bg-[#fcfdfe] dark:bg-[#060606]">
      <Navbar />
      
      <div className="max-w-[1440px] mx-auto px-6 pt-10 pb-16">
        <div className="max-w-3xl mb-12 mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-[#111827] dark:text-white mb-6 tracking-tight">
            Ecosistema de Inversiones <span className="text-muted/40">WikiWallet</span>
          </h1>
          <p className="text-lg text-[#64748b] dark:text-[#94a3b8] leading-relaxed">
            Explora las empresas, componentes y proveedores tecnológicos que mueven el mercado global.
          </p>
        </div>

        <FilterBar tags={allTags.map(t => t.name)} activeTag={tag} />
        
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-10 mt-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
          {products.length > 0 ? (
            products.map((product: UIProduct) => (
              <ProductCard key={product.id} {...product} />
            ))
          ) : (
            <div className="col-span-full py-32 text-center border-2 border-dashed border-border/40 rounded-3xl">
              <p className="text-[#64748b] dark:text-[#94a3b8] text-lg font-medium">
                No se encontraron productos para tu búsqueda.
              </p>
            </div>
          )}
        </div>

        <Pagination currentPage={currentPage} totalPages={totalPages} />
      </div>
    </main>
  );
}
