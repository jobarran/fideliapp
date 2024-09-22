import React from 'react';

interface CompanyOpenHoursSelectorProps {
  openHours: string;
  setOpenHours: (hours: string) => void;
}

export const CompanyCreateOpenHoursSelector: React.FC<CompanyOpenHoursSelectorProps> = ({ openHours, setOpenHours }) => {
  return (
    <div className="flex flex-col">
      <label htmlFor="openHours" className="mb-2 font-semibold">Open Hours</label>
      <input
        id="openHours"
        value={openHours}
        onChange={(e) => setOpenHours(e.target.value)}
        className="input border border-gray-300 p-2 rounded"
        placeholder="e.g., 9am - 5pm"
      />
    </div>
  );
};
