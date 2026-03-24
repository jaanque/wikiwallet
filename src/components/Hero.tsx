"use client";

import { useEffect, useState } from "react";
import { MintifyLogo } from "./Icons";
import gsap from "gsap";

export default function Hero() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    const raf = requestAnimationFrame(() => setIsMounted(true));
    // Balanced entrance for high-impact branding
    gsap.from(".hero-item", {
      y: 40,
      opacity: 0,
      duration: 1.4,
      stagger: 0.15,
      ease: "power4.out",
      delay: 0.1
    });
    return () => cancelAnimationFrame(raf);
  }, []);

  if (!isMounted) return <header className="h-[400px]" />;

  return (
    <header className="flex flex-col items-center justify-center text-center pt-24 pb-16 px-6 mt-12 mb-16 relative overflow-visible min-h-[45vh]">
      <div className="hero-item flex flex-wrap items-center justify-center gap-x-8 gap-y-6 md:gap-x-12">
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight flex items-center gap-6 md:gap-10 leading-[0.9]">
          WikiWallet
          <div className="flex items-center justify-center text-primary transform scale-110 md:scale-125">
            <MintifyLogo className="w-16 h-16 md:w-24 md:h-24" />
          </div>
          <span className="text-foreground">Pivot</span>
        </h1>
      </div>
      
      <p className="hero-item mt-8 md:mt-12 text-muted-foreground text-xl md:text-2xl lg:text-3xl max-w-4xl mx-auto font-medium leading-[1.6] text-balance text-center">
        El mapa definitivo para el <span className="text-foreground font-bold">mapeo industrial</span> y la <span className="text-foreground font-bold">cadena de suministro</span>. 
        Mapeamos los proveedores críticos que hacen posible la tecnología más icónica del mercado.
      </p>

      {/* Industrial focal glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-primary/5 blur-[140px] rounded-full z-[-1] pointer-events-none" />
    </header>
  );
}
