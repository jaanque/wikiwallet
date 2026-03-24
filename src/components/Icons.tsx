import { 
  Moon, 
  Sun, 
  Search, 
  ArrowRight, 
  Star, 
  Car, 
  Smartphone, 
  Laptop, 
  Gamepad2, 
  ChevronLeft, 
  ChevronRight,
  Wallet
} from "lucide-react";

export { 
  Moon, 
  Sun, 
  Search, 
  ArrowRight, 
  Star, 
  Car, 
  Smartphone, 
  Laptop, 
  Gamepad2, 
  ChevronLeft, 
  ChevronRight,
  Wallet 
};

export function MintifyLogo({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path d="M12 2L2 7L12 12L22 7L12 2Z" fill="currentColor" />
      <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function WikiWalletLogo({ className }: { className?: string }) {
  return (
    <div className={`flex items-center justify-center bg-primary rounded-[10px] ${className || 'w-8 h-8'}`}>
      <Wallet className="w-1/2 h-1/2 text-white" strokeWidth={3} />
    </div>
  );
}
