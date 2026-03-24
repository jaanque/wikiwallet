import Link from "next/link";
import { WikiWalletLogo } from "./Icons";

export default function Footer() {
  return (
    <footer className="border-t border-border/40 py-16 bg-muted/5 mt-auto">
      <div className="max-w-[1440px] mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <WikiWalletLogo className="w-6 h-6" />
              <span className="font-bold text-xl tracking-tight">wikiwallet</span>
            </div>
            <p className="text-[#64748b] dark:text-[#9ca3af] text-sm max-w-sm leading-relaxed">
              Mapeando el ecosistema industrial global para inversores inteligentes. 
              Descubre las empresas y proveedores que hacen posible la tecnología del futuro.
            </p>
          </div>
          
          <div>
            <h4 className="font-bold text-sm uppercase tracking-wider mb-4 opacity-50">Explorar</h4>
            <ul className="space-y-3 text-sm font-medium text-[#4b5563] dark:text-[#cbd5e1]">
              <li><Link href="/" className="hover:text-primary transition-colors">Productos</Link></li>
              <li><a href="#" className="hover:text-primary transition-colors">Empresas</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Ecosistemas</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-sm uppercase tracking-wider mb-4 opacity-50">Legal</h4>
            <ul className="space-y-3 text-sm font-medium text-[#4b5563] dark:text-[#cbd5e1]">
              <li><a href="#" className="hover:text-primary transition-colors">Aviso Legal</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Privacidad</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Cookies</a></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-border/20 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-muted/60">
            © {new Date().getFullYear()} WikiWallet. Todos los derechos reservados.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-muted hover:text-primary transition-colors">Twitter</a>
            <a href="#" className="text-muted hover:text-primary transition-colors">GitHub</a>
            <a href="#" className="text-muted hover:text-primary transition-colors">LinkedIn</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
