"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Copy,
  Sparkles,
  Wind,
  MessageCircle,
  Linkedin,
  Twitter,
  Instagram,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ThemeToggle } from "@/components/ThemeToggle";
import { AuthModal } from "@/components/AuthModal";
import { useUser } from "@/components/UserProvider";
import { db } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { useCollection } from "react-firebase-hooks/firestore";
import Link from "next/link";

const toneOptions = {
  rephrase: [
    { value: "professional", label: "Professional", emoji: "💼" },
    { value: "casual", label: "Casual", emoji: "😊" },
    { value: "funny", label: "Funny", emoji: "😄" },
    { value: "emotional", label: "Emotional", emoji: "💖" },
    { value: "assertive", label: "Assertive", emoji: "💪" },
    { value: "friendly", label: "Friendly", emoji: "🤗" },
  ],
  linkedin: [
    { value: "empowering", label: "Empowering", emoji: "🚀" },
    { value: "professional", label: "Professional", emoji: "💼" },
    { value: "thankful", label: "Thankful", emoji: "🙏" },
    { value: "inspiring", label: "Inspiring", emoji: "✨" },
    { value: "humblebrag", label: "Humblebrag", emoji: "😌" },
  ],
  twitter: [
    { value: "funny", label: "Funny", emoji: "😂" },
    { value: "confident", label: "Confident", emoji: "💯" },
    { value: "relatable", label: "Relatable", emoji: "🤝" },
    { value: "witty", label: "Witty", emoji: "🧠" },
    { value: "hype", label: "Hype", emoji: "🔥" },
  ],
  instagram: [
    { value: "aesthetic", label: "Aesthetic", emoji: "🌸" },
    { value: "chill", label: "Chill", emoji: "😌" },
    { value: "soft", label: "Soft", emoji: "🤍" },
    { value: "motivational", label: "Motivational", emoji: "💪" },
    { value: "humorous", label: "Humorous", emoji: "😆" },
  ],
};

// Cute greetings for logged-in users
const greetings = [
  "Hey there",
  "Welcome back",
  "Yay, you're here",
  "Hello sunshine",
  "Good to see you",
  "What's up",
  "You look awesome",
  "Glad you're here",
  "Hey superstar",
  "Hey legend",
  "Hey rockstar",
  "Hey friend",
  "Hey cutie",
  "Hey cool human",
  "Hey creative soul",
  "Hey, let's vibe!",
  "Ready to style some words?",
  "Let's make magic!",
  "Let's get creative!",
];

export default function Home() {
  const { user, loading, logout } = useUser();
  const [authOpen, setAuthOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("rephrase");
  const [inputText, setInputText] = useState("");
  const [selectedTone, setSelectedTone] = useState("");
  const [output, setOutput] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [greeting, setGreeting] = useState("");

  useEffect(() => {
    if (!loading && !user) {
      setAuthOpen(true);
    }
  }, [user, loading]);

  useEffect(() => {
    if (user) {
      setGreeting(greetings[Math.floor(Math.random() * greetings.length)]);
    }
  }, [user]);

  const handleGenerate = async () => {
    if (!inputText.trim() || !selectedTone || !user) {
      if (!user) setAuthOpen(true);
      return;
    }
    setIsGenerating(true);
    setOutput("");
    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          inputText,
          tone: selectedTone,
          contentType: activeTab,
        }),
      });
      let data;
      try {
        data = await response.json();
      } catch (e) {
        throw new Error("Invalid server response");
      }
      if (!response.ok) {
        throw new Error(data?.error || "Failed to generate content");
      }
      setOutput(data.content);
      // Store prompt in Firestore
      await addDoc(collection(db, `users/${user.uid}/prompts`), {
        prompt: inputText,
        type: activeTab,
        category: selectedTone,
        generation: data.content,
        createdAt: serverTimestamp(),
      });
    } catch (error: any) {
      setOutput(error.message || "Failed to generate content");
    } finally {
      setIsGenerating(false);
    }
  };

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(output);
  };

  const currentTones = toneOptions[activeTab as keyof typeof toneOptions] || [];

  const promptsRef = user ? collection(db, `users/${user.uid}/prompts`) : null;
  const [promptsSnapshot, loadingPrompts, errorPrompts] = useCollection(
    promptsRef ? promptsRef : undefined,
    { snapshotListenOptions: { includeMetadataChanges: true } }
  );
  const prompts = promptsSnapshot
    ? promptsSnapshot.docs
        .map((doc) => ({ id: doc.id, ...doc.data() }))
        .sort(
          (a, b) => (b.createdAt?.seconds || 0) - (a.createdAt?.seconds || 0)
        )
    : [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      {/* Header */}
      <header className="border-b border-border/40 backdrop-blur-sm bg-background/80 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center space-x-3"
          >
            <div className="h-8 w-8 rounded-full gradient-tonaire flex items-center justify-center">
              <Wind className="h-4 w-4 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-heading font-bold text-gradient">
                Tonaire
              </h1>
              <p className="text-xs text-muted-foreground font-body">
                Say it your way
              </p>
              {user && (
                <span className="block text-sm font-body text-primary mt-1 animate-fade-in">
                  {greeting},{" "}
                  {user.displayName ||
                    (user.email ? user.email.split("@")[0] : "there")}
                  !
                </span>
              )}
            </div>
          </motion.div>
          <div className="flex items-center gap-4">
            <ThemeToggle />
            {user && (
              <>
                <Button
                  asChild
                  variant="outline"
                  size="sm"
                  className="font-body"
                >
                  <Link href="/prompt-history">Prompt History</Link>
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={logout}
                  className="font-body"
                >
                  Logout
                </Button>
              </>
            )}
          </div>
        </div>
      </header>
      <AuthModal open={authOpen} onOpenChange={setAuthOpen} />

      <main className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-center mb-8"
        >
          <h2 className="text-4xl md:text-5xl font-heading font-bold mb-4 text-gradient">
            Your AI-Powered Tone Stylist
          </h2>
          <p className="text-lg text-muted-foreground font-body max-w-2xl mx-auto">
            Rephrase anything, create stunning social posts, and write with
            perfect tone — like having a cooler, smarter version of you.
          </p>
        </motion.div>

        {/* Main Interface */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="backdrop-blur-sm bg-card/80 border-border/50 shadow-xl">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center space-x-2 font-heading">
                <Sparkles className="h-5 w-5 text-primary" />
                <span>Choose what you want to do</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs
                value={activeTab}
                onValueChange={setActiveTab}
                className="w-full"
              >
                <TabsList className="grid w-full grid-cols-4 mb-6">
                  <TabsTrigger value="rephrase" className="font-body">
                    <MessageCircle className="h-4 w-4 mr-1" />
                    Rephrase
                  </TabsTrigger>
                  <TabsTrigger value="linkedin" className="font-body">
                    <Linkedin className="h-4 w-4 mr-1" />
                    LinkedIn
                  </TabsTrigger>
                  <TabsTrigger value="twitter" className="font-body">
                    <Twitter className="h-4 w-4 mr-1" />
                    Twitter
                  </TabsTrigger>
                  <TabsTrigger value="instagram" className="font-body">
                    <Instagram className="h-4 w-4 mr-1" />
                    Instagram
                  </TabsTrigger>
                </TabsList>

                <div className="space-y-6">
                  {/* Input Section */}
                  <div className="space-y-2">
                    <Label
                      htmlFor="input"
                      className="font-body text-sm font-medium"
                    >
                      {activeTab === "rephrase"
                        ? "Enter text to rephrase"
                        : "Describe your post idea"}
                    </Label>
                    <Textarea
                      id="input"
                      placeholder={
                        activeTab === "rephrase"
                          ? "Just checking on that thing..."
                          : "Got an internship at Meta!"
                      }
                      value={inputText}
                      onChange={(e) => setInputText(e.target.value)}
                      className="min-h-[100px] font-body resize-none"
                    />
                  </div>

                  {/* Tone Selection */}
                  <div className="space-y-3">
                    <Label className="font-body text-sm font-medium">
                      Select tone
                    </Label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                      {currentTones.map((tone) => (
                        <Button
                          key={tone.value}
                          variant={
                            selectedTone === tone.value ? "default" : "outline"
                          }
                          className="justify-start font-body"
                          onClick={() => setSelectedTone(tone.value)}
                        >
                          <span className="mr-2">{tone.emoji}</span>
                          {tone.label}
                        </Button>
                      ))}
                    </div>
                  </div>

                  {/* Generate Button */}
                  <Button
                    onClick={handleGenerate}
                    disabled={
                      !inputText.trim() ||
                      !selectedTone ||
                      isGenerating ||
                      !user
                    }
                    className="w-full gradient-tonaire text-white font-body font-medium py-6 text-lg"
                  >
                    {isGenerating ? (
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{
                          duration: 1,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                        className="mr-2"
                      >
                        <Sparkles className="h-5 w-5" />
                      </motion.div>
                    ) : (
                      <Sparkles className="h-5 w-5 mr-2" />
                    )}
                    {isGenerating
                      ? "Generating..."
                      : user
                      ? "Generate ✨"
                      : "Login to Generate"}
                  </Button>

                  {/* Output Section */}
                  <AnimatePresence>
                    {output && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="space-y-3"
                      >
                        <div className="flex items-center justify-between">
                          <Label className="font-body text-sm font-medium">
                            Generated content
                          </Label>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={copyToClipboard}
                            className="font-body"
                          >
                            <Copy className="h-4 w-4 mr-1" />
                            Copy
                          </Button>
                        </div>
                        <Card className="bg-muted/30 border-border/30">
                          <CardContent className="p-4">
                            <p className="font-body whitespace-pre-wrap leading-relaxed">
                              {output}
                            </p>
                          </CardContent>
                        </Card>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </Tabs>
            </CardContent>
          </Card>
        </motion.div>

        {/* Features Preview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-12 grid md:grid-cols-3 gap-6"
        >
          <Card className="bg-card/50 border-border/30 hover:bg-card/80 transition-colors">
            <CardContent className="p-6 text-center">
              <MessageCircle className="h-8 w-8 text-primary mx-auto mb-3" />
              <h3 className="font-heading font-semibold mb-2">
                Smart Rephrasing
              </h3>
              <p className="text-sm text-muted-foreground font-body">
                Transform any text into the perfect tone for any situation
              </p>
            </CardContent>
          </Card>

          <Card className="bg-card/50 border-border/30 hover:bg-card/80 transition-colors">
            <CardContent className="p-6 text-center">
              <Sparkles className="h-8 w-8 text-primary mx-auto mb-3" />
              <h3 className="font-heading font-semibold mb-2">
                Social Post Magic
              </h3>
              <p className="text-sm text-muted-foreground font-body">
                Generate engaging content for LinkedIn, Twitter, and Instagram
              </p>
            </CardContent>
          </Card>

          <Card className="bg-card/50 border-border/30 hover:bg-card/80 transition-colors">
            <CardContent className="p-6 text-center">
              <Wind className="h-8 w-8 text-primary mx-auto mb-3" />
              <h3 className="font-heading font-semibold mb-2">
                Tone Perfection
              </h3>
              <p className="text-sm text-muted-foreground font-body">
                From professional to playful — nail the vibe every time
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border/30 mt-16">
        <div className="container mx-auto px-4 py-8 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="text-center"
          >
            <div className="flex items-center justify-center space-x-3 mb-4">
              <div className="h-6 w-6 rounded-full gradient-tonaire flex items-center justify-center">
                <Wind className="h-3 w-3 text-white" />
              </div>
              <span className="text-lg font-heading font-semibold text-gradient">
                Tonaire
              </span>
            </div>
            <p className="text-sm text-muted-foreground font-body mb-4">
              Because every word deserves the perfect vibe ✨
            </p>
            <div className="flex items-center justify-center space-x-6 text-xs text-muted-foreground font-body">
              <span>Made with 💜 for creators</span>
              <span>•</span>
              <span>Powered by OpenAI</span>
              <span>•</span>
              <span>Built with Next.js</span>
            </div>
          </motion.div>
        </div>
      </footer>
    </div>
  );
}
