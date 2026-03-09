import { Disc3 } from "lucide-react";

export default function BeybladeSpinner() {
  return (
    <div className="flex flex-col items-center justify-center space-y-4">
      <div className="relative">
        <div className="absolute inset-0 rounded-full border-t-4 border-neon-blue animate-spin-fast h-16 w-16 opacity-75 blur-sm" />
        <Disc3 className="h-16 w-16 text-neon-blue animate-spin-fast" />
      </div>
      <p className="text-neon-blue animate-pulse uppercase tracking-widest text-sm font-bold">
        Letting it rip...
      </p>
    </div>
  );
}
