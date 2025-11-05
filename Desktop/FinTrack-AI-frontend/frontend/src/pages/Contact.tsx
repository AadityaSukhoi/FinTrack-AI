import { useState } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Mail, Phone, MapPin, Send } from "lucide-react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast({
        title: "Error",
        description: "Please enter a valid email address",
        variant: "destructive",
      });
      return;
    }

    // Success
    toast({
      title: "Message sent!",
      description: "We'll get back to you within 24 hours",
    });

    // Reset form
    setFormData({
      name: "",
      email: "",
      subject: "",
      message: "",
    });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const contactInfo = [
    {
      icon: Mail,
      title: "Email",
      value: "support@fintrack.ai",
      link: "mailto:support@fintrack.ai",
    },
    {
      icon: Phone,
      title: "Phone",
      value: "+91 9793738208",
      link: "tel:+919793738208",
    },
    {
      icon: MapPin,
      title: "Office",
      value: " Tech Park, Bangalore, India",
      link: "#",
    },
  ];

  return (
    <div className="min-h-screen">
      <Navigation />

      <main className="pt-24 pb-20">
        {/* Hero */}
        <section className="container mx-auto px-4 mb-16">
          <div className="max-w-3xl mx-auto text-center animate-slide-up">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Get in{" "}
              <span className="bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
                Touch
              </span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground">
              Have a question or feedback? We'd love to hear from you. Send us a
              message and we'll respond as soon as possible.
            </p>
          </div>
        </section>

        {/* Contact Info Cards */}
        <section className="container mx-auto px-4 mb-16">
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {contactInfo.map((info, index) => (
              <a
                key={index}
                href={info.link}
                className="bg-card rounded-xl p-6 shadow-soft hover:shadow-medium transition-all duration-300 hover:-translate-y-1 border border-border text-center group animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="inline-flex p-3 rounded-xl bg-primary/10 text-primary mb-4 group-hover:scale-110 transition-transform duration-300">
                  <info.icon className="w-6 h-6" />
                </div>
                <h3 className="font-semibold mb-2">{info.title}</h3>
                <p className="text-sm text-muted-foreground">{info.value}</p>
              </a>
            ))}
          </div>
        </section>

        {/* Contact Form */}
        <section className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Left - Form */}
            <div className="animate-slide-up">
              <h2 className="text-3xl font-bold mb-6">Send us a Message</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={handleChange}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="john@example.com"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="subject">Subject</Label>
                  <Input
                    id="subject"
                    name="subject"
                    type="text"
                    placeholder="How can we help?"
                    value={formData.subject}
                    onChange={handleChange}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    name="message"
                    placeholder="Tell us more about your inquiry..."
                    rows={6}
                    value={formData.message}
                    onChange={handleChange}
                  />
                </div>

                <Button type="submit" variant="hero" size="lg" className="w-full group">
                  Send Message
                  <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </form>
            </div>

            {/* Right - Additional Info */}
            <div className="animate-fade-in" style={{ animationDelay: "0.2s" }}>
              <div className="bg-gradient-to-br from-primary via-accent to-secondary rounded-2xl p-8 text-white h-full flex flex-col justify-center shadow-strong">
                <h3 className="text-2xl font-bold mb-6">
                  Why Choose FinTrack AI?
                </h3>
                <div className="space-y-6">
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-white/20 flex items-center justify-center font-bold">
                      1
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">Fast Response</h4>
                      <p className="text-white/90 text-sm">
                        Our support team responds within 24 hours on business
                        days
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-white/20 flex items-center justify-center font-bold">
                      2
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">Expert Support</h4>
                      <p className="text-white/90 text-sm">
                        Get help from financial tech experts who understand your
                        needs
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-white/20 flex items-center justify-center font-bold">
                      3
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">Multiple Channels</h4>
                      <p className="text-white/90 text-sm">
                        Reach us via email, phone, or this contact form
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-8 border-t border-white/20">
                  <p className="text-sm text-white/80 mb-4">
                    Business Hours:
                  </p>
                  <p className="text-white/90">
                    Monday - Friday: 9:00 AM - 6:00 PM IST
                    <br />
                    Saturday: 10:00 AM - 4:00 PM IST
                    <br />
                    Sunday: Closed
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Preview */}
        <section className="container mx-auto px-4 mt-20">
          <div className="max-w-3xl mx-auto text-center bg-muted/30 rounded-2xl p-8">
            <h3 className="text-2xl font-bold mb-4">
              Looking for Quick Answers?
            </h3>
            <p className="text-muted-foreground mb-6">
              Check out our FAQ section or documentation for instant help with
              common questions
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="outline" size="lg">
                View FAQ
              </Button>
              <Button variant="outline" size="lg">
                Documentation
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Contact;
