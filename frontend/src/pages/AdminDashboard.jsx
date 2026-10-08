import { useEffect, useState } from "react";
import { getServices, createService, updateService, deleteService } from "../services/serviceService.js";
import ServiceCard from "../components/ServiceCard.jsx";

export default function AdminDashboard() {
  const [services, setServices] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({ service_name: "", duration: "", price: "", description: "" });

  useEffect(() => {
    loadServices();
  }, []);

  const loadServices = async () => {
    try {
      const res = await getServices();
      const data = res.data?.data || res.data || [];
      setServices(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      ...form,
      duration: Number(form.duration),
      price: Number(form.price),
    };

    try {
      if (editingId) {
        // If editingId is set, perform an update
        await updateService(editingId, payload);
      } else {
        // Otherwise, create a new service
        await createService(payload);
      }
      resetForm();
      loadServices();
    } catch (err) {
      alert(err.response?.data?.message || "Operation failed");
    }
  };

  const handleEdit = (service) => {
    setEditingId(service.id);
    setForm({
      service_name: service.service_name || service.name,
      duration: service.duration,
      price: service.price,
      description: service.description || "",
    });
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this service?")) return;
    try {
      await deleteService(id);
      loadServices();
    } catch (err) {
      alert("Failed to delete service");
    }
  };

  const resetForm = () => {
    setEditingId(null);
    setForm({ service_name: "", duration: "", price: "", description: "" });
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>

      {/* Dynamic Add / Edit Form */}
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-4">
        <h2 className="text-lg font-bold text-gray-800">
          {editingId ? "Edit Service" : "Add New Service"}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            type="text"
            placeholder="Service Name"
            required
            className="px-3 py-2 border rounded-lg text-sm"
            value={form.service_name}
            onChange={(e) => setForm({ ...form, service_name: e.target.value })}
          />
          <input
            type="number"
            placeholder="Duration (mins)"
            required
            className="px-3 py-2 border rounded-lg text-sm"
            value={form.duration}
            onChange={(e) => setForm({ ...form, duration: e.target.value })}
          />
          <input
            type="number"
            placeholder="Price ($)"
            required
            className="px-3 py-2 border rounded-lg text-sm"
            value={form.price}
            onChange={(e) => setForm({ ...form, price: e.target.value })}
          />
        </div>

        <div className="flex gap-2">
          {editingId ? (
            <>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-semibold hover:bg-blue-700 cursor-pointer"
              >
                Update Service
              </button>
              <button
                type="button"
                onClick={resetForm}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg text-sm font-semibold hover:bg-gray-300 cursor-pointer"
              >
                Cancel
              </button>
            </>
          ) : (
            <button
              type="submit"
              className="px-4 py-2 bg-orange-500 text-white rounded-lg text-sm font-semibold hover:bg-orange-600 cursor-pointer"
            >
              Create Service
            </button>
          )}
        </div>
      </form>

      {/* Existing Services List */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-gray-800">Existing Services</h2>
        {services.length === 0 ? (
          <p className="text-sm text-gray-500">No services found.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {services.map((s) => (
              <ServiceCard
                key={s.id}
                service={s}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}