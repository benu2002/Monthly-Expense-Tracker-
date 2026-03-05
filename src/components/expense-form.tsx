import { useState } from "react";
import { Plus, Calendar, Tag, FileText, IndianRupee } from "lucide-react";
import { cn } from "@/lib/utils";

type ExpenseFormProps = {
  categories: string[];
  onAdd: (expense: {
    amount: number;
    category: string;
    description: string;
    date: string;
  }) => void;
};

export function ExpenseForm({ categories, onAdd }: ExpenseFormProps) {
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);

  // Set default category when categories change or on mount
  if (!category && categories.length > 0) {
    setCategory(categories[0]);
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount) return;

    onAdd({
      amount: parseFloat(amount),
      category: category || categories[0],
      description,
      date,
    });

    setAmount("");
    setDescription("");
    setCategory(categories[0]);
    setDate(new Date().toISOString().split("T")[0]);
  };

  return (
    <form onSubmit={handleSubmit} className="glass-panel p-6 space-y-4">
      <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
        <Plus className="w-5 h-5 text-primary" />
        Add New Expense
      </h2>

      <div className="space-y-4">
        <div className="relative">
          <IndianRupee className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="number"
            step="0.01"
            placeholder="0.00"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-background/50 border rounded-xl focus:ring-2 focus:ring-primary/20 outline-none transition-all"
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="relative">
            <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-background/50 border rounded-xl focus:ring-2 focus:ring-primary/20 outline-none appearance-none transition-all"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-background/50 border rounded-xl focus:ring-2 focus:ring-primary/20 outline-none transition-all"
              required
            />
          </div>
        </div>

        <div className="relative">
          <FileText className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Description (optional)"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-background/50 border rounded-xl focus:ring-2 focus:ring-primary/20 outline-none transition-all"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-primary text-primary-foreground py-2.5 rounded-xl font-medium hover:opacity-90 transition-opacity shadow-lg shadow-primary/20 active:scale-[0.98]"
        >
          Add Expense
        </button>
      </div>
    </form>
  );
}
