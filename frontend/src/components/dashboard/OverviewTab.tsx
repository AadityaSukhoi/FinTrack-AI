import { Card } from "@/components/ui/card";
import {
  TrendingUp,
  TrendingDown,
  Wallet,
  Target,
  ArrowUpRight,
  ArrowDownRight,
  Sparkles,
} from "lucide-react";
import {
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

const OverviewTab = () => {
  const expenseData = [
    { month: "Jan", expenses: 32000, income: 65000 },
    { month: "Feb", expenses: 28000, income: 65000 },
    { month: "Mar", expenses: 35000, income: 70000 },
    { month: "Apr", expenses: 31000, income: 70000 },
    { month: "May", expenses: 38000, income: 75000 },
    { month: "Jun", expenses: 32450, income: 85000 },
  ];

  const categoryData = [
    { name: "Food & Dining", value: 12500, color: "#14b8a6" },
    { name: "Transportation", value: 8200, color: "#0ea5e9" },
    { name: "Shopping", value: 6300, color: "#8b5cf6" },
    { name: "Bills & Utilities", value: 4200, color: "#f59e0b" },
    { name: "Entertainment", value: 1250, color: "#ec4899" },
  ];

  const aiRecommendations = [
    {
      title: "Reduce Dining Out",
      description:
        "You've spent 23% more on dining this month. Consider cooking at home to save ₹3,500.",
      impact: "High",
      icon: "🍽️",
    },
    {
      title: "Great Savings!",
      description:
        "You're ₹5,200 under budget this month. Perfect time to boost your emergency fund!",
      impact: "Positive",
      icon: "🎉",
    },
    {
      title: "Upcoming Bill",
      description:
        "Your internet bill of ₹999 is due in 3 days. Make sure you have sufficient balance.",
      impact: "Medium",
      icon: "📅",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="p-6 gradient-primary text-white shadow-medium hover:shadow-strong transition-all duration-300 hover:-translate-y-1">
          <div className="flex items-start justify-between mb-4">
            <div>
              <p className="text-white/80 text-sm mb-1">Total Balance</p>
              <p className="text-3xl font-bold">₹1,24,580</p>
            </div>
            <div className="bg-white/20 p-2 rounded-lg">
              <Wallet className="w-6 h-6" />
            </div>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <ArrowUpRight className="w-4 h-4" />
            <span>+12.5% from last month</span>
          </div>
        </Card>

        <Card className="p-6 bg-card shadow-soft hover:shadow-medium transition-all duration-300 hover:-translate-y-1">
          <div className="flex items-start justify-between mb-4">
            <div>
              <p className="text-muted-foreground text-sm mb-1">Income (June)</p>
              <p className="text-3xl font-bold text-success">₹85,000</p>
            </div>
            <div className="bg-success/10 p-2 rounded-lg">
              <TrendingUp className="w-6 h-6 text-success" />
            </div>
          </div>
          <div className="flex items-center gap-2 text-sm text-success">
            <ArrowUpRight className="w-4 h-4" />
            <span>+5.2% increase</span>
          </div>
        </Card>

        <Card className="p-6 bg-card shadow-soft hover:shadow-medium transition-all duration-300 hover:-translate-y-1">
          <div className="flex items-start justify-between mb-4">
            <div>
              <p className="text-muted-foreground text-sm mb-1">Expenses (June)</p>
              <p className="text-3xl font-bold text-destructive">₹32,450</p>
            </div>
            <div className="bg-destructive/10 p-2 rounded-lg">
              <TrendingDown className="w-6 h-6 text-destructive" />
            </div>
          </div>
          <div className="flex items-center gap-2 text-sm text-success">
            <ArrowDownRight className="w-4 h-4" />
            <span>-8.3% decrease</span>
          </div>
        </Card>

        <Card className="p-6 bg-card shadow-soft hover:shadow-medium transition-all duration-300 hover:-translate-y-1">
          <div className="flex items-start justify-between mb-4">
            <div>
              <p className="text-muted-foreground text-sm mb-1">Budget Left</p>
              <p className="text-3xl font-bold text-primary">₹18,560</p>
            </div>
            <div className="bg-primary/10 p-2 rounded-lg">
              <Target className="w-6 h-6 text-primary" />
            </div>
          </div>
          <div className="text-sm text-muted-foreground">
            62% of monthly budget remaining
          </div>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Expense Trend */}
        <Card className="lg:col-span-2 p-6 shadow-soft">
          <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-primary" />
            Income vs Expenses
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={expenseData}>
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
              <Line
                type="monotone"
                dataKey="income"
                stroke="hsl(var(--success))"
                strokeWidth={3}
                dot={{ fill: "hsl(var(--success))", r: 4 }}
              />
              <Line
                type="monotone"
                dataKey="expenses"
                stroke="hsl(var(--destructive))"
                strokeWidth={3}
                dot={{ fill: "hsl(var(--destructive))", r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        {/* Category Breakdown */}
        <Card className="p-6 shadow-soft">
          <h2 className="text-xl font-semibold mb-6">By Category</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={categoryData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={5}
                dataKey="value"
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
          <div className="space-y-2 mt-4">
            {categoryData.map((cat, idx) => (
              <div key={idx} className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: cat.color }}
                  ></div>
                  <span className="text-muted-foreground">{cat.name}</span>
                </div>
                <span className="font-semibold">₹{cat.value.toLocaleString()}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* AI Recommendations */}
      <Card className="p-6 shadow-soft">
        <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-primary" />
          AI-Powered Insights
        </h2>
        <div className="space-y-4">
          {aiRecommendations.map((rec, idx) => (
            <div
              key={idx}
              className={`p-4 rounded-xl border transition-all duration-300 hover:shadow-soft ${
                rec.impact === "Positive"
                  ? "bg-success/5 border-success/20"
                  : rec.impact === "High"
                  ? "bg-destructive/5 border-destructive/20"
                  : "bg-primary/5 border-primary/20"
              }`}
            >
              <div className="flex items-start gap-3">
                <span className="text-2xl">{rec.icon}</span>
                <div className="flex-1">
                  <h3 className="font-semibold mb-1">{rec.title}</h3>
                  <p className="text-sm text-muted-foreground">{rec.description}</p>
                </div>
                <span
                  className={`text-xs px-2 py-1 rounded-full ${
                    rec.impact === "Positive"
                      ? "bg-success/20 text-success"
                      : rec.impact === "High"
                      ? "bg-destructive/20 text-destructive"
                      : "bg-primary/20 text-primary"
                  }`}
                >
                  {rec.impact}
                </span>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default OverviewTab;
