'use client';

import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { Calendar as CalendarIcon, PlusCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
  DialogClose,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useLocalStorage } from '@/hooks/use-local-storage';

type Appointment = {
  id: string;
  date: Date;
  time: string;
  title: string;
  notes?: string;
};

const AppointmentCalendar = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [appointments, setAppointments] = useLocalStorage<Appointment[]>('appointments', []);
  const [selectedDateAppointments, setSelectedDateAppointments] = useState<Appointment[]>([]);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newAppointmentTitle, setNewAppointmentTitle] = useState('');
  const [newAppointmentTime, setNewAppointmentTime] = useState('');
  const [newAppointmentNotes, setNewAppointmentNotes] = useState('');

  useEffect(() => {
    if (date) {
      const filtered = appointments.filter(
        (app) => format(new Date(app.date), 'yyyy-MM-dd') === format(date, 'yyyy-MM-dd')
      );
      setSelectedDateAppointments(filtered.sort((a, b) => a.time.localeCompare(b.time)));
    } else {
      setSelectedDateAppointments([]);
    }
  }, [date, appointments]);

  const handleAddAppointment = () => {
    if (!date || !newAppointmentTitle || !newAppointmentTime) {
      // Basic validation - ideally use react-hook-form/zod
      alert('Please select a date, enter a title, and time.');
      return;
    }

    const newAppointment: Appointment = {
      id: crypto.randomUUID(),
      date: date,
      time: newAppointmentTime,
      title: newAppointmentTitle,
      notes: newAppointmentNotes,
    };

    setAppointments([...appointments, newAppointment]);
    setNewAppointmentTitle('');
    setNewAppointmentTime('');
    setNewAppointmentNotes('');
    setIsAddDialogOpen(false); // Close dialog after adding
  };

  return (
    <Card className="shadow-md transition-shadow hover:shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Appointment Calendar</span>
           <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
                <Button variant="outline" size="sm" className="ml-auto">
                    <PlusCircle className="mr-2 h-4 w-4" /> Add Appointment
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                <DialogTitle>Add New Appointment</DialogTitle>
                <DialogDescription>
                    Fill in the details for the new appointment. Select the date using the calendar first.
                </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="date" className="text-right">
                    Date
                    </Label>
                    <Input
                    id="date"
                    value={date ? format(date, 'PPP') : 'Select a date'}
                    disabled
                    className="col-span-3"
                    />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="title" className="text-right">
                    Title
                    </Label>
                    <Input
                    id="title"
                    value={newAppointmentTitle}
                    onChange={(e) => setNewAppointmentTitle(e.target.value)}
                    className="col-span-3"
                    placeholder="Meeting with John Doe"
                    required
                    />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="time" className="text-right">
                    Time
                    </Label>
                    <Input
                    id="time"
                    type="time"
                    value={newAppointmentTime}
                    onChange={(e) => setNewAppointmentTime(e.target.value)}
                    className="col-span-3"
                    required
                    />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="notes" className="text-right">
                    Notes
                    </Label>
                    <Textarea
                    id="notes"
                    value={newAppointmentNotes}
                    onChange={(e) => setNewAppointmentNotes(e.target.value)}
                    className="col-span-3"
                    placeholder="Optional notes..."
                    />
                </div>
                </div>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button variant="outline">Cancel</Button>
                    </DialogClose>
                    <Button type="submit" onClick={handleAddAppointment} disabled={!date}>Save Appointment</Button>
                </DialogFooter>
            </DialogContent>
            </Dialog>
        </CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4 md:grid-cols-2">
        <div>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={'outline'}
                className={cn(
                  'w-full justify-start text-left font-normal',
                  !date && 'text-muted-foreground'
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? format(date, 'PPP') : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                initialFocus
                modifiers={{
                    // Highlight dates with appointments
                    hasAppointment: appointments.map(app => new Date(app.date))
                }}
                modifiersStyles={{
                    hasAppointment: { fontWeight: 'bold', textDecoration: 'underline', textDecorationColor: 'hsl(var(--accent))' }
                }}
              />
            </PopoverContent>
          </Popover>
        </div>
        <div className="border rounded-md p-4">
          <h3 className="text-lg font-semibold mb-2">
            Appointments for {date ? format(date, 'PPP') : 'selected date'}
          </h3>
          <ScrollArea className="h-[200px]">
            {selectedDateAppointments.length > 0 ? (
              <ul className="space-y-2">
                {selectedDateAppointments.map((app) => (
                  <li key={app.id} className="text-sm p-2 border-b last:border-b-0">
                    <span className="font-medium">{app.time}</span> - {app.title}
                    {app.notes && <p className="text-xs text-muted-foreground mt-1">{app.notes}</p>}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-muted-foreground italic">No appointments for this date.</p>
            )}
          </ScrollArea>
        </div>
      </CardContent>
    </Card>
  );
};

export default AppointmentCalendar;
