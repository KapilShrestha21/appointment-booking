import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { register } from "../services/userService.js";

export default function Signup() {
  const [formData, setFormData] = useState({ name: "", role: "staff" });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      await register(formData);
      navigate("/signin");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl border border-gray-200 shadow-sm space-y-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900">Create Account</h2>
          <p className="text-sm text-gray-500">Sign up to manage appointments</p>
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
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">
              Role
            </label>
            <select
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-orange-500 focus:border-orange-500 bg-white"
              value={formData.role}
              onChange={(e) => setFormData({ ...formData, role: e.target.value })}
            >
              <option value="staff">Staff</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2.5 rounded-lg text-sm transition-colors cursor-pointer"
          >
            Sign Up
          </button>
        </form>

        <p className="text-xs text-center text-gray-500">
          Already registered?{" "}
          <Link to="/signin" className="text-orange-600 font-semibold hover:underline">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}