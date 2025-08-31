"use client";
import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function Auth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignup = async () => {
    setLoading(true);
    const { error } = await supabase.auth.signUp({ email, password });
    setLoading(false);
    if (error) alert(error.message);
    else alert("Check your email for confirmation!");
  };

  const handleLogin = async () => {
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (error) alert(error.message);
    else alert("Logged in!");
  };

  const handleGoogleLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({ provider: "google" });
    if (error) alert(error.message);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", width: 300, margin: "auto", gap: 10 }}>
      <h2>Login / Signup</h2>
      <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button onClick={handleSignup} disabled={loading}>Sign Up</button>
      <button onClick={handleLogin} disabled={loading}>Login</button>
      <hr />
      <button onClick={handleGoogleLogin}>Sign in with Google</button>
    </div>
  );
}
