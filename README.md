# Modern Finance Dashboard

A clean, modern, and responsive Finance Dashboard built with Next.js (App Router), Tailwind CSS, and `shadcn/ui`. It offers robust global state management, interactive data visualizations, and dynamic role-based access.

---

## 🎯 Core Features

### 1. Dashboard Overview
- **Summary Cards:** Quick-glance cards utilizing `shadcn/ui` displaying real-time metrics for **Total Balance**, **Total Income**, and **Total Expenses**.
- **Interactive Visualizations:**
  - **Balance Trend:** A smooth Line Chart displaying historical cumulative balance trajectory.
  - **Expense Breakdown:** A categorized Pie Chart highlighting expense distributions.
  - *Powered by `recharts`*.

### 2. Transactions Management
- **Detailed Data Table:** Displays transaction Date, Category, Type, and Amount.
- **Advanced Filtering & Search:**
  - Fast category-based text search.
  - Dropdown filtering isolating "Income" or "Expense".
  - Complex multi-sorting capabilities (Date ascending/descending, Amount high/low).

### 3. Role-Based Features
- Easily toggle between **Viewer** and **Admin** roles dynamically from the top navigation drop-down menu.
- **Admin Capabilities:** Given full access to add new transactions via an interactive modal using the `Dialog` primitive.
- **Viewer Limitations:** Locked into a read-only state.

### 4. Calculated Insights
- Extrapolates context from raw transaction data to showcase:
  - Your historically highest spending category.
  - Overall monthly expenditure alongside percentage-based comparisons to the previous month.

### 5. Seamless UI/UX
- **Intelligent State Persistency:** Zustand handles the global state tracking and relies heavily on localStorage middleware (`persist`), ensuring that changes (filtering, roles, newly added transactions) survive page reloads.
- **Dark Mode Context:** Out-of-the-box system/dark/light theme toggle support integrated with `next-themes`.
- **Framer Motion Animations:** Smooth cascading spring-entrance animations enhance the premium aesthetic upon landing.

---

## 💻 Tech Stack

- **Framework:** [Next.js](https://nextjs.org/) (React 19, App Router)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **UI Components:** [shadcn/ui](https://ui.shadcn.com/) (Cards, Dialogs, Selects, Tables)
- **State Management:** [Zustand](https://zustand-demo.pmnd.rs/) (Local Storage Persisted)
- **Data Visualization:** [Recharts](https://recharts.org/)
- **Animations:** [Framer Motion](https://www.framer.com/motion/)
- **Date Handling:** `date-fns` & standard `Intl.NumberFormat`

---

## 📁 Project Structure

```text
src/
├── app/
│   ├── dashboard/page.tsx       # Main dashboard layout composition
│   ├── layout.tsx               # Root layout including NextThemes
│   └── page.tsx                 # Base entry redirecting to /dashboard
├── components/
│   ├── dashboard/               
│   │   ├── AddTransactionDialog.tsx
│   │   ├── ChartsRegion.tsx
│   │   ├── DashboardOverview.tsx
│   │   ├── HeaderControls.tsx
│   │   ├── Insights.tsx
│   │   └── TransactionsTable.tsx
│   ├── ui/                      # Generated shadcn primitives
│   └── theme-provider.tsx       # Dark mode handler
├── hooks/
│   └── useMounted.ts            # Hydration hydration sync hook
└── store/
    └── useFinanceStore.ts       # Global persisted state architecture
```

---

## 🚀 Getting Started

First, install exactly required dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser. You will be automatically redirected to the `/dashboard` route.

### Testing Features Locally
1. Swap the application context from **Viewer** to **Admin** via the top-right profile icon.
2. Click the globally unlocked **Add Transaction** button.
3. Submit a new expense or income item and watch the state, dashboard metrics, and charts instantly update across the application!
