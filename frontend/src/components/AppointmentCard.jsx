import { FaCalendar, FaClock, FaUser, FaPhone, FaTrashAlt, FaConciergeBell, FaEdit } from "react-icons/fa";

export default function AppointmentCard({ appointment, onEdit, onDelete }) {
  const formattedDate = appointment.appointment_date
    ? String(appointment.appointment_date).split("T")[0]
    : "";

  const formattedTime = appointment.appointment_time
    ? String(appointment.appointment_time).slice(0, 5)
    : "";

  const serviceName =
    appointment.service_name ||
    (typeof appointment.service === "object" ? appointment.service?.name : appointment.service);

  return (
    <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex items-center justify-between hover:border-orange-200 transition-all">
      <div className="space-y-1">
        <h4 className="font-semibold text-gray-900 flex items-center gap-2">
          <FaUser className="text-orange-500 text-xs" />
          {appointment.customer_name}
        </h4>
        <p className="text-xs text-gray-500 flex items-center gap-2">
          <FaPhone className="text-gray-400 text-xs" />
          {appointment.customer_phone}
        </p>
        {serviceName && (
          <p className="text-xs text-gray-600 flex items-center gap-2">
            <FaConciergeBell className="text-gray-400 text-xs" />
            {serviceName}
          </p>
        )}
        <p className="text-xs font-medium text-orange-600 flex items-center gap-2">
          <FaCalendar className="text-xs" /> {formattedDate}
          <FaClock className="text-xs ml-1" /> {formattedTime}
        </p>
      </div>

      <div className="flex items-center gap-1">
        {onEdit && (
          <button
            onClick={() => onEdit(appointment)}
            className="p-2 text-gray-400 hover:text-orange-600 hover:bg-orange-50 rounded-lg transition-colors cursor-pointer"
            title="Edit Appointment"
          >
            <FaEdit />
          </button>
        )}
        {onDelete && (
          <button
            onClick={() => onDelete(appointment.id)}
            className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
            title="Cancel Appointment"
          >
            <FaTrashAlt />
          </button>
        )}
      </div>
    </div>
  );
}