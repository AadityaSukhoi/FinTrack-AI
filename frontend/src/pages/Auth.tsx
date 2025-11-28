// import { useState } from "react";
// import { Link } from "react-router-dom";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { img src="/NoBg.png" alt="logo", Mail, Lock, User, Eye, EyeOff } from "lucide-react";
// import { useToast } from "@/hooks/use-toast";
// import axios from "axios"; 
// import { GoogleLogin } from "@react-oauth/google";


// const Auth = () => {
//   const [isLogin, setIsLogin] = useState(true);
//   const [showPassword, setShowPassword] = useState(false);
//   const [formData, setFormData] = useState({
//     username: "",
//     email: "",
//     password: "",
//   });
//   const { toast } = useToast();

//   // ------------------- UPDATED handleSubmit -------------------
//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     // Basic validation
//     if (!isLogin && !formData.username) {
//       toast({
//         title: "Error",
//         description: "Please enter your name",
//         variant: "destructive",
//       });
//       return;
//     }

//     if (!formData.email || !formData.password) {
//       toast({
//         title: "Error",
//         description: "Please fill in all fields",
//         variant: "destructive",
//       });
//       return;
//     }

//     // Email validation
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     if (!emailRegex.test(formData.email)) {
//       toast({
//         title: "Error",
//         description: "Please enter a valid email address",
//         variant: "destructive",
//       });
//       return;
//     }

//     // Password validation
//     if (formData.password.length < 8) {
//       toast({
//         title: "Error",
//         description: "Password must be at least 8 characters",
//         variant: "destructive",
//       });
//       return;
//     }

//     try {
//       if (isLogin) {
//         // ------------------- LOGIN API -------------------
//         const res = await axios.post(
//   "http://127.0.0.1:8000/auth/login",
//   new URLSearchParams({
//     username: formData.email,  
//     password: formData.password,
//   }),
//   {
//     headers: {
//       "Content-Type": "application/x-www-form-urlencoded",
//     },
//   });

//         localStorage.setItem("access_token", res.data.access_token);

//         toast({
//           title: "Welcome back!",
//           description: "You have successfully logged in.",
//         });

//         window.location.href = "/";
//       } else {
//         // ------------------- SIGNUP API -------------------
//         const res = await axios.post("http://127.0.0.1:8000/auth/signup", {
//           username: formData.username,
//           email: formData.email,
//           password: formData.password,
//         });

//         toast({
//           title: "Account created!",
//           description: "Your account was successfully created.",
//         });

//         window.location.href = "/";
//       }
//     } catch (err: any) {
//       toast({
//         title: "Error",
//         description: err?.response?.data?.detail || "Something went wrong.",
//         variant: "destructive",
//       });
//     }
//   };
//   // ------------------------------------------------------------

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   return (
//     <div className="min-h-screen flex">
//       {/* Left Side - Form */}
//       <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
//         <div className="w-full max-w-md animate-slide-up">
//           {/* Logo */}
//           <Link to="/" className="flex items-center gap-2 mb-8">
//             <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center shadow-soft">
//               <img src="/NoBg.png" alt="logo" className="w-6 h-6 text-white" />
//             </div>
//             <span className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
//               FinTrack AI
//             </span>
//           </Link>

//           {/* Header */}
//           <div className="mb-8">
//             <h1 className="text-3xl md:text-4xl font-bold mb-2">
//               {isLogin ? "Welcome Back" : "Create Account"}
//             </h1>
//             <p className="text-muted-foreground">
//               {isLogin
//                 ? "Enter your credentials to access your account"
//                 : "Sign up to start managing your finances smartly"}
//             </p>
//           </div>

//           {/* Form */}
//           <form onSubmit={handleSubmit} className="space-y-6">
//             {!isLogin && (
//               <div className="space-y-2">
//                 <Label htmlFor="username">Full Name</Label>
//                 <div className="relative">
//                   <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
//                   <Input
//                     id="username"
//                     name="username"
//                     type="text"
//                     placeholder="John Doe"
//                     className="pl-10"
//                     value={formData.username}
//                     onChange={handleChange}
//                   />
//                 </div>
//               </div>
//             )}

//             <div className="space-y-2">
//               <Label htmlFor="email">Email</Label>
//               <div className="relative">
//                 <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
//                 <Input
//                   id="email"
//                   name="email"
//                   type="email"
//                   placeholder="name@example.com"
//                   className="pl-10"
//                   value={formData.email}
//                   onChange={handleChange}
//                 />
//               </div>
//             </div>

//             <div className="space-y-2">
//               <Label htmlFor="password">Password</Label>
//               <div className="relative">
//                 <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
//                 <Input
//                   id="password"
//                   name="password"
//                   type={showPassword ? "text" : "password"}
//                   placeholder="••••••••"
//                   className="pl-10 pr-10"
//                   value={formData.password}
//                   onChange={handleChange}
//                 />
//                 <button
//                   type="button"
//                   onClick={() => setShowPassword(!showPassword)}
//                   className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
//                 >
//                   {showPassword ? (
//                     <EyeOff className="w-5 h-5" />
//                   ) : (
//                     <Eye className="w-5 h-5" />
//                   )}
//                 </button>
//               </div>
//               {!isLogin && (
//                 <p className="text-xs text-muted-foreground">
//                   Must be at least 8 characters
//                 </p>
//               )}
//             </div>

//             {isLogin && (
//               <div className="flex items-center justify-between">
//                 <label className="flex items-center gap-2 text-sm">
//                   <input type="checkbox" className="rounded" />
//                   <span className="text-muted-foreground">Remember me</span>
//                 </label>
//                 <a href="#" className="text-sm text-primary hover:underline">
//                   Forgot password?
//                 </a>
//               </div>
//             )}

//             <Button type="submit" variant="hero" size="lg" className="w-full">
//               {isLogin ? "Sign In" : "Create Account"}
//             </Button>
//           </form>

//           {/* Divider */}
//           <div className="my-6 flex items-center gap-4">
//             <div className="flex-1 h-px bg-border"></div>
//             <span className="text-sm text-muted-foreground">or</span>
//             <div className="flex-1 h-px bg-border"></div>
//           </div>

//           {/* Social Login */}
// <div className="w-full flex justify-center">
//   <GoogleLogin
//     onSuccess={async (credentialResponse) => {
//       try {
//         const res = await axios.post(
//           "http://127.0.0.1:8000/auth/google",
//           { credential: credentialResponse.credential },
//           {
//             headers: {
//               "Content-Type": "application/json",
//             },
//           }
//         );

//         localStorage.setItem("access_token", res.data.access_token);

//         toast({
//           title: "Logged in with Google!",
//           description: "Welcome to FinTrack AI.",
//         });

//         window.location.href = "/";
//       } catch (err: any) {
//         toast({
//           title: "Google Login Failed",
//           description: err?.response?.data?.detail || "Something went wrong.",
//           variant: "destructive",
//         });
//       }
//     }}
//     onError={() => {
//       toast({
//         title: "Google Login Failed",
//         description: "Unable to authenticate.",
//         variant: "destructive",
//       });
//     }}
//   />
// </div>

//           {/* Toggle */}
//           <p className="text-center text-sm text-muted-foreground mt-6">
//             {isLogin ? "Don't have an account? " : "Already have an account? "}
//             <button
//               type="button"
//               onClick={() => {
//                 setIsLogin(!isLogin);
//                 setFormData({ username: "", email: "", password: "" });
//               }}
//               className="text-primary hover:underline font-medium"
//             >
//               {isLogin ? "Sign up" : "Sign in"}
//             </button>
//           </p>
//         </div>
//       </div>

//       {/* Right Side - Hero */}
//       <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-primary via-accent to-secondary items-center justify-center p-12 relative overflow-hidden">
//         <div className="absolute inset-0 opacity-10">
//           <div className="absolute top-20 left-20 w-64 h-64 bg-white rounded-full blur-3xl"></div>
//           <div className="absolute bottom-20 right-20 w-96 h-96 bg-white rounded-full blur-3xl"></div>
//         </div>

//         <div className="relative z-10 text-white max-w-lg">
//           <h2 className="text-4xl font-bold mb-6 animate-slide-up">
//             Take Control of Your Financial Future
//           </h2>
//           <p className="text-lg text-white/90 mb-8 animate-fade-in">
//             Join thousands of users who are already making smarter financial
//             decisions with AI-powered insights.
//           </p>

//           <div
//             className="space-y-4 animate-fade-in"
//             style={{ animationDelay: "0.3s" }}
//           >
//             <div className="flex items-center gap-3">
//               <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
//                 ✓
//               </div>
//               <span>Smart expense tracking & categorization</span>
//             </div>

//             <div className="flex items-center gap-3">
//               <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
//                 ✓
//               </div>
//               <span>AI-powered spending predictions</span>
//             </div>

//             <div className="flex items-center gap-3">
//               <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
//                 ✓
//               </div>
//               <span>Personalized savings goals</span>
//             </div>

//             <div className="flex items-center gap-3">
//               <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
//                 ✓
//               </div>
//               <span>Bank-grade security</span>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Auth;

import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Sparkle, Mail, Lock, User, Eye, EyeOff } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import axios from "axios";
import { GoogleLogin } from "@react-oauth/google";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Basic validation
    if (!isLogin && !formData.username) {
      toast({
        title: "Error",
        description: "Please enter your name",
        variant: "destructive",
      });
      return;
    }

    if (!formData.email || !formData.password) {
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

    // Password validation
    if (formData.password.length < 8) {
      toast({
        title: "Error",
        description: "Password must be at least 8 characters",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      if (isLogin) {
        // LOGIN API
        const res = await axios.post(
          "http://127.0.0.1:8000/auth/login",
          new URLSearchParams({
            username: formData.email,
            password: formData.password,
          }),
          {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
          }
        );

        localStorage.setItem("access_token", res.data.access_token);

        toast({
          title: "Welcome back!",
          description: "You have successfully logged in.",
        });

        // Use React Router navigation instead
        window.location.href = "/";
      } else {
        // SIGNUP API
        const res = await axios.post("http://127.0.0.1:8000/auth/signup", {
          username: formData.username,
          email: formData.email,
          password: formData.password,
        });

        localStorage.setItem("access_token", res.data.access_token);

        toast({
          title: "Account created!",
          description: "Your account was successfully created.",
        });

        window.location.href = "/";
      }
    } catch (err: any) {
      console.error("Auth error:", err);
      toast({
        title: "Error",
        description:
          err?.response?.data?.detail ||
          err?.response?.data?.message ||
          "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSuccess = async (credentialResponse: any) => {
    if (!credentialResponse.credential) {
      toast({
        title: "Google Login Failed",
        description: "No credential received from Google.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      const res = await axios.post(
        "http://127.0.0.1:8000/auth/google",
        {
          credential: credentialResponse.credential,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      localStorage.setItem("access_token", res.data.access_token);

      toast({
        title: "Logged in with Google!",
        description: "Welcome to FinTrack AI.",
      });

      window.location.href = "/";
    } catch (err: any) {
      console.error("Google auth error:", err);
      toast({
        title: "Google Login Failed",
        description:
          err?.response?.data?.detail ||
          err?.response?.data?.message ||
          "Unable to authenticate with Google. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleError = () => {
    toast({
      title: "Google Login Failed",
      description: "Unable to connect to Google. Please try again.",
      variant: "destructive",
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md animate-slide-up">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 mb-8">
            <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center shadow-soft">
              <img src="/NoBg.png" alt="logo" className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              FinTrack AI
            </span>
          </Link>

          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">
              {isLogin ? "Welcome Back" : "Create Account"}
            </h1>
            <p className="text-muted-foreground">
              {isLogin
                ? "Enter your credentials to access your account"
                : "Sign up to start managing your finances smartly"}
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {!isLogin && (
              <div className="space-y-2">
                <Label htmlFor="username">Full Name</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    id="username"
                    name="username"
                    type="text"
                    placeholder="John Doe"
                    className="pl-10"
                    value={formData.username}
                    onChange={handleChange}
                    disabled={isLoading}
                  />
                </div>
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="name@example.com"
                  className="pl-10"
                  value={formData.email}
                  onChange={handleChange}
                  disabled={isLoading}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className="pl-10 pr-10"
                  value={formData.password}
                  onChange={handleChange}
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  disabled={isLoading}
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
              {!isLogin && (
                <p className="text-xs text-muted-foreground">
                  Must be at least 8 characters
                </p>
              )}
            </div>

            {isLogin && (
              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 text-sm">
                  <input type="checkbox" className="rounded" />
                  <span className="text-muted-foreground">Remember me</span>
                </label>
                <a href="#" className="text-sm text-primary hover:underline">
                  Forgot password?
                </a>
              </div>
            )}

            <Button
              type="submit"
              variant="hero"
              size="lg"
              className="w-full"
              disabled={isLoading}
            >
              {isLoading
                ? "Please wait..."
                : isLogin
                ? "Sign In"
                : "Create Account"}
            </Button>
          </form>

          {/* Divider */}
          <div className="my-6 flex items-center gap-4">
            <div className="flex-1 h-px bg-border"></div>
            <span className="text-sm text-muted-foreground">or</span>
            <div className="flex-1 h-px bg-border"></div>
          </div>

          {/* Social Login */}
          <div className="w-full flex justify-center">
            <GoogleLogin
              onSuccess={handleGoogleSuccess}
              onError={handleGoogleError}
              useOneTap={false}
              theme="outline"
              size="large"
              text={isLogin ? "signin_with" : "signup_with"}
              width="384"
            />
          </div>

          {/* Toggle */}
          <p className="text-center text-sm text-muted-foreground mt-6">
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <button
              type="button"
              onClick={() => {
                setIsLogin(!isLogin);
                setFormData({ username: "", email: "", password: "" });
              }}
              className="text-primary hover:underline font-medium"
              disabled={isLoading}
            >
              {isLogin ? "Sign up" : "Sign in"}
            </button>
          </p>
        </div>
      </div>

      {/* Right Side - Hero */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-primary via-accent to-secondary items-center justify-center p-12 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-64 h-64 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-white rounded-full blur-3xl"></div>
        </div>

        <div className="relative z-10 text-white max-w-lg">
          <h2 className="text-4xl font-bold mb-6 animate-slide-up">
            Take Control of Your Financial Future
          </h2>
          <p className="text-lg text-white/90 mb-8 animate-fade-in">
            Join thousands of users who are already making smarter financial
            decisions with AI-powered insights.
          </p>

          <div
            className="space-y-4 animate-fade-in"
            style={{ animationDelay: "0.3s" }}
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                ✓
              </div>
              <span>Smart expense tracking & categorization</span>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                ✓
              </div>
              <span>AI-powered spending predictions</span>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                ✓
              </div>
              <span>Personalized savings goals</span>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                ✓
              </div>
              <span>Bank-grade security</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;