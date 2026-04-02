"use client";

import { useFinanceStore } from "@/store/useFinanceStore";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useMemo } from "react";
import { TrendingDown, TrendingUp, AlertCircle } from "lucide-react";

export function Insights() {
  const transactions = useFinanceStore((state) => state.transactions);

  const insights = useMemo(() => {
    const currentMonth = new Date().toISOString().slice(0, 7);
    const prevMonth = new Date(new Date().setMonth(new Date().getMonth() - 1)).toISOString().slice(0, 7);

    const expenses = transactions.filter((t) => t.type === "expense");
    
    // Highest spending category
    const categoryTotals = expenses.reduce((acc, curr) => {
      acc[curr.category] = (acc[curr.category] || 0) + curr.amount;
      return acc;
    }, {} as Record<string, number>);

    let highestCategory = "N/A";
    let highestAmount = 0;
    
    for (const [cat, amt] of Object.entries(categoryTotals)) {
      if (amt > highestAmount) {
        highestAmount = amt;
        highestCategory = cat;
      }
    }

    // Monthly expenses
    const currMonthExpense = expenses
      .filter((t) => t.date.startsWith(currentMonth))
      .reduce((acc, curr) => acc + curr.amount, 0);

    const prevMonthExpense = expenses
      .filter((t) => t.date.startsWith(prevMonth))
      .reduce((acc, curr) => acc + curr.amount, 0);

    const expenseDiff = currMonthExpense - prevMonthExpense;
    const diffPercentage = prevMonthExpense === 0 
      ? 100 
      : (expenseDiff / prevMonthExpense) * 100;

    return {
      highestCategory,
      highestAmount,
      currMonthExpense,
      prevMonthExpense,
      diffPercentage,
      expenseDiff
    };
  }, [transactions]);

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Card className="bg-muted/50">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-orange-500" />
            Top Spending Area
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{insights.highestCategory}</div>
          <p className="text-sm text-muted-foreground pt-1">
            <span className="font-medium text-foreground">${insights.highestAmount.toFixed(2)}</span> total spent overall
          </p>
        </CardContent>
      </Card>
      
      <Card className="bg-muted/50">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium flex items-center gap-2">
            {insights.expenseDiff > 0 ? (
              <TrendingUp className="w-4 h-4 text-red-500" />
            ) : (
              <TrendingDown className="w-4 h-4 text-emerald-500" />
            )}
            Monthly Comparison
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">${insights.currMonthExpense.toFixed(2)}</div>
          <p className="text-sm text-muted-foreground pt-1">
            {insights.expenseDiff > 0 ? "+" : ""}
            {insights.diffPercentage.toFixed(1)}% compared to last month
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
