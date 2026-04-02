import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type TransactionType = 'income' | 'expense';

export interface Transaction {
  id: string;
  date: string;
  amount: number;
  category: string;
  type: TransactionType;
}

export type Role = 'viewer' | 'admin';
export type FilterType = 'all' | 'income' | 'expense';
export type SortType = 'date-desc' | 'date-asc' | 'amount-desc' | 'amount-asc';

interface FinanceState {
  transactions: Transaction[];
  searchQuery: string;
  filterType: FilterType;
  sortBy: SortType;
  role: Role;
  
  // Actions
  addTransaction: (transaction: Omit<Transaction, 'id'>) => void;
  setSearchQuery: (query: string) => void;
  setFilterType: (filter: FilterType) => void;
  setSortBy: (sort: SortType) => void;
  setRole: (role: Role) => void;
}

const generateMockData = (): Transaction[] => {
  const currentMonth = new Date().toISOString().slice(0, 7); // YYYY-MM
  const prevMonth = new Date(new Date().setMonth(new Date().getMonth() - 1)).toISOString().slice(0, 7);
  
  return [
    { id: '1', date: `${currentMonth}-01`, amount: 5000, category: 'Salary', type: 'income' },
    { id: '2', date: `${currentMonth}-05`, amount: 1500, category: 'Bonus', type: 'income' },
    { id: '3', date: `${currentMonth}-10`, amount: 450, category: 'Food', type: 'expense' },
    { id: '4', date: `${currentMonth}-12`, amount: 120, category: 'Travel', type: 'expense' },
    { id: '5', date: `${currentMonth}-15`, amount: 800, category: 'Shopping', type: 'expense' },
    { id: '6', date: `${currentMonth}-18`, amount: 200, category: 'Food', type: 'expense' },
    
    // Mock data for previous month to show comparisons
    { id: '7', date: `${prevMonth}-01`, amount: 5000, category: 'Salary', type: 'income' },
    { id: '8', date: `${prevMonth}-08`, amount: 500, category: 'Food', type: 'expense' },
    { id: '9', date: `${prevMonth}-20`, amount: 950, category: 'Shopping', type: 'expense' },
  ];
};

export const useFinanceStore = create<FinanceState>()(
  persist(
    (set) => ({
      transactions: generateMockData(),
      searchQuery: '',
      filterType: 'all',
      sortBy: 'date-desc',
      role: 'viewer', // default role
      
      addTransaction: (transaction) => set((state) => ({
        transactions: [
          ...state.transactions,
          { ...transaction, id: Math.random().toString(36).substr(2, 9) }
        ],
      })),
      
      setSearchQuery: (searchQuery) => set({ searchQuery }),
      setFilterType: (filterType) => set({ filterType }),
      setSortBy: (sortBy) => set({ sortBy }),
      setRole: (role) => set({ role }),
    }),
    {
      name: 'finance-storage', 
    }
  )
);
