import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../services/userService.js";

export default function Sign({ setUser }) {
  const [name, setName] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      const res = await login({ name });
      setUser(res.data);
      
      // route based on user role
      if (res.data?.role === "admin") {
        navigate("/admin/dashboard");
      } else {
        navigate("/staff/dashboard");
      }
    } catch (err) {
      setError(err.response?.data?.message || "User not found");
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl border border-gray-200 shadow-sm space-y-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900">Sign In</h2>
          <p className="text-sm text-gray-500">Enter your name to continue</p>
        </div>

        {error && (
          <div className="p-3 bg-red-50 text-red-600 rounded-lg text-xs font-semibold">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">
              Full Name
            </label>
            <input
              type="text"
              required
              placeholder="e.g. John Doe"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2.5 rounded-lg text-sm transition-colors cursor-pointer"
          >
            Sign In
          </button>
        </form>

        <p className="text-xs text-center text-gray-500">
          Don't have an account?{" "}
          <Link to="/signup" className="text-orange-600 font-semibold hover:underline">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}