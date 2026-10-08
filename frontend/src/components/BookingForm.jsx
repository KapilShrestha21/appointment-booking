import { useState, useEffect } from "react";

export default function BookingForm({ services, onSubmit, initialData, onCancel, loading }) {
  const [formData, setFormData] = useState({
    customer_name: "",
    customer_phone: "",
    service_id: "",
    appointment_date: "",
    appointment_time: "",
    notes: "",
  });

  // automatically update form fields when initialData changes
  useEffect(() => {
    if (initialData) {
      // safely extract YYYY-MM-DD without timezone offset shift
      const cleanDate = initialData.appointment_date
        ? String(initialData.appointment_date).split("T")[0]
        : "";

      // safely trim HH:mm:ss down to HH:mm for />
      const cleanTime = initialData.appointment_time
        ? String(initialData.appointment_time).slice(0, 5)
        : "";

      // extract service_id 
      const serviceId = initialData.service_id ?? initialData.service?.id ?? "";

      setFormData({
        customer_name: initialData.customer_name || "",
        customer_phone: initialData.customer_phone || "",
        service_id: serviceId !== "" ? String(serviceId) : "",
        appointment_date: cleanDate,
        appointment_time: cleanTime,
        notes: initialData.notes || "",
      });
    } else {
      setFormData({
        customer_name: "",
        customer_phone: "",
        service_id: "",
        appointment_date: "",
        appointment_time: "",
        notes: "",
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.service_id) {
      alert("Please select a service.");
      return;
    }
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold text-gray-900">
          {initialData ? "Edit Appointment" : "New Appointment"}
        </h3>
        {initialData && (
          <span className="text-xs bg-orange-100 text-orange-700 font-medium px-2 py-1 rounded">
            Editing ID #{initialData.id}
          </span>
        )}
      </div>

      <div>
        <label className="block text-xs font-semibold text-gray-600 mb-1">Customer Name</label>
        <input
          type="text"
          name="customer_name"
          value={formData.customer_name}
          onChange={handleChange}
          placeholder="Customer Name"
          className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-none"
          required
        />
      </div>

      <div>
        <label className="block text-xs font-semibold text-gray-600 mb-1">Customer Phone</label>
        <input
          type="text"
          name="customer_phone"
          value={formData.customer_phone}
          onChange={handleChange}
          placeholder="Customer Phone"
          className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-none"
          required
        />
      </div>

      <div>
        <label className="block text-xs font-semibold text-gray-600 mb-1">Service</label>
        <select
          name="service_id"
          value={formData.service_id}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-none"
          required
        >
          <option value="">Select Service</option>
          {services.map((s) => (
            <option key={s.id} value={String(s.id)}>
              {s.service_name || s.name || s.title}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-gray-600 mb-1">Date</label>
          <input
            type="date"
            name="appointment_date"
            value={formData.appointment_date}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-none"
            required
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-600 mb-1">Time</label>
          <input
            type="time"
            name="appointment_time"
            value={formData.appointment_time}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-none"
            required
          />
        </div>
      </div>

      <div>
        <label className="block text-xs font-semibold text-gray-600 mb-1">Notes (Optional)</label>
        <textarea
          name="notes"
          value={formData.notes}
          onChange={handleChange}
          placeholder="Notes (optional)"
          rows={2}
          className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-none"
        />
      </div>

      <div className="flex gap-2 pt-2">
        <button
          type="submit"
          disabled={loading}
          className="flex-1 px-4 py-2 bg-orange-600 text-white font-medium rounded-lg hover:bg-orange-700 disabled:opacity-50 transition-colors cursor-pointer"
        >
          {loading ? "Saving..." : initialData ? "Update Appointment" : "Book Appointment"}
        </button>

        {initialData && (
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 bg-gray-200 text-gray-700 font-medium rounded-lg hover:bg-gray-300 transition-colors cursor-pointer"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}