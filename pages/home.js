import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { supabase } from "../lib/supabaseClient";

export default function HomePage() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const checkSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) {
        router.push("/login"); // redirect if not logged in
      } else {
        setUser(session.user);
      }
      setLoading(false);
    };

    checkSession();
  }, [router]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Loading...</p>
      </div>
    );
  }

  if (!user) return null; // don’t flash content before redirect

  return (
    <div className="min-h-screen bg-green-50 p-10">
      <h1 className="text-2xl font-bold mb-6 text-center">
        Welcome, {user.email} 🎉
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
        {/* Customers */}
        <div className="bg-white shadow-md rounded-xl p-6 w-64 h-40 flex flex-col items-center justify-center hover:shadow-lg transition">
          <span className="text-3xl mb-2">👥</span>
          <h2 className="text-lg font-semibold">Customers</h2>
          <p className="text-xs text-gray-500 mt-1 text-center">
            Manage customer details
          </p>
        </div>

        {/* Employees */}
        <div className="bg-white shadow-md rounded-xl p-6 w-64 h-40 flex flex-col items-center justify-center hover:shadow-lg transition">
          <span className="text-3xl mb-2">💼</span>
          <h2 className="text-lg font-semibold">Employees</h2>
          <p className="text-xs text-gray-500 mt-1 text-center">
            Track employee info
          </p>
        </div>

        {/* Quotations */}
        <div className="bg-white shadow-md rounded-xl p-6 w-64 h-40 flex flex-col items-center justify-center hover:shadow-lg transition">
          <span className="text-3xl mb-2">📋</span>
          <h2 className="text-lg font-semibold">Quotations</h2>
          <p className="text-xs text-gray-500 mt-1 text-center">
            Prepare and manage quotations
          </p>
        </div>

        {/* Invoices */}
        <div className="bg-white shadow-md rounded-xl p-6 w-64 h-40 flex flex-col items-center justify-center hover:shadow-lg transition">
          <span className="text-3xl mb-2">📄</span>
          <h2 className="text-lg font-semibold">Invoices</h2>
          <p className="text-xs text-gray-500 mt-1 text-center">
            Track billing and payments
          </p>
        </div>

        {/* Expenses */}
        <div className="bg-white shadow-md rounded-xl p-6 w-64 h-40 flex flex-col items-center justify-center hover:shadow-lg transition">
          <span className="text-3xl mb-2">💵</span>
          <h2 className="text-lg font-semibold">Expenses</h2>
          <p className="text-xs text-gray-500 mt-1 text-center">
            Log and approve expenses
          </p>
        </div>

        {/* Documents */}
        <div className="bg-white shadow-md rounded-xl p-6 w-64 h-40 flex flex-col items-center justify-center hover:shadow-lg transition">
          <span className="text-3xl mb-2">📂</span>
          <h2 className="text-lg font-semibold">Documents</h2>
          <p className="text-xs text-gray-500 mt-1 text-center">
            Store and manage documents
          </p>
        </div>
      </div>
    </div>
  );
}
