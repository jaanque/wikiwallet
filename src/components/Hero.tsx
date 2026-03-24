import { MintifyLogo } from "./Icons";

export default function Hero() {
  return (
    <header className="flex flex-col items-center text-center mt-20 px-6">
      <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight flex items-center justify-center gap-4">
        WikiWallet <MintifyLogo className="w-12 h-12 text-primary" /> <span className="underline decoration-primary/40 underline-offset-8">Pivot</span>
      </h1>
      <p className="mt-6 text-[#64748b] dark:text-[#9ca3af] text-lg max-w-2xl font-medium leading-relaxed">
        El mapa definitivo para el <strong>mapeo industrial</strong> y la <strong>cadena de suministro</strong>. 
        Descubre las empresas y proveedores clave que hacen posible los productos tecnológicos más icónicos del mercado.
      </p>
    </header>
  );
}
