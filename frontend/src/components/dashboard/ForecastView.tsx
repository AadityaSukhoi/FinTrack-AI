import { Card } from "@/components/ui/card";
import { TrendingUp, TrendingDown, Calendar, DollarSign } from "lucide-react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const ForecastView = () => {
  const forecastData = [
    { month: "Jul", actual: 32450, predicted: 33000 },
    { month: "Aug", actual: null, predicted: 34500 },
    { month: "Sep", actual: null, predicted: 35200 },
    { month: "Oct", actual: null, predicted: 36100 },
    { month: "Nov", actual: null, predicted: 34800 },
    { month: "Dec", actual: null, predicted: 38500 },
  ];

  const categoryForecast = [
    { category: "Food", current: 12500, predicted: 13200 },
    { category: "Transport", current: 8200, predicted: 8800 },
    { category: "Shopping", current: 6300, predicted: 7100 },
    { category: "Bills", current: 4200, predicted: 4500 },
    { category: "Entertainment", current: 1250, predicted: 1800 },
  ];

  const insights = [
    {
      title: "Spending Trend",
      description:
        "Your expenses are projected to increase by 8% over the next 6 months due to seasonal trends.",
      type: "warning",
      icon: TrendingUp,
    },
    {
      title: "High Expense Month",
      description:
        "December is forecasted to have the highest expenses (₹38,500) due to holiday season.",
      type: "info",
      icon: Calendar,
    },
    {
      title: "Savings Opportunity",
      description:
        "By reducing entertainment spending by 20%, you could save an extra ₹1,500/month.",
      type: "success",
      icon: DollarSign,
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="p-6 gradient-primary text-white shadow-medium">
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-2xl font-bold mb-2">AI-Powered Forecast</h2>
            <p className="text-white/80">
              Machine learning predictions based on your spending patterns
            </p>
          </div>
          <div className="bg-white/20 p-3 rounded-lg">
            <TrendingUp className="w-6 h-6" />
          </div>
        </div>
      </Card>

      {/* Monthly Forecast Chart */}
      <Card className="p-6 shadow-soft">
        <h3 className="text-xl font-semibold mb-6">6-Month Expense Forecast</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={forecastData}>
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
              dataKey="actual"
              stroke="hsl(var(--primary))"
              strokeWidth={3}
              dot={{ fill: "hsl(var(--primary))", r: 5 }}
              name="Actual"
            />
            <Line
              type="monotone"
              dataKey="predicted"
              stroke="hsl(var(--accent))"
              strokeWidth={3}
              strokeDasharray="5 5"
              dot={{ fill: "hsl(var(--accent))", r: 5 }}
              name="Predicted"
            />
          </LineChart>
        </ResponsiveContainer>
        <p className="text-sm text-muted-foreground mt-4 text-center">
          Dashed line represents AI predictions based on historical data
        </p>
      </Card>

      {/* Category Forecast */}
      <Card className="p-6 shadow-soft">
        <h3 className="text-xl font-semibold mb-6">
          Next Month Category Forecast
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={categoryForecast}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis dataKey="category" stroke="hsl(var(--muted-foreground))" />
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
              dataKey="current"
              fill="hsl(var(--primary))"
              radius={[8, 8, 0, 0]}
              name="Current Month"
            />
            <Bar
              dataKey="predicted"
              fill="hsl(var(--accent))"
              radius={[8, 8, 0, 0]}
              name="Next Month (Predicted)"
            />
          </BarChart>
        </ResponsiveContainer>
      </Card>

      {/* AI Insights */}
      <div>
        <h3 className="text-xl font-semibold mb-4">AI Insights & Predictions</h3>
        <div className="space-y-4">
          {insights.map((insight, idx) => (
            <Card
              key={idx}
              className={`p-5 shadow-soft hover:shadow-medium transition-all duration-300 border-l-4 animate-fade-in ${
                insight.type === "warning"
                  ? "border-l-warning bg-warning/5"
                  : insight.type === "success"
                  ? "border-l-success bg-success/5"
                  : "border-l-info bg-info/5"
              }`}
              style={{ animationDelay: `${idx * 0.1}s` }}
            >
              <div className="flex items-start gap-4">
                <div
                  className={`p-3 rounded-lg ${
                    insight.type === "warning"
                      ? "bg-warning/10 text-warning"
                      : insight.type === "success"
                      ? "bg-success/10 text-success"
                      : "bg-info/10 text-info"
                  }`}
                >
                  <insight.icon className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold mb-1">{insight.title}</h4>
                  <p className="text-sm text-muted-foreground">
                    {insight.description}
                  </p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid md:grid-cols-3 gap-4">
        <Card className="p-5 shadow-soft text-center">
          <TrendingUp className="w-8 h-8 mx-auto mb-2 text-success" />
          <p className="text-2xl font-bold text-foreground">+8%</p>
          <p className="text-sm text-muted-foreground">Predicted Growth</p>
        </Card>
        <Card className="p-5 shadow-soft text-center">
          <Calendar className="w-8 h-8 mx-auto mb-2 text-primary" />
          <p className="text-2xl font-bold text-foreground">95%</p>
          <p className="text-sm text-muted-foreground">Accuracy Score</p>
        </Card>
        <Card className="p-5 shadow-soft text-center">
          <DollarSign className="w-8 h-8 mx-auto mb-2 text-accent" />
          <p className="text-2xl font-bold text-foreground">₹2,100</p>
          <p className="text-sm text-muted-foreground">Avg. Monthly Increase</p>
        </Card>
      </div>
    </div>
  );
};

export default ForecastView;
