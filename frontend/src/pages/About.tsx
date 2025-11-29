import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Target, Users, Award, Zap } from "lucide-react";

const About = () => {
  const values = [
    {
      icon: Target,
      title: "Our Mission",
      description:
        "To democratize financial intelligence by making AI-powered money management accessible to everyone, everywhere.",
    },
    {
      icon: Users,
      title: "User-Centric",
      description:
        "We put our users first, designing every feature with their financial success and ease of use in mind.",
    },
    {
      icon: Award,
      title: "Excellence",
      description:
        "We strive for excellence in every aspect of our product, from security to user experience.",
    },
    {
      icon: Zap,
      title: "Innovation",
      description:
        "We continuously innovate to provide cutting-edge AI solutions that solve real financial challenges.",
    },
  ];

  const team = [
    {
      name: "Aaditya Ranjan Moitra",
      image: "👨‍💻",
      role: "Backend Developer and DevOps Engineer",
    },
    {
      name: "Avnish Singh",
      image: "👨‍💻",
      role: "Frontend Developer",
    },
    {
      name: "Dhruv Tiwari",
      image: "👨‍💻",
      role: "Technical Documentation Specialist",
    },
  ];

  const stats = [
    { value: "50K+", label: "Active Users" },
    { value: "₹10M+", label: "Money Saved" },
    { value: "95%", label: "Satisfaction Rate" },
    { value: "4.8/5", label: "App Rating" },
  ];

  return (
    <div className="min-h-screen">
      <Navigation />

      <main className="pt-24 pb-20">
        {/* Hero Section */}
        <section className="container mx-auto px-4 mb-20">
          <div className="max-w-3xl mx-auto text-center animate-slide-up">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Building the Future of
              <br />
              <span className="bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
                Personal Finance
              </span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground">
              FinTrack AI was born from a simple belief: everyone deserves access
              to intelligent financial guidance, not just the wealthy. We're on a
              mission to democratize financial intelligence through AI.
            </p>
          </div>
        </section>

        {/* Stats */}
        <section className="bg-muted/30 py-16 mb-20">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className="text-center animate-fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
                    {stat.value}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Story */}
        <section className="container mx-auto px-4 mb-20">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center animate-slide-up">
              Our Story
            </h2>
            <div className="prose prose-lg max-w-none text-muted-foreground space-y-4 animate-fade-in">
              <p>
                As college students passionate about technology and finance, we noticed a real
                challenge in how people our age manage their money. Most finance apps we tried
                were either too complicated or too limited to be helpful.
              </p>
              <p>
                That’s when the idea for FinTrack AI was born — a smart, intuitive finance app
                designed by students, for students. We wanted something that could analyze
                spending habits, provide meaningful insights, and simplify money management.
              </p>
              <p>
                With a shared vision and a dedicated team of tech enthusiasts and design
                thinkers, we built FinTrack AI from scratch — not just as a product, but as a
                mission to empower people financially.
              </p>
              <p>
                We're still growing, learning, and improving every day. FinTrack AI is more than
                an app — it’s our dream to make financial wellness accessible to everyone.
              </p>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="bg-muted/30 py-20 mb-20">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center animate-slide-up">
              Our Core Values
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((value, index) => (
                <div
                  key={index}
                  className="bg-card rounded-xl p-6 shadow-soft hover:shadow-medium transition-all duration-300 hover:-translate-y-1 border border-border animate-fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="inline-flex p-3 rounded-xl gradient-primary text-white mb-4">
                    <value.icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{value.title}</h3>
                  <p className="text-muted-foreground">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Team */}
        <section className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center animate-slide-up">
            Meet Our Team
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto place-items-center">
            {team.map((member, index) => (
              <div
                key={index}
                className="text-center animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-32 h-32 mx-auto mb-4 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-6xl shadow-medium">
                  {member.image}
                </div>
                <h3 className="text-xl font-semibold mb-1">{member.name}</h3>
                <p className="text-primary text-sm mb-2">{member.role}</p>
              </div>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default About;