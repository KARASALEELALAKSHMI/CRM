import { useRouter } from "next/router";
import Image from "next/image";
import { useState } from "react";
import { supabase } from "../lib/supabaseClient";

export default function Login() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [resetMessage, setResetMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setResetMessage("");

    const email = e.target.email.value;
    const password = e.target.password.value;

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError("Invalid email or password");
    } else {
      router.push("/home");
    }
  };

  const handleForgotPassword = async () => {
    setError("");
    setResetMessage("");

    const email = document.querySelector("input[name='email']").value;

    if (!email) {
      setError("Please enter your email first");
      return;
    }

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`, // page you’ll create
    });

    if (error) {
      setError("Failed to send reset link. Try again.");
    } else {
      setResetMessage("Password reset link sent to your email.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="bg-white shadow-md rounded-xl p-8 w-full max-w-md">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <Image
            src="/VOLTECO LOGO.png"
            alt="Volteco Dynamics Logo"
            width={120}
            height={40}
            className="object-contain"
          />
        </div>

        {/* Info box */}
        <div className="bg-blue-100 text-gray-700 text-sm rounded-md p-3 mb-6 text-center">
          Access and manage your documents and databases
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              name="email"
              type="email"
              autoComplete="off"
              placeholder="Enter your email"
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <div className="relative">
              <input
                name="password"
                type={passwordVisible ? "text" : "password"}
                autoComplete="new-password"
                placeholder="Enter your password"
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 pr-10"
                required
              />
              <button
                type="button"
                onClick={() => setPasswordVisible(!passwordVisible)}
                className="absolute inset-y-0 right-2 flex items-center text-gray-500"
              >
                {passwordVisible ? "🙈" : "👁️"}
              </button>
            </div>
            <div className="text-right mt-1">
              <button
                type="button"
                onClick={handleForgotPassword}
                className="text-sm text-blue-600 hover:underline"
              >
                Forgotten?
              </button>
            </div>
          </div>

          {/* Show error */}
          {error && <p className="text-red-600 text-sm">{error}</p>}
          {resetMessage && (
            <p className="text-green-600 text-sm">{resetMessage}</p>
          )}

          {/* Button */}
          <button
  type="submit"
  className="w-full text-white py-2 px-4 rounded-md transition duration-300 transform hover:scale-105 hover:shadow-lg cursor-pointer"
  style={{ backgroundColor: "#004F8C" }}
>
  SIGN IN
</button>

        </form>
      </div>
    </div>
  );
}
