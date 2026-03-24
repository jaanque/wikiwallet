import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface Company {
  id: string;
  name: string;
  logo_letter?: string;
  color?: string;
}

export interface Tag {
  id: string;
  name: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  image_url: string;
  created_at: string;
  companies?: Company[];
  tags?: Tag[];
}

export async function getProducts(query = "", tag = "", page = 1, limit = 10) {
  const from = (page - 1) * limit;
  const to = from + limit - 1;

  let supabaseQuery = supabase
    .from("products")
    .select(`
      *,
      companies:product_companies(company_id, companies(*)),
      tags:product_tags(tag_id, tags(*))
    `, { count: "exact" });

  if (query) {
    supabaseQuery = supabaseQuery.ilike("name", `%${query}%`);
  }

  if (tag) {
    supabaseQuery = supabaseQuery.filter("tags.tags.name", "eq", tag);
  }

  const { data, error, count } = await supabaseQuery
    .order("created_at", { ascending: false })
    .range(from, to);

  if (error) {
    console.error("Error fetching products:", error);
    return { products: [], totalCount: 0 };
  }

  // Transform the nested structure from Supabase joins with strict typing
  const transformedProducts: Product[] = (data || []).map((p) => {
    const rawProduct = p as unknown as { 
      companies: { companies: Company }[]; 
      tags: { tags: Tag }[];
    } & Product;

    return {
      ...rawProduct,
      companies: rawProduct.companies?.map(pc => pc.companies).filter(Boolean) || [],
      tags: rawProduct.tags?.map(pt => pt.tags).filter(Boolean) || [],
    };
  });

  return { products: transformedProducts, totalCount: count || 0 };
}

export async function getTags() {
  const { data, error } = await supabase
    .from("tags")
    .select("*")
    .order("name");

  if (error) {
    console.error("Error fetching tags:", error);
    return [];
  }

  return data || [];
}
