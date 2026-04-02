"use client";

import { useFinanceStore } from "@/store/useFinanceStore";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { format, parseISO } from "date-fns";
import { Search } from "lucide-react";

export function TransactionsTable() {
  const {
    transactions,
    searchQuery,
    filterType,
    sortBy,
    setSearchQuery,
    setFilterType,
    setSortBy,
  } = useFinanceStore();

  const filteredAndSortedTransactions = transactions
    .filter((t) => {
      // Filter by type
      if (filterType !== "all" && t.type !== filterType) return false;
      // Filter by search query (category)
      if (searchQuery && !t.category.toLowerCase().includes(searchQuery.toLowerCase())) return false;
      return true;
    })
    .sort((a, b) => {
      if (sortBy === "date-desc") return new Date(b.date).getTime() - new Date(a.date).getTime();
      if (sortBy === "date-asc") return new Date(a.date).getTime() - new Date(b.date).getTime();
      if (sortBy === "amount-desc") return b.amount - a.amount;
      if (sortBy === "amount-asc") return a.amount - b.amount;
      return 0;
    });

  return (
    <Card className="col-span-full">
      <CardHeader>
        <CardTitle>Recent Transactions</CardTitle>
        <CardDescription>
          You have {filteredAndSortedTransactions.length} transaction(s) matching the current filters.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-4 md:flex-row md:items-center justify-between mb-6">
          <div className="relative w-full md:max-w-sm">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search categories..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div className="flex items-center gap-2">
            <Select value={filterType} onValueChange={(v: any) => setFilterType(v)}>
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="income">Income</SelectItem>
                <SelectItem value="expense">Expense</SelectItem>
              </SelectContent>
            </Select>

            <Select value={sortBy} onValueChange={(v: any) => setSortBy(v)}>
              <SelectTrigger className="w-[160px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="date-desc">Newest First</SelectItem>
                <SelectItem value="date-asc">Oldest First</SelectItem>
                <SelectItem value="amount-desc">Amount (High to Low)</SelectItem>
                <SelectItem value="amount-asc">Amount (Low to High)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Type</TableHead>
                <TableHead className="text-right">Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredAndSortedTransactions.length > 0 ? (
                filteredAndSortedTransactions.map((t) => (
                  <TableRow key={t.id}>
                    <TableCell className="font-medium">
                      {format(parseISO(t.date), "MMM dd, yyyy")}
                    </TableCell>
                    <TableCell>{t.category}</TableCell>
                    <TableCell>
                      <Badge variant={t.type === "income" ? "default" : "destructive"} className={t.type === "income" ? "bg-emerald-500 hover:bg-emerald-600" : ""}>
                        {t.type}
                      </Badge>
                    </TableCell>
                    <TableCell className={`text-right font-medium ${t.type === "income" ? "text-emerald-500" : "text-red-500"}`}>
                      {t.type === "income" ? "+" : "-"}${t.amount.toFixed(2)}
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4} className="h-24 text-center text-muted-foreground">
                    No transactions found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
