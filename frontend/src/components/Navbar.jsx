import { useState } from "react";
import { 
  FaCalendarCheck, 
  FaUserPlus, 
  FaSignInAlt, 
  FaSignOutAlt, 
  FaChartBar, 
  FaClipboardList, 
  FaUserCircle, 
  FaChevronDown 
} from "react-icons/fa";

export default function Navbar({ user, onLogout }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <nav className="bg-white text-gray-800 border-b border-gray-100 shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          
          {/* Logo / Brand */}
          <a href="/" className="flex items-center gap-2.5 group">
            
            <div className="flex flex-col">
              <span className="font-bold text-xl tracking-tight text-gray-900 leading-tight">
                BookEase
              </span>
              <span className="text-[10px] text-orange-600 font-semibold tracking-wider uppercase">
                Appointment Hub
              </span>
            </div>
          </a>

          {/* Navigation Items */}
          <div className="flex items-center gap-3 sm:gap-4">
            {!user ? (
              /* Public Links (Unauthenticated) */
              <>
                <a
                  href="/signin"
                  className="flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm font-semibold text-gray-600 hover:text-orange-600 hover:bg-orange-50/60 transition-colors"
                >
                  <FaSignInAlt className="text-gray-400 group-hover:text-orange-500" />
                  <span>Sign In</span>
                </a>
                <a
                  href="/signup"
                  className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold bg-orange-500 text-white hover:bg-orange-600 shadow-sm transition-all hover:shadow"
                >
                  <FaUserPlus />
                  <span>Sign Up</span>
                </a>
              </>
            ) : (
              /* Role-Based Links (Authenticated) */
              <div className="flex items-center gap-3">
                {/* Admin Role Dashboard */}
                {user.role === "admin" && (
                  <a
                    href="/admin/dashboard"
                    className="flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm font-semibold bg-orange-50 text-orange-700 hover:bg-orange-100/80 border border-orange-200/60 transition-all"
                  >
                    <FaChartBar className="text-orange-500" />
                    <span>Admin Dashboard</span>
                  </a>
                )}

                {/* Staff Role Dashboard */}
                {user.role === "staff" && (
                  <a
                    href="/staff/dashboard"
                    className="flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm font-semibold bg-orange-50 text-orange-700 hover:bg-orange-100/80 border border-orange-200/60 transition-all"
                  >
                    <FaClipboardList className="text-orange-500" />
                    <span>Staff Schedule</span>
                  </a>
                )}

                {/* User Dropdown Profile Menu */}
                <div className="relative">
                  <button
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    className="flex items-center gap-2 pl-3 pr-2 py-1.5 rounded-full bg-gray-50 hover:bg-orange-50 border border-gray-200 hover:border-orange-200 transition-all cursor-pointer"
                  >
                    <FaUserCircle className="text-2xl text-gray-400" />
                    <span className="text-sm font-medium text-gray-700 max-w-[120px] truncate">
                      {user.name || user.email}
                    </span>
                    <FaChevronDown className="text-xs text-gray-400" />
                  </button>

                  {/* Profile Dropdown Menu */}
                  {dropdownOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg py-2 border border-gray-100 text-gray-800 z-50">
                      <div className="px-4 py-2 border-b border-gray-100">
                        <p className="text-xs text-gray-400 uppercase font-semibold">Role</p>
                        <p className="text-sm font-bold text-orange-600 capitalize">{user.role || "User"}</p>
                      </div>
                      <button
                        onClick={() => {
                          setDropdownOpen(false);
                          if (onLogout) onLogout();
                        }}
                        className="w-full flex items-center gap-2.5 px-4 py-2 text-sm text-red-600 hover:bg-red-50 font-semibold transition-colors text-left cursor-pointer"
                      >
                        <FaSignOutAlt />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

        </div>
      </div>
    </nav>
  );
}