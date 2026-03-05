import { useState, useEffect } from "react";
import { formatCurrency } from "@/lib/utils";
import { IndianRupee, PieChart } from "lucide-react";

type BudgetPlannerProps = {
  totalExpenses: number;
};

export function BudgetPlanner({ totalExpenses }: BudgetPlannerProps) {
  const [budget, setBudget] = useState<number>(() => {
    const saved = localStorage.getItem("monthly-budget");
    return saved ? parseFloat(saved) : 0;
  });

  useEffect(() => {
    localStorage.setItem("monthly-budget", budget.toString());
  }, [budget]);

  const remaining = budget - totalExpenses;
  const progress = budget > 0 ? (totalExpenses / budget) * 100 : 0;
  const isOverBudget = remaining < 0;

  return (
    <div className="glass-panel p-6 space-y-4">
      <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
        Monthly Budget
      </h2>

      <div className="space-y-4">
        <div className="relative">
          <IndianRupee className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="number"
            step="0.01"
            placeholder="Set Monthly Budget"
            value={budget || ""}
            onChange={(e) => setBudget(parseFloat(e.target.value) || 0)}
            className="w-full pl-9 pr-4 py-2 bg-background/50 border rounded-xl focus:ring-2 focus:ring-primary/20 outline-none transition-all"
          />
        </div>

        {budget > 0 && (
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Progress</span>
              <span className={isOverBudget ? "text-destructive font-medium" : "text-primary font-medium"}>
                {progress.toFixed(1)}%
              </span>
            </div>
            <div className="h-2 bg-secondary rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-500 ${
                  isOverBudget ? "bg-destructive" : "bg-primary"
                }`}
                style={{ width: `${Math.min(progress, 100)}%` }}
              />
            </div>
            <div className="flex justify-between text-sm mt-2">
              <span className="text-muted-foreground">Remaining</span>
              <span className={`font-semibold ${isOverBudget ? "text-destructive" : "text-green-600"}`}>
                {formatCurrency(remaining)}
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
