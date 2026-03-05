import { useState } from "react";
import { formatCurrency } from "@/lib/utils";
import { IndianRupee, Percent } from "lucide-react";

export function TipCalculator() {
  const [billAmount, setBillAmount] = useState("");
  const [tipPercentage, setTipPercentage] = useState(15);
  const [splitCount, setSplitCount] = useState(1);

  const bill = parseFloat(billAmount) || 0;
  const tip = (bill * tipPercentage) / 100;
  const total = bill + tip;
  const perPerson = total / splitCount;

  return (
    <div className="glass-panel p-6 space-y-4">
      <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
        Tip Calculator
      </h2>

      <div className="space-y-4">
        <div className="relative">
          <IndianRupee className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="number"
            step="0.01"
            placeholder="Bill Amount"
            value={billAmount}
            onChange={(e) => setBillAmount(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-background/50 border rounded-xl focus:ring-2 focus:ring-primary/20 outline-none transition-all"
          />
        </div>

        <div className="flex items-center gap-4">
          <div className="flex-1 relative">
            <Percent className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="number"
              min="0"
              max="100"
              value={tipPercentage}
              onChange={(e) => setTipPercentage(Number(e.target.value))}
              className="w-full pl-9 pr-4 py-2 bg-background/50 border rounded-xl focus:ring-2 focus:ring-primary/20 outline-none transition-all"
            />
          </div>
          <div className="flex-1 relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
              Split
            </span>
            <input
              type="number"
              min="1"
              value={splitCount}
              onChange={(e) => setSplitCount(Number(e.target.value))}
              className="w-full pl-12 pr-4 py-2 bg-background/50 border rounded-xl focus:ring-2 focus:ring-primary/20 outline-none transition-all"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mt-4 pt-4 border-t border-border/50">
          <div>
            <p className="text-sm text-muted-foreground">Tip Amount</p>
            <p className="text-lg font-semibold text-primary">
              {formatCurrency(tip)}
            </p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Total Bill</p>
            <p className="text-lg font-semibold text-foreground">
              {formatCurrency(total)}
            </p>
          </div>
          <div className="col-span-2 bg-secondary/50 p-3 rounded-xl flex justify-between items-center">
            <p className="text-sm font-medium text-foreground">Per Person</p>
            <p className="text-xl font-bold text-primary">
              {formatCurrency(perPerson)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
