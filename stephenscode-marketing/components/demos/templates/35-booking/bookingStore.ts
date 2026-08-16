// Shared demo booking store for the Perfect Appointments showcase.
// Customer view and admin view read/write the same localStorage record so a
// booking made on the customer side shows up on the admin schedule.

export type AppointmentStatus = 'confirmed' | 'pending' | 'cancelled'

export interface Appointment {
  id: string
  client: string
  service: string
  staff: string
  date: string
  time: string
  status: AppointmentStatus
  reference?: string
  email?: string
  phone?: string
  notes?: string
  source?: 'online' | 'front-desk'
}

export const STORAGE_KEY = 'demo-booking-showcase-appointments'

export const SERVICES = [
  { id: '1', name: 'Haircut & Style', duration: '45 min', minutes: 45, price: 45 },
  { id: '2', name: 'Hair Coloring', duration: '90 min', minutes: 90, price: 85 },
  { id: '3', name: 'Deep Conditioning', duration: '30 min', minutes: 30, price: 35 },
  { id: '4', name: 'Massage Therapy', duration: '60 min', minutes: 60, price: 75 },
]

export const SERVICE_NAMES = SERVICES.map(s => s.name)

export const STAFF = [
  { id: '1', name: 'Sarah Johnson', specialty: 'Hair Styling', avatar: 'SJ', availability: '9:00 AM - 5:00 PM' },
  { id: '2', name: 'Mike Chen', specialty: 'Coloring Expert', avatar: 'MC', availability: '10:00 AM - 6:00 PM' },
  { id: '3', name: 'Lisa Anderson', specialty: 'Massage Therapist', avatar: 'LA', availability: '11:00 AM - 7:00 PM' },
]

export const TIME_SLOTS = ['9:00 AM', '10:00 AM', '11:00 AM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM']

export function toISODate(d: Date): string {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
}

export function addDays(iso: string, days: number): string {
  const [y, m, d] = iso.split('-').map(Number)
  const date = new Date(y, m - 1, d)
  date.setDate(date.getDate() + days)
  return toISODate(date)
}

export function formatDateShort(iso: string): string {
  const [y, m, d] = iso.split('-').map(Number)
  return new Date(y, m - 1, d).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })
}

export function formatDateLong(iso: string): string {
  const [y, m, d] = iso.split('-').map(Number)
  return new Date(y, m - 1, d).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })
}

export function timeToMinutes(t: string): number {
  const [hm, period] = t.split(' ')
  const [h, m] = hm.split(':').map(Number)
  return ((h % 12) + (period === 'PM' ? 12 : 0)) * 60 + m
}

export function seedAppointments(): Appointment[] {
  const today = toISODate(new Date())
  return [
    { id: '1', client: 'John Smith', service: 'Haircut & Style', staff: 'Sarah Johnson', date: today, time: '10:00 AM', status: 'confirmed', source: 'online' },
    { id: '2', client: 'Emma Davis', service: 'Hair Coloring', staff: 'Mike Chen', date: today, time: '11:00 AM', status: 'confirmed', source: 'online' },
    { id: '3', client: 'Michael Brown', service: 'Massage Therapy', staff: 'Lisa Anderson', date: today, time: '1:00 PM', status: 'pending', source: 'front-desk' },
    { id: '4', client: 'Sarah Wilson', service: 'Deep Conditioning', staff: 'Sarah Johnson', date: today, time: '2:00 PM', status: 'confirmed', source: 'front-desk' },
    { id: '5', client: 'David Lee', service: 'Haircut & Style', staff: 'Mike Chen', date: addDays(today, 1), time: '9:00 AM', status: 'confirmed', source: 'online' },
    { id: '6', client: 'Rachel Torres', service: 'Massage Therapy', staff: 'Lisa Anderson', date: addDays(today, 2), time: '3:00 PM', status: 'pending', source: 'online' },
  ]
}

function isAppointment(value: unknown): value is Appointment {
  if (!value || typeof value !== 'object') return false
  const v = value as Record<string, unknown>
  return (
    typeof v.id === 'string' &&
    typeof v.client === 'string' &&
    typeof v.service === 'string' &&
    typeof v.staff === 'string' &&
    typeof v.date === 'string' &&
    typeof v.time === 'string' &&
    (v.status === 'confirmed' || v.status === 'pending' || v.status === 'cancelled')
  )
}

/** Reads saved demo appointments, falling back to the seeded schedule. */
export function loadAppointments(): Appointment[] {
  if (typeof window === 'undefined') return seedAppointments()
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (raw) {
      const parsed: unknown = JSON.parse(raw)
      if (Array.isArray(parsed)) {
        const valid = parsed.filter(isAppointment)
        if (valid.length > 0) return valid
      }
    }
  } catch {
    // Corrupted or unavailable storage -- fall through to the seeded schedule
  }
  return seedAppointments()
}

export function saveAppointments(appointments: Appointment[]): void {
  if (typeof window === 'undefined') return
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(appointments))
  } catch {
    // Storage unavailable -- the demo still works in memory
  }
}

/** Appends a booking to the shared demo schedule and returns the full list. */
export function appendAppointment(appointment: Appointment): Appointment[] {
  const next = [...loadAppointments(), appointment]
  saveAppointments(next)
  return next
}

export function makeReference(): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'
  let out = ''
  for (let i = 0; i < 6; i += 1) {
    out += chars[Math.floor(Math.random() * chars.length)]
  }
  return `PA-${out}`
}

/** Slots already taken for a given staff member on a given date. */
export function bookedSlots(appointments: Appointment[], staffName: string, date: string): Set<string> {
  return new Set(
    appointments.filter(a => a.status !== 'cancelled' && a.staff === staffName && a.date === date).map(a => a.time)
  )
}

function toICSDate(iso: string, time: string): string {
  const [y, m, d] = iso.split('-').map(Number)
  const minutes = timeToMinutes(time)
  const dt = new Date(y, m - 1, d, Math.floor(minutes / 60), minutes % 60)
  const pad = (n: number) => String(n).padStart(2, '0')
  return `${dt.getFullYear()}${pad(dt.getMonth() + 1)}${pad(dt.getDate())}T${pad(dt.getHours())}${pad(dt.getMinutes())}00`
}

function escapeICS(value: string): string {
  return value.replace(/\\/g, '\\\\').replace(/;/g, '\\;').replace(/,/g, '\\,').replace(/\n/g, '\\n')
}

/** Builds a real .ics calendar file for the booking and triggers a download. */
export function downloadICS(appointment: Appointment, durationMinutes: number): void {
  if (typeof window === 'undefined') return
  const start = toICSDate(appointment.date, appointment.time)
  const [y, m, d] = appointment.date.split('-').map(Number)
  const startMinutes = timeToMinutes(appointment.time)
  const endDate = new Date(y, m - 1, d, Math.floor(startMinutes / 60), (startMinutes % 60) + durationMinutes)
  const pad = (n: number) => String(n).padStart(2, '0')
  const end = `${endDate.getFullYear()}${pad(endDate.getMonth() + 1)}${pad(endDate.getDate())}T${pad(endDate.getHours())}${pad(endDate.getMinutes())}00`

  const lines = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Perfect Appointments Demo//EN',
    'CALSCALE:GREGORIAN',
    'BEGIN:VEVENT',
    `UID:${appointment.reference ?? appointment.id}@perfect-appointments-demo`,
    `DTSTART:${start}`,
    `DTEND:${end}`,
    `SUMMARY:${escapeICS(`${appointment.service} with ${appointment.staff}`)}`,
    `DESCRIPTION:${escapeICS(`Perfect Appointments booking ${appointment.reference ?? ''} for ${appointment.client}. Sample calendar file from an interactive demo.`)}`,
    'LOCATION:Perfect Appointments Studio',
    'END:VEVENT',
    'END:VCALENDAR',
  ]

  const blob = new Blob([lines.join('\r\n')], { type: 'text/calendar;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = `${appointment.reference ?? 'appointment'}.ics`
  link.click()
  URL.revokeObjectURL(url)
}
