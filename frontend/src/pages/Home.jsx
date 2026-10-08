import { useState } from "react";
import { Link } from "react-router-dom";

// hard coded data
const MOCK_SERVICES = [
  { id: 1, name: "Haircut & Styling", duration: "45 mins", price: "$40" },
  { id: 2, name: "Hair Coloring & Highlights", duration: "90 mins", price: "$110" },
  { id: 3, name: "Facial & Skincare Treatment", duration: "60 mins", price: "$75" },
  { id: 4, name: "Manicure & Pedicure", duration: "50 mins", price: "$60" },
];

export default function Home({ user }) {
  const [search, setSearch] = useState("");

  const filteredServices = MOCK_SERVICES.filter((s) =>
    s.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 p-6">
      <div className="max-w-5xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          {!user ? (
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Welcome to BookEase Salon</h1>
              <p className="text-sm text-gray-500">Sign in to manage appointments or browse our salon services below.</p>
            </div>
          ) : (
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Welcome back, {user.name || user.email}
              </h1>
              <p className="text-sm text-gray-500">
                Role: <span className="font-semibold text-orange-600 capitalize">{user.role}</span>
              </p>
            </div>
          )}

          {/* Quick Actions based on Role */}
          {user?.role === "admin" && (
            <Link
              to="/admin/services/new"
              className="px-4 py-2 rounded-lg bg-orange-500 text-white font-medium text-sm hover:bg-orange-600 transition-colors"
            >
              + Add New Service
            </Link>
          )}

          {user?.role === "staff" && (
            <Link
              to="/staff/dashboard"
              className="px-4 py-2 rounded-lg bg-orange-500 text-white font-medium text-sm hover:bg-orange-600 transition-colors"
            >
              + Book Appointment
            </Link>
          )}
        </div>

        {/* 2. Services List */}
        <div className="space-y-4">
          <div className="flex justify-between items-center gap-4">
            <h2 className="text-xl font-bold text-gray-900">Salon Services Catalog</h2>
            <input
              type="text"
              placeholder="Search service..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="px-3 py-1.5 rounded-lg border border-gray-300 text-sm focus:outline-none focus:border-orange-500 bg-white"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {filteredServices.map((service) => (
              <div key={service.id} className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm flex flex-col justify-between">
                <div>
                  <h3 className="font-semibold text-gray-900">{service.name}</h3>
                  <p className="text-xs text-gray-500 mt-1">Duration: {service.duration}</p>
                  <p className="text-sm font-bold text-orange-600 mt-2">{service.price}</p>
                </div>

                <div className="mt-4 pt-3 border-t border-gray-100 text-right">
                  {user?.role === "staff" ? (
                    <Link to={`/staff/dashboard?serviceId=${service.id}`} className="text-xs font-semibold text-orange-600 hover:underline">
                      Book for Client &rarr;
                    </Link>
                  ) : user?.role === "admin" ? (
                    <Link to={`/admin/services/edit/${service.id}`} className="text-xs font-semibold text-gray-600 hover:underline">
                      Edit Service
                    </Link>
                  ) : (
                    <Link to="/signin" className="text-xs font-semibold text-orange-600 hover:underline">
                      Sign in to book &rarr;
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}