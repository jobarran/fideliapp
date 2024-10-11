"use client";

import React, { useState, useEffect } from 'react';

const daysOfWeek = [
  { id: 'mon', label: 'Lunes' },
  { id: 'tue', label: 'Martes' },
  { id: 'wed', label: 'Miércoles' },
  { id: 'thu', label: 'Jueves' },
  { id: 'fri', label: 'Viernes' },
  { id: 'sat', label: 'Sábado' },
  { id: 'sun', label: 'Domingo' },
];

interface DayHours {
  from: string; 
  to: string;   
  closed: boolean; 
}

interface CompanyCreateWorkingHoursSelectorProps {
  openHours: { [key: string]: DayHours };
  setOpenHours: (days: { [key: string]: DayHours }) => void;
}

export const CompanyCreateWorkingHoursSelector: React.FC<CompanyCreateWorkingHoursSelectorProps> = ({
  openHours,
  setOpenHours,
}) => {
  const initialSelectedDays = daysOfWeek.reduce((acc, day) => {
    acc[day.id] = openHours[day.id] || { closed: false, from: '09:00', to: '17:00' };
    return acc;
  }, {} as { [key: string]: DayHours });

  const [selectedDays, setSelectedDays] = useState<{ [key: string]: DayHours }>(initialSelectedDays);

  const toggleDay = (day: string) => {
    setSelectedDays((prev) => {
      const isDaySelected = !!prev[day].from;
      if (isDaySelected) {
        return { ...prev, [day]: { from: '', to: '', closed: true } };
      } else {
        return { ...prev, [day]: { from: '09:00', to: '17:00', closed: false } };
      }
    });
  };

  const handleTimeChange = (day: string, time: 'from' | 'to', value: string) => {
    setSelectedDays((prev) => ({
      ...prev,
      [day]: { ...prev[day], [time]: value, closed: false },
    }));
  };

  useEffect(() => {
    // Create the openHours object based on selectedDays
    const formattedOpenHours = Object.keys(selectedDays).reduce((acc, day) => {
      const { from, to, closed } = selectedDays[day];
      if (closed) {
        acc[day] = { from: '', to: '', closed: true }; 
      } else {
        acc[day] = { from, to, closed: false };
      }
      return acc;
    }, {} as { [key: string]: DayHours });

    setOpenHours(formattedOpenHours);
  }, [selectedDays, setOpenHours]);

  return (
    <div className="flex flex-col">
      <div className="space-y-2">
        {daysOfWeek.map((day) => (
          <div key={day.id} className="flex items-center space-x-4">
            <input
              type="checkbox"
              checked={!selectedDays[day.id].closed}
              onChange={() => toggleDay(day.id)}
              className="h-4 w-4"
            />
            <label
              htmlFor={`day-${day.id}`}
              className="flex-grow text-slate-800 peer-checked:text-slate-800"
            >
              {day.label}
            </label>
            {!selectedDays[day.id].closed ? (
              <div className="flex space-x-1">
                <input
                  type="time"
                  value={selectedDays[day.id].from}
                  onChange={(e) => handleTimeChange(day.id, 'from', e.target.value)}
                  className="input border text-xs border-gray-300 p-1 rounded w-25" // Smaller size
                />
                <span>-</span>
                <input
                  type="time"
                  value={selectedDays[day.id].to}
                  onChange={(e) => handleTimeChange(day.id, 'to', e.target.value)}
                  className="input border text-xs border-gray-300 p-1 rounded w-25" // Smaller size
                />
              </div>
            ) : (
              <p className="text-sm italic p-1">Cerrado</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};