"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { supabase } from "@/utils/supabaseClient";

const AuthForm = () => {
  const [isNewUser, setIsNewUser] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [isSigningUp, setIsSigningUp] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
  };
  const handleSignUp = async (e) => {
    e.preventDefault();
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });
    if (!error) {
      setIsSigningUp(true);
    }
    console.log({ data, error });
  };

  let signInMessage = "Sign in to your account";

  if (isSigningIn) {
    signInMessage = "Signing In";
  } else if (isNewUser) {
    signInMessage = "Create an account";
  }
  return (
    <form onSubmit={isNewUser ? handleSignUp : handleLogin}>
      <Card className="mx-auto max-w-sm">
        {isNewUser ? (
          <>
            <CardHeader>
              <CardTitle className="text-xl">Sign Up</CardTitle>
              <CardDescription>
                Enter your information to create an account
              </CardDescription>
            </CardHeader>
          </>
        ) : (
          <>
            <CardHeader>
              <CardTitle className="text-xl">Sign In</CardTitle>
              <CardDescription>
                Enter your information to sign in
              </CardDescription>
            </CardHeader>
          </>
        )}

        <CardContent>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="m@example.com"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <Button type="submit" className="w-full">
              {signInMessage}
            </Button>
          </div>
          <div className="mt-4 text-center text-sm">
            {isNewUser ? (
              <>
                Already have an account?{" "}
                <Button
                  type="button"
                  variant="link"
                  onClick={() => setIsNewUser(false)}
                  className="underline"
                >
                  Sign in
                </Button>
              </>
            ) : (
              <>
                Don't have an account?{" "}
                <Button
                  type="button"
                  variant="link"
                  className="underline"
                  onClick={() => setIsNewUser(true)}
                >
                  Sign up
                </Button>
              </>
            )}
          </div>
        </CardContent>
      </Card>
    </form>
  );
};

export default AuthForm;
