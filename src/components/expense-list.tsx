import { useState } from "react";
import { Trash2, Calendar, Tag, Pencil, Check, X, Filter, ShoppingBag, Coffee, Home, Car, Zap, Utensils, HeartPulse, Music, Briefcase } from "lucide-react";
import { formatCurrency, formatDate } from "@/lib/utils";
import { Expense } from "@/hooks/use-expenses";

type ExpenseListProps = {
  expenses: Expense[];
  categories?: string[];
  onDelete: (id: string) => void;
  onEdit?: (expense: Expense) => void;
};

const getCategoryIcon = (category: string) => {
  const normalized = category.toLowerCase();
  if (normalized.includes("food") || normalized.includes("eat") || normalized.includes("restaurant")) return <Utensils className="w-5 h-5" />;
  if (normalized.includes("transport") || normalized.includes("car") || normalized.includes("bus")) return <Car className="w-5 h-5" />;
  if (normalized.includes("shopping") || normalized.includes("cloth")) return <ShoppingBag className="w-5 h-5" />;
  if (normalized.includes("home") || normalized.includes("house") || normalized.includes("rent")) return <Home className="w-5 h-5" />;
  if (normalized.includes("utility") || normalized.includes("bill") || normalized.includes("electric")) return <Zap className="w-5 h-5" />;
  if (normalized.includes("health") || normalized.includes("medical")) return <HeartPulse className="w-5 h-5" />;
  if (normalized.includes("entertainment") || normalized.includes("movie") || normalized.includes("fun")) return <Music className="w-5 h-5" />;
  if (normalized.includes("work") || normalized.includes("office")) return <Briefcase className="w-5 h-5" />;
  if (normalized.includes("coffee")) return <Coffee className="w-5 h-5" />;
  return <Tag className="w-5 h-5" />;
};

export function ExpenseList({ expenses, categories = [], onDelete, onEdit }: ExpenseListProps) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Expense | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const startEditing = (expense: Expense) => {
    setEditingId(expense.id);
    setEditForm(expense);
  };

  const cancelEditing = () => {
    setEditingId(null);
    setEditForm(null);
  };

  const saveEdit = () => {
    if (editForm && onEdit) {
      onEdit(editForm);
      setEditingId(null);
      setEditForm(null);
    }
  };

  const filteredExpenses = selectedCategory === "All" 
    ? expenses 
    : expenses.filter(e => e.category === selectedCategory);

  return (
    <div className="glass-panel p-6 space-y-6 relative overflow-hidden">
      {/* Watermark */}
      <div className="absolute top-2 right-4 text-[10px] text-muted-foreground/30 font-mono pointer-events-none select-none">
        created by benubuilds
      </div>

      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold flex items-center gap-2">
          Recent Activity
        </h2>
        
        {/* Category Filter */}
        <div className="relative">
          <div className="absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none">
            <Filter className="w-3.5 h-3.5" />
          </div>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="pl-8 pr-8 py-1.5 bg-secondary/50 border border-border/50 rounded-lg text-xs font-medium appearance-none cursor-pointer hover:bg-secondary transition-colors outline-none focus:ring-2 focus:ring-primary/20"
          >
            <option value="All">All Categories</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>
      </div>

      {filteredExpenses.length === 0 ? (
        <div className="text-center py-8 text-muted-foreground">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-secondary/50 mb-3">
            <Tag className="w-6 h-6 opacity-50" />
          </div>
          <p>No expenses found.</p>
          {selectedCategory !== "All" && (
            <p className="text-xs mt-1">Try selecting a different category.</p>
          )}
        </div>
      ) : (
        <div className="space-y-3">
          {filteredExpenses.map((expense) => (
            <div
              key={expense.id}
              className="group relative bg-card/50 hover:bg-card border border-border/40 rounded-2xl p-4 transition-all duration-300 hover:shadow-md hover:border-primary/10"
            >
              {editingId === expense.id && editForm ? (
                <div className="space-y-3 w-full animate-in fade-in zoom-in-95 duration-200">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={editForm.description}
                      onChange={(e) =>
                        setEditForm({ ...editForm, description: e.target.value })
                      }
                      placeholder="Description"
                      className="flex-1 px-3 py-2 bg-background border rounded-xl text-sm outline-none focus:ring-2 focus:ring-primary/20"
                      autoFocus
                    />
                    <input
                      type="number"
                      value={editForm.amount}
                      onChange={(e) =>
                        setEditForm({
                          ...editForm,
                          amount: parseFloat(e.target.value) || 0,
                        })
                      }
                      placeholder="Amount"
                      className="w-24 px-3 py-2 bg-background border rounded-xl text-sm outline-none focus:ring-2 focus:ring-primary/20"
                    />
                  </div>
                  <div className="flex gap-2">
                    <select
                      value={editForm.category}
                      onChange={(e) =>
                        setEditForm({ ...editForm, category: e.target.value })
                      }
                      className="flex-1 px-3 py-2 bg-background border rounded-xl text-sm outline-none focus:ring-2 focus:ring-primary/20"
                    >
                      {categories.map((cat) => (
                        <option key={cat} value={cat}>
                          {cat}
                        </option>
                      ))}
                    </select>
                    <input
                      type="date"
                      value={editForm.date}
                      onChange={(e) =>
                        setEditForm({ ...editForm, date: e.target.value })
                      }
                      className="w-36 px-3 py-2 bg-background border rounded-xl text-sm outline-none focus:ring-2 focus:ring-primary/20"
                    />
                  </div>
                  <div className="flex justify-end gap-2 pt-1">
                    <button
                      onClick={saveEdit}
                      className="flex items-center gap-1.5 px-4 py-2 bg-primary text-primary-foreground rounded-xl text-xs font-medium hover:opacity-90 transition-opacity"
                    >
                      <Check className="w-3.5 h-3.5" /> Save Changes
                    </button>
                    <button
                      onClick={cancelEditing}
                      className="flex items-center gap-1.5 px-4 py-2 bg-secondary text-secondary-foreground rounded-xl text-xs font-medium hover:opacity-90 transition-opacity"
                    >
                      <X className="w-3.5 h-3.5" /> Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-between gap-4">
                  {/* Left: Icon & Info */}
                  <div className="flex items-center gap-4 flex-1 min-w-0">
                    <div className={`
                      flex items-center justify-center w-12 h-12 rounded-2xl 
                      bg-primary/10 text-primary
                      group-hover:scale-110 transition-transform duration-300
                    `}>
                      {getCategoryIcon(expense.category)}
                    </div>
                    
                    <div className="flex flex-col min-w-0">
                      <span className="font-semibold text-foreground truncate text-sm">
                        {expense.description || expense.category}
                      </span>
                      <span className="text-xs text-muted-foreground mt-0.5">
                        {expense.category}
                      </span>
                    </div>
                  </div>

                  {/* Right: Amount & Actions */}
                  <div className="flex flex-col items-end gap-1">
                    <span className="font-bold text-foreground text-sm">
                      {formatCurrency(expense.amount)}
                    </span>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] text-muted-foreground flex items-center gap-1">
                        {formatDate(expense.date)}
                      </span>
                      
                      {/* Actions (Visible on hover) */}
                      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity absolute right-4 top-1/2 -translate-y-1/2 bg-card pl-2 shadow-[-10px_0_10px_-5px_rgba(0,0,0,0.1)] dark:shadow-[-10px_0_10px_-5px_rgba(0,0,0,0.5)]">
                        {onEdit && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              startEditing(expense);
                            }}
                            className="p-1.5 text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-lg transition-colors"
                            title="Edit"
                          >
                            <Pencil className="w-3.5 h-3.5" />
                          </button>
                        )}
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onDelete(expense.id);
                          }}
                          className="p-1.5 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-lg transition-colors"
                          title="Delete"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
