import Link from "next/link";
import { Wrench } from "lucide-react";

export function Navbar() {
  return (
    <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
      <div className="container flex h-14 items-center max-w-screen-2xl mx-auto px-4">
        <Link href="/" className="flex items-center gap-2 font-semibold hover:opacity-80 transition-opacity">
          <Wrench className="h-5 w-5" />
          <span>Coder Tools</span>
        </Link>
        <div className="flex flex-1 items-center justify-end space-x-2">
          {/* Add more links or theme toggle here if needed */}
        </div>
      </div>
    </nav>
  );
}
