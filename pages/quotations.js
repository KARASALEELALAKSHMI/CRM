import { useEffect, useState } from "react";
import Image from "next/image";
import { supabase } from "../lib/supabaseClient";

export default function Quotations() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [quotations, setQuotations] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      // Fetch logged-in user
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (session) {
        setUser(session.user);

        //Example fetch quotations table from Supabase
        const { data, error } = await supabase
          .from("quotations") // <-- make sure your table exists
          .select("*")
          .order("created_at", { ascending: false });

        if (!error) {
          setQuotations(data);
        }
      }
      setLoading(false);
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Loading...</p>
      </div>
    );
  }

  if (!user) {
    return <p className="text-center mt-10">Please login to view quotations.</p>;
  }

  return (
    <div className="p-6">
      {/* Header with Search + Actions */}
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-xl font-bold">Quotations</h1>
        <div className="flex gap-2">
          <button className="bg-purple-700 text-white px-4 py-2 rounded-md hover:bg-purple-800">
            New
          </button>
          <button className="bg-gray-200 px-4 py-2 rounded-md hover:bg-gray-300">
            Upload
          </button>
          <input
            type="text"
            placeholder="Search..."
            className="border rounded-md px-3 py-2 ml-2"
          />
        </div>
      </div>

      {/* Quotations Table */}
      <div className="overflow-x-auto bg-white shadow rounded-lg">
        <table className="w-full text-sm text-left border-collapse">
          <thead className="bg-gray-100 border-b">
            <tr>
              <th className="px-4 py-3">Number</th>
              <th className="px-4 py-3">Creation Date</th>
              <th className="px-4 py-3">Customer</th>
              <th className="px-4 py-3">Salesperson</th>
              <th className="px-4 py-3">Total</th>
              <th className="px-4 py-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {quotations.length > 0 ? (
              quotations.map((q) => (
                <tr key={q.id} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-3 font-semibold text-blue-600">
                    {q.number}
                  </td>
                  <td className="px-4 py-3">
                    {new Date(q.created_at).toLocaleString()}
                  </td>
                  <td className="px-4 py-3">{q.customer}</td>
                  <td className="px-4 py-3 flex items-center gap-2">
                    <Image
                      src="/VOLTECO LOGO.png"
                      alt="Salesperson"
                      width={24}
                      height={24}
                    />
                    <span>{q.salesperson}</span>
                  </td>
                  <td className="px-4 py-3 font-medium">
                    ₹ {q.total?.toLocaleString("en-IN")}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`px-3 py-1 text-xs font-medium rounded-full ${
                        q.status === "Quotation"
                          ? "bg-blue-100 text-blue-700"
                          : "bg-green-100 text-green-700"
                      }`}
                    >
                      {q.status}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="px-4 py-6 text-center text-gray-500">
                  No quotations found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
