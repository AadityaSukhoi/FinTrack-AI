import { useState } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AddTransactionDialog from "@/components/dashboard/AddTransactionDialog";
import BudgetManager from "@/components/dashboard/BudgetManager";
import GoalsManager from "@/components/dashboard/GoalsManager";
import ForecastView from "@/components/dashboard/ForecastView";
import ReportsView from "@/components/dashboard/ReportsView";
import OverviewTab from "@/components/dashboard/OverviewTab";
import {
  LayoutDashboard,
  Wallet,
  Target,
  TrendingUp,
  FileText,
} from "lucide-react";

interface Transaction {
  id: string;
  name: string;
  category: string;
  amount: number;
  date: string;
  type: "income" | "expense";
}

const Dashboard = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([
    {
      id: "1",
      name: "Grocery Store",
      category: "Food",
      amount: -2450,
      date: new Date().toISOString(),
      type: "expense",
    },
    {
      id: "2",
      name: "Salary Deposit",
      category: "Income",
      amount: 85000,
      date: new Date(Date.now() - 86400000).toISOString(),
      type: "income",
    },
  ]);

  const handleAddTransaction = (transaction: Transaction) => {
    setTransactions([transaction, ...transactions]);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="pt-24 pb-20">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4 animate-slide-up">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-2">
                Welcome back, User! 👋
              </h1>
              <p className="text-muted-foreground">
                Here's your financial overview for June 2024
              </p>
            </div>
            <AddTransactionDialog onAdd={handleAddTransaction} />
          </div>

          {/* Dashboard Tabs */}
          <Tabs defaultValue="overview" className="space-y-6">
            <TabsList className="grid w-full grid-cols-5 lg:w-auto lg:inline-grid">
              <TabsTrigger value="overview" className="gap-2">
                <LayoutDashboard className="w-4 h-4" />
                <span className="hidden sm:inline">Overview</span>
              </TabsTrigger>
              <TabsTrigger value="budget" className="gap-2">
                <Wallet className="w-4 h-4" />
                <span className="hidden sm:inline">Budget</span>
              </TabsTrigger>
              <TabsTrigger value="goals" className="gap-2">
                <Target className="w-4 h-4" />
                <span className="hidden sm:inline">Goals</span>
              </TabsTrigger>
              <TabsTrigger value="forecast" className="gap-2">
                <TrendingUp className="w-4 h-4" />
                <span className="hidden sm:inline">Forecast</span>
              </TabsTrigger>
              <TabsTrigger value="reports" className="gap-2">
                <FileText className="w-4 h-4" />
                <span className="hidden sm:inline">Reports</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="animate-fade-in">
              <OverviewTab />
            </TabsContent>

            <TabsContent value="budget" className="animate-fade-in">
              <BudgetManager />
            </TabsContent>

            <TabsContent value="goals" className="animate-fade-in">
              <GoalsManager />
            </TabsContent>

            <TabsContent value="forecast" className="animate-fade-in">
              <ForecastView />
            </TabsContent>

            <TabsContent value="reports" className="animate-fade-in">
              <ReportsView />
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Dashboard;
