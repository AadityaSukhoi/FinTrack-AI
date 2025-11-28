import { useState, useEffect } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import AddTransactionDialog from "@/components/dashboard/AddTransactionDialog";
import ProfileSetupDialog from "@/components/dashboard/ProfileSetupDialog";
import BudgetManager from "@/components/dashboard/BudgetManager";
import GoalsManager from "@/components/dashboard/GoalsManager";
import ForecastView from "@/components/dashboard/ForecastView";
import ReportsView from "@/components/dashboard/ReportsView";
import OverviewTab from "@/components/dashboard/OverviewTab";
import TransactionsPage from "@/components/dashboard/TransactionsPage";

import {
  LayoutDashboard,
  Wallet,
  Target,
  TrendingUp,
  FileText,
} from "lucide-react";
import {
  getDashboardSummary,
  getAIInsights,
  getProfile,
} from "@/services/api";
import { useToast } from "@/hooks/use-toast";
import axios from "axios";

interface User {
  id: string;
  username: string;
  email: string;
}

interface DashboardData {
  stats: {
    total_balance: number;
    total_income: number;
    total_expenses: number;
    budget_left: number;
    income_change_percent: number;
    expense_change_percent: number;
    budget_usage_percent: number;
  };
  category_breakdown: Array<{
    category: string;
    amount: number;
    percentage: number;
    color: string;
  }>;
  monthly_trend: Array<{
    month: string;
    income: number;
    expenses: number;
  }>;
  recent_transactions: Array<any>;
}

interface AIInsight {
  title: string;
  description: string;
  type: "High" | "Medium" | "Positive" | "Info";
  icon: string;
}

const Dashboard = () => {
  const [user, setUser] = useState<User | null>(null);
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  const [aiInsights, setAiInsights] = useState<AIInsight[]>([]);
  const [isLoadingUser, setIsLoadingUser] = useState(true);
  const [isLoadingDashboard, setIsLoadingDashboard] = useState(true);
  const [showProfileSetup, setShowProfileSetup] = useState(false);
  const [needsProfile, setNeedsProfile] = useState(false);
  const { toast } = useToast();

  // ✅ Check if user has profile
  const checkProfile = async () => {
    try {
      await getProfile();
      setNeedsProfile(false);
      return true;
    } catch (error: any) {
      if (error.response?.status === 404) {
        setNeedsProfile(true);
        setShowProfileSetup(true);
        return false;
      }
      throw error;
    }
  };

  // Fetch current user
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("access_token");
        
        if (!token) {
          window.location.href = "/auth";
          return;
        }

        const response = await axios.get("http://127.0.0.1:8000/auth/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setUser(response.data);
      } catch (error: any) {
        console.error("Failed to fetch user:", error);
        
        if (error.response?.status === 401) {
          localStorage.removeItem("access_token");
          window.location.href = "/auth";
        } else {
          toast({
            title: "Error",
            description: "Failed to load user information",
            variant: "destructive",
          });
        }
      } finally {
        setIsLoadingUser(false);
      }
    };

    fetchUser();
  }, [toast]);

  // ✅ Load dashboard ONLY if profile exists
  const fetchDashboard = async () => {
    setIsLoadingDashboard(true);
    try {
      const response = await getDashboardSummary();
      setDashboardData(response.data);

      try {
        const insightsResponse = await getAIInsights();
        setAiInsights(insightsResponse.data.insights || []);
      } catch (error) {
        console.error("Failed to fetch AI insights:", error);
      }
    } catch (error: any) {
      console.error("Failed to fetch dashboard:", error);

      toast({
        title: "Error",
        description: "Failed to load dashboard data",
        variant: "destructive",
      });
    } finally {
      setIsLoadingDashboard(false);
    }
  };

  useEffect(() => {
    const load = async () => {
      if (!user) return;

      const hasProfile = await checkProfile();
      if (hasProfile) {
        fetchDashboard();
      }
    };

    load();
  }, [user]);

  const handleProfileSetupSuccess = () => {
    setShowProfileSetup(false);
    setNeedsProfile(false);
    fetchDashboard();
  };

  const handleTransactionAdded = () => {
    fetchDashboard();
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <ProfileSetupDialog
        open={showProfileSetup}
        onSuccess={handleProfileSetupSuccess}
      />

      <main className="pt-24 pb-20">
        <div className="container mx-auto px-4">
          <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-2">
                {isLoadingUser ? "Loading..." : `Welcome back, ${user?.username || "User"}! 👋`}
              </h1>
              <p className="text-muted-foreground">
                Here's your financial overview for{" "}
                {new Date().toLocaleDateString("en-US", {
                  month: "long",
                  year: "numeric",
                })}
              </p>
            </div>
            {!needsProfile && <AddTransactionDialog onAdd={handleTransactionAdded} />}
          </div>

          {needsProfile ? (
            <Card className="p-12 text-center">
              <div className="max-w-md mx-auto space-y-4">
                <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                  <Wallet className="w-10 h-10 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Set Up Your Profile</h2>
                <p className="text-muted-foreground">
                  Please complete your profile setup to start tracking your finances and get AI-powered insights.
                </p>
                <button
                  onClick={() => setShowProfileSetup(true)}
                  className="mt-4 px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90"
                >
                  Complete Setup
                </button>
              </div>
            </Card>
          ) : (
            <>
              <Tabs defaultValue="overview" className="space-y-6">
                <TabsList className="grid w-full grid-cols-6 lg:w-auto lg:inline-grid">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="transactions">Transactions</TabsTrigger>
                  <TabsTrigger value="budget">Budget</TabsTrigger>
                  <TabsTrigger value="goals">Goals</TabsTrigger>
                  <TabsTrigger value="forecast">Forecast</TabsTrigger>
                  <TabsTrigger value="reports">Reports</TabsTrigger>
                </TabsList>

                <TabsContent value="overview">
                  <OverviewTab
                    data={dashboardData}
                    isLoading={isLoadingDashboard}
                  />
                </TabsContent>

                <TabsContent value="budget">
                  <BudgetManager />
                </TabsContent>
                
                <TabsContent value="transactions" className="animate-fade-in">
                  <TransactionsPage />
                </TabsContent>  


                <TabsContent value="goals">
                  <GoalsManager />
                </TabsContent>

                <TabsContent value="forecast">
                  <ForecastView />
                </TabsContent>

                <TabsContent value="reports">
                  <ReportsView />
                </TabsContent>
              </Tabs>
            </>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Dashboard;
