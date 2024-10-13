"use client"

import { CreateCompanyMapContainer, OpenHoursSection } from '@/components';
import { defaultOpenHours } from '@/config';
import { DayHours } from '@/interfaces';
import { useEffect } from 'react';

interface CompanyDetailsProps {
  register: any;
  watch: any;
  isValid: boolean;
  openHours: { [key: string]: DayHours };
  setOpenHours: (openHours: { [key: string]: DayHours }) => void;
  address: string;
  setAddress: (address: string) => void;
  lat: number;
  setLat: (lat: number) => void;
  lng: number;
  setLng: (lng: number) => void;
  activityTypes: Array<{ id: string; name: string }>;
  setActivityType: (activityType: string) => void;
}

export const CompanyDetails = ({
  register,
  watch,
  isValid,
  openHours,
  setOpenHours,
  address,
  setAddress,
  lat,
  setLat,
  lng,
  setLng,
  activityTypes,
  setActivityType
}: CompanyDetailsProps) => {

  useEffect(() => {
    if (!openHours || Object.keys(openHours).length === 0) {
      setOpenHours(defaultOpenHours()); // Set default open hours
    }
  }, [openHours, setOpenHours]);

  
  // Function to handle hour changes
  const handleHourChange = (e: React.ChangeEvent<HTMLInputElement>, day: string, type: 'from' | 'to') => {
    const updatedHours = {
      ...openHours,
      [day]: {
        ...openHours[day],
        [type]: e.target.value,   // Update the selected hour (from/to)
        closed: false             // Mark the day as open
      }
    };
    setOpenHours(updatedHours);
  };

  // Function to handle checkbox (open/closed) changes
  const handleCheckboxChange = (day: string, checked: boolean) => {
    const updatedHours = {
      ...openHours,
      [day]: {
        ...openHours[day],
        closed: !checked,           // If checked, set closed to false; if unchecked, set closed to true
        from: checked ? openHours[day].from || '09:00' : '',  // Clear hours if closed
        to: checked ? openHours[day].to || '17:00' : ''
      }
    };
    setOpenHours(updatedHours);
  };

  return (
    <>
      <h2 className="text-xl font-semibold mb-10 flex justify-center">Información del negocio</h2>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
        <div className="flex flex-col space-y-4">
          {/* Name */}
          <input
            id="name"
            {...register('name', { required: 'Company name is required' })}
            className="input border border-gray-300 p-2 rounded"
            placeholder="Company Name"
          />
          {/* Open Days */}
          <OpenHoursSection
            openHours={openHours}
            onHourChange={handleHourChange}
            onCheckboxChange={handleCheckboxChange}
            isEditing={true}
            label={''}
            divClassName={'mb-4'}
            labelClassName={'font-medium hidden sm:flex'}
            sectionClassName={'grid grid-cols-3 gap-4 items-center mb-1'}
          />

          {/* Activity Type */}
          <select
            {...register('activityTypeId', { required: 'Tipo de actividad' })}
            className="input border border-gray-300 p-2 rounded"
            onChange={(e) => {
              const selectedType = activityTypes.find((type) => type.id === e.target.value);
              if (selectedType) {
                setActivityType(selectedType.name); // Set the selected type name
              }
            }}
          >
            <option value="">Tipo de actividad</option>
            {activityTypes.map((type) => (
              <option key={type.id} value={type.id}>
                {type.name}
              </option>
            ))}
          </select>
          {/* Accept Referral */}
          <div className="flex items-center space-x-3">
            <input
              type="checkbox"
              id="acceptReferral"
              {...register('acceptReferral')}
              className="h-4 w-4"
            />
            <label htmlFor="acceptReferral" className="text-sm font-medium italic">
              Aceptar referidos
            </label>
          </div>
        </div>

        {/* Address */}
        <CreateCompanyMapContainer setAddress={setAddress} setLat={setLat} setLng={setLng} />
      </div>
    </>
  );
};
