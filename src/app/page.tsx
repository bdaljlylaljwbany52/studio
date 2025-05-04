import React from 'react';
import DashboardMetrics from '@/components/dashboard-metrics';
import AppointmentCalendar from '@/components/appointment-calendar';
import DataEntry from '@/components/data-entry';

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>

      {/* Dashboard Metrics Section */}
      <DashboardMetrics />

      {/* Data Entry Section */}
      <DataEntry />

      {/* Appointment Calendar Section */}
      <AppointmentCalendar />
    </div>
  );
}
