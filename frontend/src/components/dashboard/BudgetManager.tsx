import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { PiggyBank, Plus, Pencil, Trash2 } from "lucide-react";

interface Budget {
  id: string;
  category: string;
  limit: number;
  spent: number;
}

const BudgetManager = () => {
  const [budgets, setBudgets] = useState<Budget[]>([
    { id: "1", category: "Food & Dining", limit: 15000, spent: 12500 },
    { id: "2", category: "Transportation", limit: 10000, spent: 8200 },
    { id: "3", category: "Shopping", limit: 8000, spent: 6300 },
    { id: "4", category: "Entertainment", limit: 5000, spent: 1250 },
  ]);
  const [isAdding, setIsAdding] = useState(false);
  const [newBudget, setNewBudget] = useState({ category: "", limit: "" });
  const { toast } = useToast();

  const handleAddBudget = () => {
    if (!newBudget.category || !newBudget.limit) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    const limit = parseFloat(newBudget.limit);
    if (isNaN(limit) || limit <= 0) {
      toast({
        title: "Error",
        description: "Please enter a valid amount",
        variant: "destructive",
      });
      return;
    }

    const budget: Budget = {
      id: Date.now().toString(),
      category: newBudget.category,
      limit,
      spent: 0,
    };

    setBudgets([...budgets, budget]);
    setNewBudget({ category: "", limit: "" });
    setIsAdding(false);

    toast({
      title: "Success",
      description: "Budget added successfully",
    });
  };

  const handleDeleteBudget = (id: string) => {
    setBudgets(budgets.filter((b) => b.id !== id));
    toast({
      title: "Success",
      description: "Budget deleted",
    });
  };

  const getProgressColor = (percentage: number) => {
    if (percentage >= 90) return "bg-destructive";
    if (percentage >= 70) return "bg-warning";
    return "bg-success";
  };

  const totalBudget = budgets.reduce((sum, b) => sum + b.limit, 0);
  const totalSpent = budgets.reduce((sum, b) => sum + b.spent, 0);

  return (
    <div className="space-y-6">
      {/* Summary Card */}
      <Card className="p-6 gradient-primary text-white shadow-medium">
        <div className="flex items-start justify-between mb-4">
          <div>
            <p className="text-white/80 text-sm mb-1">Total Budget</p>
            <p className="text-3xl font-bold">₹{totalBudget.toLocaleString()}</p>
          </div>
          <div className="bg-white/20 p-3 rounded-lg">
            <PiggyBank className="w-6 h-6" />
          </div>
        </div>
        <div className="flex justify-between items-center text-sm">
          <span>Spent: ₹{totalSpent.toLocaleString()}</span>
          <span>
            Remaining: ₹{(totalBudget - totalSpent).toLocaleString()}
          </span>
        </div>
      </Card>

      {/* Add Budget Form */}
      {isAdding && (
        <Card className="p-6 shadow-soft animate-slide-up">
          <h3 className="text-lg font-semibold mb-4">Add New Budget</h3>
          <div className="space-y-4">
            <div>
              <Label htmlFor="category">Category</Label>
              <Input
                id="category"
                placeholder="e.g., Healthcare"
                value={newBudget.category}
                onChange={(e) =>
                  setNewBudget({ ...newBudget, category: e.target.value })
                }
              />
            </div>
            <div>
              <Label htmlFor="limit">Budget Limit (₹)</Label>
              <Input
                id="limit"
                type="number"
                placeholder="0.00"
                value={newBudget.limit}
                onChange={(e) =>
                  setNewBudget({ ...newBudget, limit: e.target.value })
                }
              />
            </div>
            <div className="flex gap-3">
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => {
                  setIsAdding(false);
                  setNewBudget({ category: "", limit: "" });
                }}
              >
                Cancel
              </Button>
              <Button
                variant="hero"
                className="flex-1"
                onClick={handleAddBudget}
              >
                Add Budget
              </Button>
            </div>
          </div>
        </Card>
      )}

      {/* Add Button */}
      {!isAdding && (
        <Button
          variant="outline"
          className="w-full"
          onClick={() => setIsAdding(true)}
        >
          <Plus className="w-4 h-4 mr-2" />
          Add New Budget
        </Button>
      )}

      {/* Budget List */}
      <div className="space-y-4">
        {budgets.map((budget, idx) => {
          const percentage = (budget.spent / budget.limit) * 100;
          return (
            <Card
              key={budget.id}
              className="p-6 shadow-soft hover:shadow-medium transition-all duration-300 animate-fade-in"
              style={{ animationDelay: `${idx * 0.1}s` }}
            >
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold">{budget.category}</h3>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10"
                  onClick={() => handleDeleteBudget(budget.id)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>₹{budget.spent.toLocaleString()} spent</span>
                  <span>₹{budget.limit.toLocaleString()} limit</span>
                </div>
                <Progress value={percentage} className="h-2" />
                <div className="flex justify-between items-center">
                  <span className="text-xs text-muted-foreground">
                    {percentage.toFixed(0)}% used
                  </span>
                  <span
                    className={`text-xs font-medium ${
                      percentage >= 90
                        ? "text-destructive"
                        : percentage >= 70
                        ? "text-warning"
                        : "text-success"
                    }`}
                  >
                    ₹{(budget.limit - budget.spent).toLocaleString()} left
                  </span>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default BudgetManager;
