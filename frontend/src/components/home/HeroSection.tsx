import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkle, TrendingUp } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Animated Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/20 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/20 rounded-full blur-3xl animate-float" style={{ animationDelay: "1s" }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-secondary/10 rounded-full blur-3xl animate-float" style={{ animationDelay: "2s" }}></div>
      </div>

      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="text-center lg:text-left animate-slide-up">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full mb-6 shadow-soft">
              <img src="/NoBg.png" alt="logo" className="w-4 h-4" />
              <span className="text-sm font-medium">AI-Powered Finance Management</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              <span className="bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
                Manage. Save.
              </span>
              <br />
              <span className="text-foreground">Predict.</span>
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-xl mx-auto lg:mx-0">
              Take control of your financial future with FinTrack AI. Track expenses, 
              predict spending patterns, and achieve your savings goals with intelligent insights.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link to="/auth">
                <Button variant="hero" size="xl" className="group">
                  Get Started Free
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link to="/dashboard">
                <Button variant="outline" size="xl">
                  View Demo
                  <TrendingUp className="w-5 h-5" />
                </Button>
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 mt-12 pt-8 border-t border-border">
              <div>
                <div className="text-2xl md:text-3xl font-bold text-primary">50K+</div>
                <div className="text-sm text-muted-foreground">Active Users</div>
              </div>
              <div>
                <div className="text-2xl md:text-3xl font-bold text-primary">₹10M+</div>
                <div className="text-sm text-muted-foreground">Money Saved</div>
              </div>
              <div>
                <div className="text-2xl md:text-3xl font-bold text-primary">95%</div>
                <div className="text-sm text-muted-foreground">Satisfaction</div>
              </div>
            </div>
          </div>

          {/* Right Content - Dashboard Preview */}
          <div className="relative animate-fade-in" style={{ animationDelay: "0.3s" }}>
            <div className="relative z-10 rounded-2xl overflow-hidden shadow-strong border border-border bg-card p-6">
              <div className="space-y-4">
                {/* Mini Dashboard Card */}
                <div className="gradient-primary rounded-xl p-6 text-white">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <p className="text-white/80 text-sm">Total Balance</p>
                      <p className="text-3xl font-bold mt-1">₹1,24,580</p>
                    </div>
                    <div className="bg-white/20 p-2 rounded-lg">
                      <TrendingUp className="w-6 h-6" />
                    </div>
                  </div>
                  <div className="flex gap-4 text-sm">
                    <div>
                      <p className="text-white/70">Income</p>
                      <p className="font-semibold">+₹85,000</p>
                    </div>
                    <div>
                      <p className="text-white/70">Expenses</p>
                      <p className="font-semibold">-₹42,500</p>
                    </div>
                  </div>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-muted rounded-xl p-4">
                    <p className="text-sm text-muted-foreground mb-1">This Month</p>
                    <p className="text-2xl font-bold text-foreground">₹32,450</p>
                    <p className="text-xs text-success">↑ 12% from last month</p>
                  </div>
                  <div className="bg-muted rounded-xl p-4">
                    <p className="text-sm text-muted-foreground mb-1">Budget Left</p>
                    <p className="text-2xl font-bold text-foreground">₹18,560</p>
                    <p className="text-xs text-warning">62% remaining</p>
                  </div>
                </div>

                {/* AI Insight Badge */}
                <div className="bg-accent/10 border border-accent/20 rounded-xl p-4 flex items-start gap-3">
                  <div className="bg-accent/20 p-2 rounded-lg">
                    <img src="/NoBg.png" alt="logo" className="w-4 h-4 text-accent" />
                  </div>
                  <div>
                    <p className="font-semibold text-sm mb-1">AI Insight</p>
                    <p className="text-xs text-muted-foreground">
                      You're on track to save ₹5,200 extra this month! 🎉
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-accent/30 rounded-full blur-2xl"></div>
            <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-primary/30 rounded-full blur-2xl"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
