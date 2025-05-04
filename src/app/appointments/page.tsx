import React from 'react';
import AppointmentCalendar from '@/components/appointment-calendar';

export default function AppointmentsPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Appointments</h1>
      <p className="text-muted-foreground">
        View and manage your scheduled appointments.
      </p>
      <AppointmentCalendar />
    </div>
  );
}
