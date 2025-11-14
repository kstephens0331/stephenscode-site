'use client';

import { Calendar, Clock, Users, MapPin, Filter } from 'lucide-react';
import { useState } from 'react';

interface SchedulePageProps {
  basePath: string;
}

export default function SchedulePage({ basePath }: SchedulePageProps) {
  const [selectedDay, setSelectedDay] = useState('Monday');
  const [selectedFilter, setSelectedFilter] = useState('All');

  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const filters = ['All', 'CrossFit', 'HIIT', 'Yoga', 'Spin', 'Boxing', 'Strength', 'Bootcamp', 'Pilates'];

  const schedule = {
    Monday: [
      { time: '6:00 AM', class: 'CrossFit', trainer: 'Jake Morrison', duration: '60 min', spots: 8, room: 'Main Studio' },
      { time: '7:30 AM', class: 'HIIT', trainer: 'Sarah Chen', duration: '45 min', spots: 12, room: 'Studio B' },
      { time: '9:00 AM', class: 'Yoga', trainer: 'Emily Rodriguez', duration: '60 min', spots: 15, room: 'Mind-Body Room' },
      { time: '12:00 PM', class: 'Spin', trainer: 'Mike Davis', duration: '50 min', spots: 5, room: 'Cycle Studio' },
      { time: '5:00 PM', class: 'Boxing', trainer: 'Marcus Steel', duration: '55 min', spots: 10, room: 'Main Studio' },
      { time: '6:30 PM', class: 'Bootcamp', trainer: 'Sarah Chen', duration: '50 min', spots: 6, room: 'Outdoor Area' },
      { time: '7:30 PM', class: 'Pilates', trainer: 'Emily Rodriguez', duration: '55 min', spots: 12, room: 'Mind-Body Room' },
    ],
    Tuesday: [
      { time: '6:00 AM', class: 'HIIT', trainer: 'Sarah Chen', duration: '45 min', spots: 10, room: 'Studio B' },
      { time: '7:30 AM', class: 'Strength', trainer: 'Marcus Steel', duration: '60 min', spots: 8, room: 'Main Studio' },
      { time: '9:00 AM', class: 'Pilates', trainer: 'Emily Rodriguez', duration: '55 min', spots: 14, room: 'Mind-Body Room' },
      { time: '12:00 PM', class: 'CrossFit', trainer: 'Jake Morrison', duration: '60 min', spots: 5, room: 'Main Studio' },
      { time: '5:00 PM', class: 'Spin', trainer: 'Mike Davis', duration: '50 min', spots: 7, room: 'Cycle Studio' },
      { time: '6:30 PM', class: 'Boxing', trainer: 'Marcus Steel', duration: '55 min', spots: 9, room: 'Main Studio' },
      { time: '7:30 PM', class: 'Yoga', trainer: 'Emily Rodriguez', duration: '60 min', spots: 11, room: 'Mind-Body Room' },
    ],
    Wednesday: [
      { time: '6:00 AM', class: 'Bootcamp', trainer: 'Sarah Chen', duration: '50 min', spots: 6, room: 'Outdoor Area' },
      { time: '7:30 AM', class: 'CrossFit', trainer: 'Jake Morrison', duration: '60 min', spots: 10, room: 'Main Studio' },
      { time: '9:00 AM', class: 'Yoga', trainer: 'Emily Rodriguez', duration: '60 min', spots: 13, room: 'Mind-Body Room' },
      { time: '12:00 PM', class: 'HIIT', trainer: 'Sarah Chen', duration: '45 min', spots: 8, room: 'Studio B' },
      { time: '5:00 PM', class: 'Strength', trainer: 'Marcus Steel', duration: '60 min', spots: 7, room: 'Main Studio' },
      { time: '6:30 PM', class: 'Spin', trainer: 'Mike Davis', duration: '50 min', spots: 4, room: 'Cycle Studio' },
      { time: '7:30 PM', class: 'Boxing', trainer: 'Marcus Steel', duration: '55 min', spots: 12, room: 'Main Studio' },
    ],
    Thursday: [
      { time: '6:00 AM', class: 'HIIT', trainer: 'Sarah Chen', duration: '45 min', spots: 9, room: 'Studio B' },
      { time: '7:30 AM', class: 'Strength', trainer: 'Marcus Steel', duration: '60 min', spots: 11, room: 'Main Studio' },
      { time: '9:00 AM', class: 'Pilates', trainer: 'Emily Rodriguez', duration: '55 min', spots: 15, room: 'Mind-Body Room' },
      { time: '12:00 PM', class: 'CrossFit', trainer: 'Jake Morrison', duration: '60 min', spots: 6, room: 'Main Studio' },
      { time: '5:00 PM', class: 'Bootcamp', trainer: 'Sarah Chen', duration: '50 min', spots: 5, room: 'Outdoor Area' },
      { time: '6:30 PM', class: 'Yoga', trainer: 'Emily Rodriguez', duration: '60 min', spots: 10, room: 'Mind-Body Room' },
      { time: '7:30 PM', class: 'Spin', trainer: 'Mike Davis', duration: '50 min', spots: 8, room: 'Cycle Studio' },
    ],
    Friday: [
      { time: '6:00 AM', class: 'CrossFit', trainer: 'Jake Morrison', duration: '60 min', spots: 7, room: 'Main Studio' },
      { time: '7:30 AM', class: 'HIIT', trainer: 'Sarah Chen', duration: '45 min', spots: 13, room: 'Studio B' },
      { time: '9:00 AM', class: 'Yoga', trainer: 'Emily Rodriguez', duration: '60 min', spots: 16, room: 'Mind-Body Room' },
      { time: '12:00 PM', class: 'Boxing', trainer: 'Marcus Steel', duration: '55 min', spots: 9, room: 'Main Studio' },
      { time: '5:00 PM', class: 'Spin', trainer: 'Mike Davis', duration: '50 min', spots: 6, room: 'Cycle Studio' },
      { time: '6:30 PM', class: 'Bootcamp', trainer: 'Sarah Chen', duration: '50 min', spots: 8, room: 'Outdoor Area' },
      { time: '7:30 PM', class: 'Strength', trainer: 'Marcus Steel', duration: '60 min', spots: 11, room: 'Main Studio' },
    ],
    Saturday: [
      { time: '8:00 AM', class: 'CrossFit', trainer: 'Jake Morrison', duration: '60 min', spots: 12, room: 'Main Studio' },
      { time: '9:30 AM', class: 'Yoga', trainer: 'Emily Rodriguez', duration: '60 min', spots: 18, room: 'Mind-Body Room' },
      { time: '10:30 AM', class: 'HIIT', trainer: 'Sarah Chen', duration: '45 min', spots: 14, room: 'Studio B' },
      { time: '11:30 AM', class: 'Spin', trainer: 'Mike Davis', duration: '50 min', spots: 10, room: 'Cycle Studio' },
      { time: '1:00 PM', class: 'Boxing', trainer: 'Marcus Steel', duration: '55 min', spots: 13, room: 'Main Studio' },
      { time: '2:30 PM', class: 'Bootcamp', trainer: 'Sarah Chen', duration: '50 min', spots: 9, room: 'Outdoor Area' },
    ],
    Sunday: [
      { time: '8:00 AM', class: 'Yoga', trainer: 'Emily Rodriguez', duration: '60 min', spots: 20, room: 'Mind-Body Room' },
      { time: '9:30 AM', class: 'Pilates', trainer: 'Emily Rodriguez', duration: '55 min', spots: 17, room: 'Mind-Body Room' },
      { time: '10:30 AM', class: 'CrossFit', trainer: 'Jake Morrison', duration: '60 min', spots: 15, room: 'Main Studio' },
      { time: '12:00 PM', class: 'HIIT', trainer: 'Sarah Chen', duration: '45 min', spots: 12, room: 'Studio B' },
      { time: '1:30 PM', class: 'Spin', trainer: 'Mike Davis', duration: '50 min', spots: 11, room: 'Cycle Studio' },
    ],
  };

  const currentSchedule = schedule[selectedDay as keyof typeof schedule] || [];
  const filteredSchedule = selectedFilter === 'All'
    ? currentSchedule
    : currentSchedule.filter(item => item.class === selectedFilter);

  const getClassColor = (className: string) => {
    const colors: { [key: string]: string } = {
      'CrossFit': 'from-[#c1121f] to-[#780000]',
      'HIIT': 'from-orange-600 to-red-700',
      'Yoga': 'from-emerald-600 to-teal-700',
      'Spin': 'from-blue-600 to-indigo-700',
      'Boxing': 'from-amber-600 to-orange-700',
      'Strength': 'from-purple-600 to-pink-700',
      'Bootcamp': 'from-red-600 to-rose-700',
      'Pilates': 'from-cyan-600 to-blue-700',
    };
    return colors[className] || 'from-zinc-600 to-zinc-700';
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-zinc-900 via-zinc-900 to-[#780000]/20 py-20">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjAzKSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-40"></div>

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center space-x-2 bg-[#c1121f]/10 border border-[#c1121f]/20 rounded-full px-4 py-2 mb-6">
              <Calendar className="h-4 w-4 text-[#c1121f]" />
              <span className="text-sm font-medium text-[#c1121f]">100+ Weekly Classes</span>
            </div>

            <h1 className="text-5xl sm:text-6xl font-black text-zinc-50 mb-6">
              Class
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#c1121f] to-[#fdf0d5]">
                Schedule
              </span>
            </h1>

            <p className="text-xl text-zinc-400">
              Browse our full schedule and book your next workout. New classes added weekly!
            </p>
          </div>
        </div>
      </section>

      {/* Schedule Section */}
      <section className="py-20 bg-zinc-950">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Day Selector */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold text-zinc-50">Select Day</h2>
              <div className="text-sm text-zinc-400">All times in EST</div>
            </div>
            <div className="flex flex-wrap gap-2">
              {days.map((day) => (
                <button
                  key={day}
                  onClick={() => setSelectedDay(day)}
                  className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                    selectedDay === day
                      ? 'bg-gradient-to-r from-[#c1121f] to-[#780000] text-zinc-50 shadow-lg shadow-[#c1121f]/20'
                      : 'bg-zinc-900 text-zinc-400 hover:text-zinc-50 hover:bg-zinc-800'
                  }`}
                >
                  {day}
                </button>
              ))}
            </div>
          </div>

          {/* Filter */}
          <div className="mb-8">
            <div className="flex items-center space-x-3 mb-4">
              <Filter className="h-5 w-5 text-zinc-400" />
              <h3 className="text-lg font-semibold text-zinc-50">Filter by Class Type</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {filters.map((filter) => (
                <button
                  key={filter}
                  onClick={() => setSelectedFilter(filter)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    selectedFilter === filter
                      ? 'bg-[#c1121f] text-zinc-50'
                      : 'bg-zinc-900 text-zinc-400 hover:text-zinc-50 hover:bg-zinc-800'
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>

          {/* Schedule Grid */}
          <div className="space-y-4">
            {filteredSchedule.length > 0 ? (
              filteredSchedule.map((item, index) => (
                <div
                  key={index}
                  className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden hover:border-[#c1121f]/50 transition-all group"
                >
                  <div className="flex flex-col lg:flex-row">
                    {/* Time */}
                    <div className={`bg-gradient-to-br ${getClassColor(item.class)} lg:w-48 p-6 flex items-center justify-center`}>
                      <div className="text-center">
                        <Clock className="h-6 w-6 text-white/80 mx-auto mb-2" />
                        <div className="text-2xl font-black text-white">{item.time}</div>
                        <div className="text-sm text-white/80">{item.duration}</div>
                      </div>
                    </div>

                    {/* Class Info */}
                    <div className="flex-1 p-6">
                      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                        <div className="mb-4 lg:mb-0">
                          <h3 className="text-2xl font-black text-zinc-50 mb-2">{item.class}</h3>
                          <div className="flex flex-wrap gap-4 text-sm text-zinc-400">
                            <div className="flex items-center">
                              <Users className="h-4 w-4 mr-2 text-[#c1121f]" />
                              <span>{item.trainer}</span>
                            </div>
                            <div className="flex items-center">
                              <MapPin className="h-4 w-4 mr-2 text-[#c1121f]" />
                              <span>{item.room}</span>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center space-x-4">
                          <div className="text-center">
                            <div className="text-2xl font-bold text-[#c1121f]">{item.spots}</div>
                            <div className="text-xs text-zinc-500">spots left</div>
                          </div>
                          <button className="px-6 py-3 bg-gradient-to-r from-[#c1121f] to-[#780000] text-zinc-50 rounded-lg font-semibold hover:shadow-lg hover:shadow-[#c1121f]/30 transition-all whitespace-nowrap">
                            Book Now
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-12 text-center">
                <Calendar className="h-12 w-12 text-zinc-600 mx-auto mb-4" />
                <p className="text-zinc-400 text-lg">No classes found for this filter.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Quick Info */}
      <section className="py-20 bg-zinc-900">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-8 text-center">
              <div className="bg-gradient-to-br from-[#c1121f] to-[#780000] w-14 h-14 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Calendar className="h-7 w-7 text-[#fdf0d5]" />
              </div>
              <h3 className="text-xl font-bold text-zinc-50 mb-2">Book in Advance</h3>
              <p className="text-zinc-400">Reserve your spot up to 7 days ahead to guarantee your place.</p>
            </div>

            <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-8 text-center">
              <div className="bg-gradient-to-br from-[#c1121f] to-[#780000] w-14 h-14 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Clock className="h-7 w-7 text-[#fdf0d5]" />
              </div>
              <h3 className="text-xl font-bold text-zinc-50 mb-2">Arrive Early</h3>
              <p className="text-zinc-400">Come 10 minutes before class starts to check in and prepare.</p>
            </div>

            <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-8 text-center">
              <div className="bg-gradient-to-br from-[#c1121f] to-[#780000] w-14 h-14 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Users className="h-7 w-7 text-[#fdf0d5]" />
              </div>
              <h3 className="text-xl font-bold text-zinc-50 mb-2">Unlimited Classes</h3>
              <p className="text-zinc-400">Premium and Elite members get unlimited access to all classes.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-zinc-950 via-[#780000]/20 to-zinc-950">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-black text-zinc-50 mb-6">
            Ready to Book Your First Class?
          </h2>
          <p className="text-xl text-zinc-300 mb-8">
            Join today and try your first class absolutely FREE!
          </p>
          <button className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-[#c1121f] to-[#780000] text-zinc-50 rounded-lg font-bold text-lg hover:shadow-xl hover:shadow-[#c1121f]/30 transition-all hover:scale-105">
            Start Free Trial
          </button>
        </div>
      </section>
    </div>
  );
}
