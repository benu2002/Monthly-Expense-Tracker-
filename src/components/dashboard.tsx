import { useMemo } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";
import { formatCurrency } from "@/lib/utils";
import { Expense } from "@/hooks/use-expenses";
import { Copy, Check } from "lucide-react";
import { toast } from "sonner";
import { useState } from "react";

type DashboardProps = {
  expenses: Expense[];
};

const COLORS = [
  "#0088FE",
  "#00C49F",
  "#FFBB28",
  "#FF8042",
  "#8884d8",
  "#82ca9d",
  "#ffc658",
  "#8dd1e1",
];

export function Dashboard({ expenses }: DashboardProps) {
  const [copied, setCopied] = useState(false);

  const totalExpenses = useMemo(() => {
    return expenses.reduce((acc, curr) => acc + curr.amount, 0);
  }, [expenses]);

  const categoryData = useMemo(() => {
    const data = expenses.reduce((acc, curr) => {
      const existing = acc.find((item) => item.name === curr.category);
      if (existing) {
        existing.value += curr.amount;
      } else {
        acc.push({ name: curr.category, value: curr.amount });
      }
      return acc;
    }, [] as { name: string; value: number }[]);

    return data.sort((a, b) => b.value - a.value);
  }, [expenses]);

  const handleCopySummary = () => {
    const summary = `Monthly Expenses Summary:\nTotal Spent: ${formatCurrency(totalExpenses)}\nItems: ${expenses.length}\n\nBreakdown:\n${categoryData.map(c => `- ${c.name}: ${formatCurrency(c.value)}`).join('\n')}`;
    
    navigator.clipboard.writeText(summary);
    setCopied(true);
    toast.success("Summary copied to clipboard");
    setTimeout(() => setCopied(false), 2000);
  };

  if (expenses.length === 0) {
    return null;
  }

  return (
    <div className="glass-panel p-6 space-y-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Summary</h2>
        <button
          onClick={handleCopySummary}
          className="p-2 hover:bg-secondary rounded-full transition-colors text-muted-foreground hover:text-foreground"
          title="Copy Summary"
        >
          {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
        </button>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-primary/10 p-4 rounded-xl border border-primary/20">
          <p className="text-sm text-muted-foreground mb-1">Total Spent</p>
          <p className="text-2xl font-bold text-primary">
            {formatCurrency(totalExpenses)}
          </p>
        </div>
        <div className="bg-secondary p-4 rounded-xl border border-border">
          <p className="text-sm text-muted-foreground mb-1">Items</p>
          <p className="text-2xl font-bold text-foreground">
            {expenses.length}
          </p>
        </div>
      </div>

      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={categoryData}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              paddingAngle={5}
              dataKey="value"
            >
              {categoryData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip
              formatter={(value: number) => formatCurrency(value)}
              contentStyle={{
                backgroundColor: "rgba(255, 255, 255, 0.8)",
                borderRadius: "8px",
                border: "none",
                boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
              }}
            />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
