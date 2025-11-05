import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import {
  Brain,
  TrendingUp,
  Target,
  Bell,
  CreditCard,
  PieChart,
  Shield,
  Zap,
  BarChart3,
  Wallet,
  Receipt,
  AlertCircle,
} from "lucide-react";

const Features = () => {
  const mainFeatures = [
    // {
    //   icon: PieChart,
    //   title: "Automatic Expense Categorization",
    //   description:
    //     "Our AI automatically categorizes your transactions into intuitive groups like Food, Transport, Entertainment, and more. No manual tagging required.",
    //   benefits: [
    //     "Smart category detection",
    //     "Custom category creation",
    //     "Historical pattern learning",
    //     "Real-time classification",
    //   ],
    //   color: "from-primary to-accent",
    // },
    {
      icon: Brain,
      title: "ML-Based Expense Forecasting",
      description:
        "Advanced machine learning algorithms analyze your spending patterns to predict future expenses with remarkable accuracy.",
      benefits: [
        "Monthly spending predictions",
        "Seasonal trend analysis",
        "Anomaly detection",
        "Budget optimization suggestions",
      ],
      color: "from-accent to-success",
    },
    {
      icon: TrendingUp,
      title: "Interactive Budget Dashboard",
      description:
        "A beautiful, real-time dashboard that gives you complete visibility into your financial health at a glance.",
      benefits: [
        "Live expense tracking",
        "Visual spending reports",
        "Budget vs actual comparison",
        "Customizable widgets",
      ],
      color: "from-success to-warning",
    },
    {
      icon: CreditCard,
      title: "AI Expense Insights",
      description:
        "Gain deep insights into your spending habits using advanced AI analytics. Identify trends, cut unnecessary expenses, and optimize your budget effortlessly.",
      benefits: [
        "Automated spending analysis",
        "Category-wise insights",
        "Monthly trend visualization",
        "Personalized saving suggestions",
      ],
      color: "from-warning to-info",
    },
    {
      icon: Bell,
      title: "Smart Push Notifications",
      description:
        "Never miss a bill payment or exceed your budget. Get intelligent alerts tailored to your financial behavior.",
      benefits: [
        "Bill payment reminders",
        "Budget limit warnings",
        "Unusual spending alerts",
        "Savings milestone celebrations",
      ],
      color: "from-info to-secondary",
    },
    {
      icon: Target,
      title: "Savings Goal Tracker",
      description:
        "Set financial goals and track progress with visual milestones. Our AI suggests optimal saving strategies.",
      benefits: [
        "Multiple goal management",
        "Progress visualization",
        "AI-powered recommendations",
        "Automatic saving suggestions",
      ],
      color: "from-secondary to-primary",
    },
  ];

  const additionalFeatures = [
    {
      icon: Shield,
      title: "Bank-Grade Security",
      description: "Your data is encrypted and protected with military-grade security protocols.",
    },
    {
      icon: Zap,
      title: "Instant Sync",
      description: "Real-time transaction updates across all your connected accounts.",
    },
    {
      icon: BarChart3,
      title: "Advanced Analytics",
      description: "Deep insights into your spending patterns with interactive charts.",
    },
    {
      icon: Wallet,
      title: "Multi-Currency Support",
      description: "Track expenses in multiple currencies with automatic conversion.",
    },
    {
      icon: Receipt,
      title: "Receipt Scanner",
      description: "Scan and digitize paper receipts with AI-powered OCR technology.",
    },
    {
      icon: AlertCircle,
      title: "Fraud Detection",
      description: "AI monitors unusual transactions to protect you from fraud.",
    },
  ];

  return (
    <div className="min-h-screen">
      <Navigation />

      <main className="pt-24 pb-20">
        {/* Hero Section */}
        <section className="container mx-auto px-4 mb-20">
          <div className="text-center max-w-3xl mx-auto animate-slide-up">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Features Built for
              <br />
              <span className="bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
                Financial Success
              </span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground">
              Discover how FinTrack AI combines cutting-edge technology with
              intuitive design to revolutionize your financial management
              experience.
            </p>
          </div>
        </section>

        {/* Main Features */}
        <section className="container mx-auto px-4 mb-20">
          <div className="space-y-20">
            {mainFeatures.map((feature, index) => (
              <div
                key={index}
                className={`grid lg:grid-cols-2 gap-12 items-center ${
                  index % 2 === 1 ? "lg:flex-row-reverse" : ""
                }`}
              >
                <div
                  className={`${
                    index % 2 === 1 ? "lg:order-2" : ""
                  } animate-slide-up`}
                >
                  <div
                    className={`inline-flex p-4 rounded-2xl bg-gradient-to-br ${feature.color} mb-6`}
                  >
                    <feature.icon className="w-8 h-8 text-white" />
                  </div>
                  <h2 className="text-3xl md:text-4xl font-bold mb-4">
                    {feature.title}
                  </h2>
                  <p className="text-lg text-muted-foreground mb-6">
                    {feature.description}
                  </p>
                  <ul className="space-y-3">
                    {feature.benefits.map((benefit, idx) => (
                      <li key={idx} className="flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full bg-primary"></div>
                        <span className="text-foreground">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div
                  className={`${
                    index % 2 === 1 ? "lg:order-1" : ""
                  } animate-fade-in`}
                  style={{ animationDelay: "0.2s" }}
                >
                  <div className="bg-gradient-to-br from-muted to-muted/50 rounded-2xl p-8 shadow-medium border border-border h-80 flex items-center justify-center">
                    <feature.icon className="w-32 h-32 text-primary/20" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Additional Features Grid */}
        <section className="bg-muted/30 py-20">
          {/* <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 animate-slide-up">
              And Much More...
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {additionalFeatures.map((feature, index) => (
                <div
                  key={index}
                  className="bg-card rounded-xl p-6 shadow-soft hover:shadow-medium transition-all duration-300 hover:-translate-y-1 border border-border animate-fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="inline-flex p-3 rounded-lg bg-primary/10 text-primary mb-4">
                    <feature.icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
              ))}
            </div>
          </div> */}
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Features;
