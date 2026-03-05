import { ModeToggle } from "./mode-toggle";
import { Wallet } from "lucide-react";

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-background font-sans">
      <header className="glass-header px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="bg-primary/10 p-2 rounded-xl">
            <Wallet className="w-6 h-6 text-primary" />
          </div>
          <h1 className="text-xl font-bold tracking-tight bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
            Monthly Expenses
          </h1>
        </div>
        <div className="relative">
          <ModeToggle />
        </div>
      </header>

      <main className="flex-1 container max-w-md mx-auto p-4 md:p-6 space-y-6">
        {children}
      </main>

      <footer className="py-6 text-center text-sm text-muted-foreground border-t border-border/40 mt-auto">
        <p className="opacity-70">created by benubuilds</p>
      </footer>
    </div>
  );
}
