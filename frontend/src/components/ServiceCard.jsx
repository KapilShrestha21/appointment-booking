import { FaClock, FaTrashAlt, FaEdit } from "react-icons/fa";

export default function ServiceCard({ service, onEdit, onDelete }) {
  return (
    <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm flex flex-col justify-between">
      <div>
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-bold text-gray-900">{service.service_name || service.name}</h3>
          <span className="text-sm font-extrabold text-orange-600">${service.price}</span>
        </div>
        <p className="text-xs text-gray-500 flex items-center gap-1 mb-2">
          <FaClock className="text-orange-400" /> {service.duration} mins
        </p>
        {service.description && <p className="text-xs text-gray-600">{service.description}</p>}
      </div>

      <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-end gap-2">
        {onEdit && (
          <button
            onClick={() => onEdit(service)}
            className="p-2 text-gray-500 hover:text-orange-600 hover:bg-orange-50 rounded-lg transition-colors cursor-pointer"
            title="Edit Service"
          >
            <FaEdit />
          </button>
        )}
        {onDelete && (
          <button
            onClick={() => onDelete(service.id)}
            className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
            title="Delete Service"
          >
            <FaTrashAlt />
          </button>
        )}
      </div>
    </div>
  );
}