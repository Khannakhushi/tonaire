"use client";

import React, { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
} from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useUser } from "./UserProvider";
import { FcGoogle } from "react-icons/fc";

export function AuthModal({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const { loginWithGoogle, loginWithEmail, signupWithEmail } = useUser();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleGoogle = async () => {
    setLoading(true);
    setError("");
    try {
      await loginWithGoogle();
      onOpenChange(false);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  const handleEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      if (isLogin) {
        await loginWithEmail(email, password);
      } else {
        await signupWithEmail(email, password, displayName);
      }
      onOpenChange(false);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="right"
        className="max-w-md w-full bg-gradient-to-br from-background via-background to-muted/30 border-none shadow-2xl"
      >
        <SheetHeader>
          <SheetTitle className="text-2xl font-heading text-gradient mb-2">
            {isLogin ? "Welcome back!" : "Create your account"}
          </SheetTitle>
        </SheetHeader>
        <div className="space-y-6 p-4">
          <Button
            onClick={handleGoogle}
            variant="outline"
            className="w-full flex items-center justify-center gap-2 font-body text-base"
          >
            <FcGoogle className="h-5 w-5" /> Continue with Google
          </Button>
          <div className="flex items-center gap-2 text-muted-foreground">
            <span className="flex-1 border-t border-border/30" />
            <span className="text-xs font-body">or</span>
            <span className="flex-1 border-t border-border/30" />
          </div>
          <form onSubmit={handleEmail} className="space-y-4">
            {!isLogin && (
              <Input
                placeholder="Name"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                required
                className="font-body"
              />
            )}
            <Input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="font-body"
            />
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="font-body"
            />
            {error && (
              <div className="text-destructive text-xs font-body">{error}</div>
            )}
            <Button
              type="submit"
              className="w-full gradient-tonaire text-white font-body text-base"
              disabled={loading}
            >
              {loading
                ? isLogin
                  ? "Logging in..."
                  : "Signing up..."
                : isLogin
                ? "Login"
                : "Sign up"}
            </Button>
          </form>
          <div className="text-center text-sm font-body">
            {isLogin ? (
              <>
                New here?{" "}
                <button
                  type="button"
                  className="text-primary underline"
                  onClick={() => setIsLogin(false)}
                >
                  Create an account
                </button>
              </>
            ) : (
              <>
                Already have an account?{" "}
                <button
                  type="button"
                  className="text-primary underline"
                  onClick={() => setIsLogin(true)}
                >
                  Login
                </button>
              </>
            )}
          </div>
        </div>
        <SheetFooter />
      </SheetContent>
    </Sheet>
  );
}
