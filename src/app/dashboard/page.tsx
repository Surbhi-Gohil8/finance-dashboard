"use client";

import { motion, Variants } from "framer-motion";
import { DashboardOverview } from "@/components/dashboard/DashboardOverview";
import { ChartsRegion } from "@/components/dashboard/ChartsRegion";
import { TransactionsTable } from "@/components/dashboard/TransactionsTable";
import { Insights } from "@/components/dashboard/Insights";
import { AddTransactionDialog } from "@/components/dashboard/AddTransactionDialog";
import { HeaderControls } from "@/components/dashboard/HeaderControls";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100,
    },
  },
};

export default function DashboardPage() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6 max-w-7xl mx-auto w-full">
      <div className="flex items-center justify-between space-y-2 mb-8">
        <h2 className="text-3xl font-bold tracking-tight">Finance Dashboard</h2>
        <div className="flex items-center space-x-2">
          <HeaderControls />
          <AddTransactionDialog />
        </div>
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-4 md:space-y-6"
      >
        <motion.div variants={itemVariants}>
          <DashboardOverview />
        </motion.div>

        <motion.div variants={itemVariants}>
          <ChartsRegion />
        </motion.div>

        <motion.div variants={itemVariants}>
          <Insights />
        </motion.div>

        <motion.div variants={itemVariants}>
          <TransactionsTable />
        </motion.div>
      </motion.div>
    </div>
  );
}
