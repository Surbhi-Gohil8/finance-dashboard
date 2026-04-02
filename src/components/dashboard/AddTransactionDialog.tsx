"use client";

import { useState } from "react";
import { useFinanceStore, TransactionType } from "@/store/useFinanceStore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PlusCircle } from "lucide-react";

export function AddTransactionDialog() {
  const { role, addTransaction } = useFinanceStore();
  const [open, setOpen] = useState(false);

  // Form State
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [type, setType] = useState<TransactionType>("expense");

  if (role === "viewer") {
    // Return button that does nothing but show tooltip, or just hide. Spec says role switch shows read-only
    return (
      <Button disabled variant="outline" className="gap-2 opacity-50 cursor-not-allowed">
        <PlusCircle className="w-4 h-4" />
        Add Transaction (Admin Only)
      </Button>
    );
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!date || !amount || !category) return;

    addTransaction({
      date,
      amount: parseFloat(amount),
      category,
      type,
    });
    setOpen(false);
    
    // Reset form
    setAmount("");
    setCategory("");
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="gap-2 shadow-sm">
          <PlusCircle className="w-4 h-4" />
          Add Transaction
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Add New Transaction</DialogTitle>
            <DialogDescription>
              Fill out the details of your transaction here. Click save when you're done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="date" className="text-right">
                Date
              </Label>
              <Input
                id="date"
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="col-span-3"
                required
              />
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="type" className="text-right">
                Type
              </Label>
              <div className="col-span-3">
                <Select value={type} onValueChange={(v: TransactionType) => setType(v)} required>
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="income">Income</SelectItem>
                    <SelectItem value="expense">Expense</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="category" className="text-right">
                Category
              </Label>
              <Input
                id="category"
                placeholder="e.g., Groceries"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="col-span-3"
                required
              />
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="amount" className="text-right">
                Amount
              </Label>
              <Input
                id="amount"
                type="number"
                step="0.01"
                min="0"
                placeholder="0.00"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="col-span-3"
                required
              />
            </div>

          </div>
          <DialogFooter>
            <Button type="submit">Save Transaction</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
