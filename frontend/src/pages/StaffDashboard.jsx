import { useState, useEffect } from "react";
import BookingForm from "../components/BookingForm";
import {
  getAppointments,
  createAppointment,
  updateAppointment,
  deleteAppointment,
} from "../services/appointmentService";
import { getServices } from "../services/serviceService";

export default function StaffDashboard() {
  const [appointments, setAppointments] = useState([]);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editingAppointment, setEditingAppointment] = useState(null);

  const loadData = async () => {
    try {
      const [apptsRes, svcsRes] = await Promise.all([getAppointments(), getServices()]);

      // safely extract array  
      const apptsList = Array.isArray(apptsRes) ? apptsRes : apptsRes?.data || apptsRes?.appointments || [];
      const svcsList = Array.isArray(svcsRes) ? svcsRes : svcsRes?.data || svcsRes?.services || [];

      setAppointments(apptsList);
      setServices(svcsList);
    } catch (err) {
      console.error(err);
      setAppointments([]);
      setServices([]);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleSaveAppointment = async (bookingData) => {
    setLoading(true);
    try {
      const payload = {
        ...bookingData,
        service_id: Number(bookingData.service_id),
        appointment_date: String(bookingData.appointment_date).split("T")[0],
        appointment_time:
          bookingData.appointment_time.length === 5
            ? `${bookingData.appointment_time}:00`
            : bookingData.appointment_time,
      };

      if (editingAppointment) {
        await updateAppointment(editingAppointment.id, payload);
        setEditingAppointment(null);
      } else {
        await createAppointment(payload);
      }
      await loadData();
    } catch (err) {
      alert(err.response?.data?.message || "Failed to save appointment");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Delete this appointment?")) {
      await deleteAppointment(id);
      loadData();
    }
  };

  return (
    <div className="p-6 max-w-6xl mx-auto flex gap-6">
      <div className="w-1/3">
        <BookingForm
          services={services}
          onSubmit={handleSaveAppointment}
          initialData={editingAppointment}
          onCancel={() => setEditingAppointment(null)}
          loading={loading}
        />
      </div>

      <div className="w-2/3 space-y-4">
        <h2 className="text-xl font-bold">Appointments</h2>
        {Array.isArray(appointments) && appointments.length > 0 ? (
          appointments.map((apt) => (
            <div key={apt.id} className="p-4 bg-white border rounded flex justify-between items-center shadow-sm">
              <div>
                <p className="font-bold">{apt.customer_name} ({apt.customer_phone})</p>
                <p className="text-sm text-gray-600">
                  {apt.service_name || `Service #${apt.service_id}`} | {String(apt.appointment_date).split("T")[0]} at {String(apt.appointment_time).slice(0, 5)}
                </p>
              </div>
              <div className="flex gap-2">
                <button onClick={() => setEditingAppointment(apt)} className="px-3 py-1 bg-gray-100 rounded text-sm">
                  Edit
                </button>
                <button onClick={() => handleDelete(apt.id)} className="px-3 py-1 bg-red-100 text-red-600 rounded text-sm">
                  Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-sm">No appointments found.</p>
        )}
      </div>
    </div>
  );
}