import { Moon, Sun, Search, ArrowRight, Star, Car, Smartphone, Laptop, Gamepad2 } from "lucide-react";

export { Moon, Sun, Search, ArrowRight, Star, Car, Smartphone, Laptop, Gamepad2 };

export function getIconByName(name: string) {
  switch (name) {
    case 'Car': return Car;
    case 'Smartphone': return Smartphone;
    case 'Laptop': return Laptop;
    case 'Gamepad2': return Gamepad2;
    default: return Star;
  }
}

export function MintifyLogo({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path d="M12 2L2 7L12 12L22 7L12 2Z" fill="currentColor" />
      <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function CloudIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-10 h-10">
      <path d="M17.5 19A5.5 5.5 0 0 0 18 8a7 7 0 1 0-11.91 2.22A5 5 0 1 0 5 20h12.5" />
    </svg>
  );
}

export function ChipIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-10 h-10">
      <rect x="4" y="4" width="16" height="16" rx="2" ry="2" />
      <path d="M9 9h6v6H9z" />
      <path d="M9 1v3" />
      <path d="M15 1v3" />
      <path d="M9 20v3" />
      <path d="M15 20v3" />
      <path d="M20 9h3" />
      <path d="M20 15h3" />
      <path d="M1 9h3" />
      <path d="M1 15h3" />
    </svg>
  );
}

export function SecurityIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-10 h-10">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  );
}

export function FintechIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-10 h-10">
      <line x1="12" y1="1" x2="12" y2="23" />
      <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
    </svg>
  );
}

export function ReactIcon() {
  return (
    <svg viewBox="-10.5 -9.45 21 18.9" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-10 h-10">
      <circle cx="0" cy="0" r="2" fill="currentColor" />
      <g stroke="currentColor" strokeWidth="1" fill="none">
        <ellipse rx="10" ry="4.5" />
        <ellipse rx="10" ry="4.5" transform="rotate(60)" />
        <ellipse rx="10" ry="4.5" transform="rotate(120)" />
      </g>
    </svg>
  );
}

export function AIIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-10 h-10">
      <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm0 18a8 8 0 1 1 8-8 8 8 0 0 1-8 8z" />
      <path d="M12 6v12M6 12h12" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

export function EVIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-10 h-10">
      <path d="M18.5 4L18 5H22L21.5 4H18.5Z" />
      <path d="M7 21C7 21 7 17 12 17C17 17 17 21 17 21" />
      <path d="M12 17V13" />
      <circle cx="7" cy="21" r="2" />
      <circle cx="17" cy="21" r="2" />
      <path d="M2 13H5V7H19V13H22" />
    </svg>
  );
}

export function RepoIcon({ children, color }: { children: React.ReactNode; color: string }) {
  return (
    <div 
      className="flex items-center justify-center p-2 rounded-[12px] bg-white dark:bg-[#0a0a0a]"
      style={{ color }}
    >
      {children}
    </div>
  );
}

export function N8NIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="white" className="w-4 h-4 opacity-95">
      <circle cx="6" cy="12" r="2.5" />
      <circle cx="18" cy="7" r="2.5" />
      <circle cx="18" cy="17" r="2.5" />
      <path d="M8.5 12h7M15.5 12l2.5-5M15.5 12l2.5 5" stroke="white" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}
