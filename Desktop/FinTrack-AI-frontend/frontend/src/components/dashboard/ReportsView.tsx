import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Download, FileText, TrendingUp, Calendar } from "lucide-react";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

const ReportsView = () => {
  const [period, setPeriod] = useState("monthly");
  const { toast } = useToast();

  const monthlyData = [
    { month: "Jan", income: 65000, expenses: 32000, savings: 33000 },
    { month: "Feb", income: 65000, expenses: 28000, savings: 37000 },
    { month: "Mar", income: 70000, expenses: 35000, savings: 35000 },
    { month: "Apr", income: 70000, expenses: 31000, savings: 39000 },
    { month: "May", income: 75000, expenses: 38000, savings: 37000 },
    { month: "Jun", income: 85000, expenses: 32450, savings: 52550 },
  ];

  const categoryData = [
    { name: "Food & Dining", value: 12500, color: "#14b8a6" },
    { name: "Transportation", value: 8200, color: "#0ea5e9" },
    { name: "Shopping", value: 6300, color: "#8b5cf6" },
    { name: "Bills & Utilities", value: 4200, color: "#f59e0b" },
    { name: "Entertainment", value: 1250, color: "#ec4899" },
  ];

  const handleDownloadReport = () => {
    toast({
      title: "Report Downloaded",
      description: "Your financial report has been downloaded as PDF",
    });
  };

  const stats = [
    {
      label: "Total Income (6M)",
      value: "₹4,30,000",
      change: "+15.2%",
      trend: "up",
    },
    {
      label: "Total Expenses (6M)",
      value: "₹1,96,450",
      change: "-3.5%",
      trend: "down",
    },
    {
      label: "Total Savings (6M)",
      value: "₹2,33,550",
      change: "+28.7%",
      trend: "up",
    },
    {
      label: "Avg. Monthly Savings",
      value: "₹38,925",
      change: "+12.4%",
      trend: "up",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="p-6 shadow-soft">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold mb-2">Financial Reports</h2>
            <p className="text-muted-foreground">
              Comprehensive analysis of your financial activity
            </p>
          </div>
          <div className="flex gap-3">
            <Select value={period} onValueChange={setPeriod}>
              <SelectTrigger className="w-[180px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="monthly">Last 6 Months</SelectItem>
                <SelectItem value="yearly">Yearly</SelectItem>
                <SelectItem value="quarterly">Quarterly</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="hero" onClick={handleDownloadReport} className="gap-2">
              <Download className="w-4 h-4" />
              Export PDF
            </Button>
          </div>
        </div>
      </Card>

      {/* Stats Grid */}
      <div className="grid md:grid-cols-4 gap-4">
        {stats.map((stat, idx) => (
          <Card
            key={idx}
            className="p-5 shadow-soft hover:shadow-medium transition-all duration-300 animate-fade-in"
            style={{ animationDelay: `${idx * 0.1}s` }}
          >
            <p className="text-sm text-muted-foreground mb-2">{stat.label}</p>
            <p className="text-2xl font-bold mb-2">{stat.value}</p>
            <div
              className={`flex items-center gap-1 text-sm ${
                stat.trend === "up" ? "text-success" : "text-destructive"
              }`}
            >
              <TrendingUp
                className={`w-4 h-4 ${
                  stat.trend === "down" && "rotate-180"
                }`}
              />
              <span>{stat.change}</span>
            </div>
          </Card>
        ))}
      </div>

      {/* Income vs Expenses vs Savings */}
      <Card className="p-6 shadow-soft">
        <h3 className="text-xl font-semibold mb-6">
          Income, Expenses & Savings Overview
        </h3>
        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={monthlyData}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
            <YAxis stroke="hsl(var(--muted-foreground))" />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--card))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "8px",
              }}
            />
            <Legend />
            <Bar
              dataKey="income"
              fill="hsl(var(--success))"
              radius={[8, 8, 0, 0]}
              name="Income"
            />
            <Bar
              dataKey="expenses"
              fill="hsl(var(--destructive))"
              radius={[8, 8, 0, 0]}
              name="Expenses"
            />
            <Bar
              dataKey="savings"
              fill="hsl(var(--primary))"
              radius={[8, 8, 0, 0]}
              name="Savings"
            />
          </BarChart>
        </ResponsiveContainer>
      </Card>

      {/* Two Column Layout */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Savings Trend */}
        <Card className="p-6 shadow-soft">
          <h3 className="text-xl font-semibold mb-6">Savings Trend</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
              <YAxis stroke="hsl(var(--muted-foreground))" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px",
                }}
              />
              <Line
                type="monotone"
                dataKey="savings"
                stroke="hsl(var(--primary))"
                strokeWidth={3}
                dot={{ fill: "hsl(var(--primary))", r: 5 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        {/* Category Breakdown */}
        <Card className="p-6 shadow-soft">
          <h3 className="text-xl font-semibold mb-6">
            Expense Distribution (June)
          </h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={categoryData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) =>
                  `${name}: ${(percent * 100).toFixed(0)}%`
                }
              >
                {categoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px",
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Summary Cards */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card className="p-6 shadow-soft border-l-4 border-l-success bg-success/5">
          <div className="flex items-start gap-4">
            <div className="bg-success/10 p-3 rounded-lg">
              <TrendingUp className="w-6 h-6 text-success" />
            </div>
            <div>
              <h4 className="font-semibold mb-2 text-lg">Best Performance</h4>
              <p className="text-sm text-muted-foreground mb-2">
                Your highest savings month was <strong>June 2024</strong> with ₹52,550
                saved.
              </p>
              <p className="text-xs text-success">Keep up the great work! 🎉</p>
            </div>
          </div>
        </Card>

        <Card className="p-6 shadow-soft border-l-4 border-l-primary bg-primary/5">
          <div className="flex items-start gap-4">
            <div className="bg-primary/10 p-3 rounded-lg">
              <Calendar className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h4 className="font-semibold mb-2 text-lg">Next Milestone</h4>
              <p className="text-sm text-muted-foreground mb-2">
                You're on track to save <strong>₹2,80,000</strong> by the end of the
                year.
              </p>
              <p className="text-xs text-primary">
                Only ₹46,450 more to reach your target! 💪
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default ReportsView;
