import { Home, PlusCircle, Calculator } from "lucide-react";

type BottomNavProps = {
  activeTab: string;
  setActiveTab: (tab: string) => void;
};

export function BottomNav({ activeTab, setActiveTab }: BottomNavProps) {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-background/80 backdrop-blur-lg border-t border-border/40 pb-[env(safe-area-inset-bottom)] pt-2 px-6 z-50">
      <div className="flex justify-around items-center max-w-md mx-auto h-16">
        <button
          onClick={() => setActiveTab("dashboard")}
          className={`flex flex-col items-center gap-1 transition-colors ${
            activeTab === "dashboard" ? "text-primary" : "text-muted-foreground hover:text-foreground"
          }`}
        >
          <Home className="w-6 h-6" />
          <span className="text-[10px] font-medium">Home</span>
        </button>
        
        <button
          onClick={() => setActiveTab("expenses")}
          className={`flex flex-col items-center gap-1 transition-colors ${
            activeTab === "expenses" ? "text-primary" : "text-muted-foreground hover:text-foreground"
          }`}
        >
          <PlusCircle className="w-6 h-6" />
          <span className="text-[10px] font-medium">Expenses</span>
        </button>

        <button
          onClick={() => setActiveTab("tools")}
          className={`flex flex-col items-center gap-1 transition-colors ${
            activeTab === "tools" ? "text-primary" : "text-muted-foreground hover:text-foreground"
          }`}
        >
          <Calculator className="w-6 h-6" />
          <span className="text-[10px] font-medium">Tools</span>
        </button>
      </div>
    </div>
  );
}
