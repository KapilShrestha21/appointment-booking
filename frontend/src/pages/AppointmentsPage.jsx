import { useEffect, useState } from "react";
import { getAppointments, deleteAppointment } from "../services/appointmentService.js";
import AppointmentCard from "../components/AppointmentCard.jsx";

export default function AppointmentsPage() {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const res = await getAppointments();
      setAppointments(res.data || []);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteAppointment(id);
      fetchAppointments();
    } catch (err) {
      alert("Failed to delete");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">All Appointments</h1>
      <div className="grid gap-3">
        {appointments.map((app) => (
          <AppointmentCard key={app.id} appointment={app} onDelete={handleDelete} />
        ))}
      </div>
    </div>
  );
}