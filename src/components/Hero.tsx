import { MintifyLogo } from "./Icons";

export default function Hero() {
  return (
    <header className="flex flex-col items-center text-center mt-20 px-6">
      <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight flex items-center justify-center gap-3">
        Turn your repo into <MintifyLogo className="w-10 h-10 text-primary" /> <span className="underline decoration-primary/40 underline-offset-8">docs</span>
      </h1>
      <p className="mt-6 text-muted text-lg max-w-xl">
        We&apos;ll generate guides, references, and API docs from your codebase.
      </p>
    </header>
  );
}
