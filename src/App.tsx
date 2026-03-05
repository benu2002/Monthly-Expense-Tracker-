import { useState } from "react";
import { ThemeProvider } from "@/components/theme-provider";
import { Layout } from "@/components/layout";
import { Dashboard } from "@/components/dashboard";
import { ExpenseForm } from "@/components/expense-form";
import { ExpenseList } from "@/components/expense-list";
import { TipCalculator } from "@/components/tip-calculator";
import { BudgetPlanner } from "@/components/budget-planner";
import { BottomNav } from "@/components/bottom-nav";
import { CategoryManager } from "@/components/category-manager";
import { useExpenses } from "@/hooks/use-expenses";
import { useCategories } from "@/hooks/use-categories";
import { Toaster, toast } from "sonner";

export default function App() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const { expenses, addExpense, editExpense, deleteExpense, clearExpenses } = useExpenses();
  const { categories, addCategory, editCategory, deleteCategory, resetCategories } = useCategories();

  const totalExpenses = expenses.reduce((acc, curr) => acc + curr.amount, 0);

  return (
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      <Layout>
        {activeTab === "dashboard" && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <Dashboard expenses={expenses} />
            <BudgetPlanner totalExpenses={totalExpenses} />
            <ExpenseList 
              expenses={expenses.slice(0, 5)} 
              categories={categories}
              onDelete={deleteExpense} 
              onEdit={editExpense}
            />
          </div>
        )}

        {activeTab === "expenses" && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <ExpenseForm categories={categories} onAdd={addExpense} />
            <ExpenseList 
              expenses={expenses} 
              categories={categories}
              onDelete={deleteExpense} 
              onEdit={editExpense}
            />
          </div>
        )}

        {activeTab === "tools" && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <TipCalculator />
            
            <CategoryManager 
              categories={categories}
              onAdd={addCategory}
              onEdit={editCategory}
              onDelete={deleteCategory}
              onReset={resetCategories}
            />

            <div className="glass-panel p-6 space-y-4">
              <h2 className="text-lg font-semibold text-destructive flex items-center gap-2">
                Danger Zone
              </h2>
              <p className="text-sm text-muted-foreground">
                Clear all your expense data. This action cannot be undone.
              </p>
              <button
                onClick={() => {
                  if (confirm("Are you sure you want to delete all data?")) {
                    clearExpenses();
                    toast.success("All data cleared");
                  }
                }}
                className="w-full bg-destructive/10 text-destructive hover:bg-destructive hover:text-destructive-foreground py-2.5 rounded-xl font-medium transition-colors cursor-pointer"
              >
                Reset All Data
              </button>
            </div>
          </div>
        )}
        
        <div className="h-20" /> {/* Spacer for bottom nav */}
      </Layout>
      <BottomNav activeTab={activeTab} setActiveTab={setActiveTab} />
      <Toaster />
    </ThemeProvider>
  );
}
