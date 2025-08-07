"use client";
import Image from "next/image";
import Link from "next/link";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useUser } from "@/components/UserProvider";
import { useRouter } from "next/navigation";
import React from "react";
import { AuthModal } from "@/components/AuthModal";
import {
  Sparkles,
  Star,
  Rocket,
  Zap,
  Heart,
  Smile,
  Handshake,
  ThumbsUp,
  Laugh,
  User,
  Sun,
  Moon,
  MessageCircle,
  Feather,
  Quote,
} from "lucide-react";

export default function Landing() {
  const { user, loading } = useUser();
  const router = useRouter();
  const [authOpen, setAuthOpen] = React.useState(false);
  const [isLogin, setIsLogin] = React.useState(true);

  // Redirect logged-in users to /app
  React.useEffect(() => {
    if (user && !loading) {
      router.replace("/app");
    }
  }, [user, loading, router]);

  const openLogin = () => {
    setIsLogin(true);
    setAuthOpen(true);
  };
  const openSignup = () => {
    setIsLogin(false);
    setAuthOpen(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 flex flex-col">
      {/* Header */}
      <header className="w-full flex items-center justify-between px-8 py-6 z-50">
        <div className="flex items-center space-x-3">
          <span className="text-3xl md:text-4xl font-calligraphy text-gradient drop-shadow-lg select-none">
            Tonaire
          </span>
        </div>
        <div className="flex items-center gap-4">
          <ThemeToggle />
          <Button
            className="font-cool px-6 py-2 rounded-full shadow-md gradient-tonaire text-white text-base hover:scale-105 transition-transform"
            onClick={openLogin}
            disabled={loading}
          >
            Login
          </Button>
          <Button
            className="font-cool px-6 py-2 rounded-full shadow-md border border-primary text-primary text-base hover:scale-105 transition-transform bg-transparent"
            onClick={openSignup}
            disabled={loading}
          >
            Sign Up
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 pt-8 pb-16">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-5xl md:text-7xl font-calligraphy text-gradient font-bold mb-6 text-center drop-shadow-xl"
        >
          Say It Your Way.
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-lg md:text-2xl font-cool text-muted-foreground mb-10 text-center max-w-2xl"
        >
          Your AI-powered tone stylist for emails, texts, and social posts.
          Effortlessly rewrite anything in the perfect vibe.
        </motion.p>
        <TonaireWingsAnimated />

        {/* Features Section */}
        <section className="w-full max-w-4xl mx-auto grid md:grid-cols-3 gap-8 mb-20">
          <motion.div
            whileHover={{ y: -6, scale: 1.03 }}
            className="rounded-2xl bg-card/70 border border-border/30 p-8 shadow-lg flex flex-col items-center text-center transition-all"
          >
            <span className="text-3xl mb-3">✨</span>
            <h3 className="font-cool text-xl font-semibold mb-2">
              Rewrite Anything
            </h3>
            <p className="text-sm text-muted-foreground font-cool">
              Emails, DMs, posts—instantly rephrase in any tone: professional,
              casual, funny, and more.
            </p>
          </motion.div>
          <motion.div
            whileHover={{ y: -6, scale: 1.03 }}
            className="rounded-2xl bg-card/70 border border-border/30 p-8 shadow-lg flex flex-col items-center text-center transition-all"
          >
            <span className="text-3xl mb-3">🎨</span>
            <h3 className="font-cool text-xl font-semibold mb-2">
              Aesthetic Output
            </h3>
            <p className="text-sm text-muted-foreground font-cool">
              Get beautifully styled, ready-to-post content for LinkedIn,
              Twitter, and Instagram.
            </p>
          </motion.div>
          <motion.div
            whileHover={{ y: -6, scale: 1.03 }}
            className="rounded-2xl bg-card/70 border border-border/30 p-8 shadow-lg flex flex-col items-center text-center transition-all"
          >
            <span className="text-3xl mb-3">⚡️</span>
            <h3 className="font-cool text-xl font-semibold mb-2">
              Instant & Effortless
            </h3>
            <p className="text-sm text-muted-foreground font-cool">
              No overthinking. Just paste, pick a vibe, and go. Save time, sound
              amazing.
            </p>
          </motion.div>
        </section>

        {/* Benefits & Audience Section */}
        <section className="w-full max-w-3xl mx-auto mb-24 grid md:grid-cols-2 gap-10">
          <div className="rounded-2xl bg-muted/40 p-8 shadow-md">
            <h4 className="font-cool text-lg font-semibold mb-2">
              Who is it for?
            </h4>
            <ul className="list-disc pl-5 text-muted-foreground font-cool text-sm space-y-1">
              <li>Students & professionals</li>
              <li>Content creators & marketers</li>
              <li>Anyone who wants to sound their best</li>
            </ul>
          </div>
          <div className="rounded-2xl bg-muted/40 p-8 shadow-md">
            <h4 className="font-cool text-lg font-semibold mb-2">
              Why Tonaire?
            </h4>
            <ul className="list-disc pl-5 text-muted-foreground font-cool text-sm space-y-1">
              <li>Premium, minimal design</li>
              <li>AI-powered, always on vibe</li>
              <li>Light & dark mode for every mood</li>
            </ul>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="w-full py-8 border-t border-border/30 mt-auto">
        <div className="max-w-4xl mx-auto px-4 flex flex-col items-center">
          <span className="font-calligraphy text-2xl text-gradient mb-2">
            Tonaire
          </span>
          <p className="text-xs text-muted-foreground font-cool mb-2">
            Because every word deserves the perfect vibe ✨
          </p>
          <div className="flex items-center gap-4 text-xs text-muted-foreground font-cool">
            <span>Made with 💜 for creators</span>
            <span>•</span>
            <span>Powered by OpenAI</span>
            <span>•</span>
            <span>Built with Next.js</span>
          </div>
        </div>
      </footer>
      <AuthModal
        open={authOpen}
        onOpenChange={setAuthOpen}
        initialMode={isLogin ? "login" : "signup"}
      />
    </div>
  );
}

// TonaireHeroGrid: premium, magical, animated grid for Tonaire
function TonaireWingsAnimated() {
  return (
    <div className="relative flex items-center justify-center w-full max-w-3xl mx-auto mb-16">
      {/* Glowing background */}
      <div className="absolute inset-0 blur-2xl bg-gradient-to-tr from-tonaire-rose/30 via-tonaire-gold/20 to-tonaire-plum/30 opacity-80" />
      <motion.svg
        width="700"
        height="350"
        viewBox="0 0 700 350"
        fill="none"
        initial={{ scale: 0.98, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1, delay: 0.2 }}
        className="relative z-10"
      >
        <defs>
          <linearGradient
            id="wingGradient"
            x1="0"
            y1="0"
            x2="700"
            y2="0"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#F472B6" /> {/* tonaire-rose */}
            <stop offset="0.5" stopColor="#FDE68A" /> {/* tonaire-gold */}
            <stop offset="1" stopColor="#A78BFA" /> {/* tonaire-plum */}
          </linearGradient>
          <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="8" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        {/* Left wing */}
        <motion.path
          d="M350,175 Q200,50 100,175 Q200,300 350,175 Q250,250 150,300"
          stroke="url(#wingGradient)"
          strokeWidth="8"
          fill="none"
          filter="url(#glow)"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.5, delay: 0.3 }}
        />
        {/* Right wing (mirrored) */}
        <motion.path
          d="M350,175 Q500,50 600,175 Q500,300 350,175 Q450,250 550,300"
          stroke="url(#wingGradient)"
          strokeWidth="8"
          fill="none"
          filter="url(#glow)"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.5, delay: 0.3 }}
        />
      </motion.svg>
    </div>
  );
}
