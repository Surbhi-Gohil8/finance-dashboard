"use client";

import { useMemo } from "react";
import { useFinanceStore } from "@/store/useFinanceStore";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  CartesianGrid,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  Cell,
  Legend
} from "recharts";
import { format, parseISO } from "date-fns";

const PIE_COLORS = ["#ef4444", "#f97316", "#f59e0b", "#84cc16", "#0ea5e9", "#8b5cf6", "#ec4899"];

export function ChartsRegion() {
  const transactions = useFinanceStore((state) => state.transactions);

  // Prepare line chart data (Balance trend over time)
  const lineChartData = useMemo(() => {
    // Sort transactions by date ascending
    const sorted = [...transactions].sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
    );

    let cumulativeBalance = 0;
    const dataMap = new Map<string, number>();

    sorted.forEach((t) => {
      cumulativeBalance += t.type === "income" ? t.amount : -t.amount;
      // We'll map the balance to the specific date
      dataMap.set(t.date, cumulativeBalance);
    });

    const data = Array.from(dataMap.entries()).map(([date, balance]) => ({
      date: format(parseISO(date), "MMM dd, yyyy"),
      balance,
    }));

    return data;
  }, [transactions]);

  // Prepare pie chart data (Expenses by category)
  const pieChartData = useMemo(() => {
    const expenses = transactions.filter((t) => t.type === "expense");
    const categoryTotals = expenses.reduce((acc, curr) => {
      acc[curr.category] = (acc[curr.category] || 0) + curr.amount;
      return acc;
    }, {} as Record<string, number>);

    return Object.entries(categoryTotals)
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value);
  }, [transactions]);

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle className="text-base font-medium">Balance Trend</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] w-full">
            {lineChartData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={lineChartData} margin={{ top: 5, right: 10, left: 10, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} className="stroke-muted" />
                  <XAxis 
                    dataKey="date" 
                    tickLine={false}
                    axisLine={false}
                    tick={{ fontSize: 12 }}
                    className="fill-muted-foreground"
                  />
                  <YAxis 
                    tickLine={false}
                    axisLine={false}
                    tick={{ fontSize: 12 }}
                    tickFormatter={(val) => `$${val}`}
                    className="fill-muted-foreground"
                  />
                  <Tooltip 
                    contentStyle={{ borderRadius: "8px", border: "none", boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)" }}
                    formatter={(value: any) => [`$${value}`, "Balance"]}
                  />
                  <Line
                    type="monotone"
                    dataKey="balance"
                    stroke="#10b981"
                    strokeWidth={2}
                    dot={{ r: 4, strokeWidth: 2 }}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
                No data available
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base font-medium">Expenses by Category</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] w-full">
            {pieChartData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Tooltip 
                    contentStyle={{ borderRadius: "8px", border: "none", boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)" }}
                    formatter={(value: any) => [`$${value}`, "Amount"]}
                  />
                  <Legend verticalAlign="bottom" height={36} iconType="circle" />
                  <Pie
                    data={pieChartData}
                    cx="50%"
                    cy="45%"
                    innerRadius={60}
                    outerRadius={90}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {pieChartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
                No data available
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
