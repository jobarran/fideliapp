"use client";

import { useSession } from 'next-auth/react';
import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { colorOptions } from '@/config';
import { generateSlug } from '@/utils';
import clsx from 'clsx';
import { CompanyCreateWorkingHoursSelector, CreateCompanyMapContainer } from '@/components';

interface DayHours {
  from: string;
  to: string;
}

type FormInputs = {
  name: string;
  backgroundColor: string;
  acceptReferral: boolean;
  address: string;
  slug: string;
  lat: number;
  lng: number;
  openDays: string;
};

export const CreateCompanyForm = () => {
  const { data: session } = useSession({ required: true });

  const [slug, setSlug] = useState<string>('');
  const [selectedColor, setSelectedColor] = useState<string>(colorOptions[0]);
  const [address, setAddress] = useState<string>('');
  const [lat, setLat] = useState<number>(0);
  const [lng, setLng] = useState<number>(0);
  const [openDays, setOpenDays] = useState<{ [key: string]: DayHours }>({});

  const {
    handleSubmit,
    register,
    watch,
    formState: { isValid, errors },
  } = useForm<FormInputs>({
    mode: 'onChange', // Enforce validation on change
    defaultValues: {
      name: '',
      backgroundColor: selectedColor,
      acceptReferral: false,
      address: '',
      slug: '',
      lat: 0,
      lng: 0,
      openDays: '',
    }
  });

  const nameValue = watch('name');

  useEffect(() => {
    if (nameValue && session?.user?.id) {
      const newSlug = generateSlug(nameValue, session.user.id);
      setSlug(newSlug);
    }
  }, [nameValue, session?.user?.id]);

  const onSubmit = async (data: FormInputs) => {
    const formData = {
      ...data,
      slug,
      address,
      lat,
      lng,
      openDays,
    };
    console.log(formData);
  };

  return (
    <div className="bg-white p-8 shadow-lg rounded-lg mx-auto">

      <form onSubmit={handleSubmit(onSubmit)} >

        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>

          {/* Name */}
          <div className="flex flex-col space-y-4">

            <input
              id="name"
              {...register('name', { required: 'Company name is required' })}
              className="input border border-gray-300 p-2 rounded"
              placeholder="Company Name"
            />

            {/* Background Color */}
            <div className="flex space-x-2">
              {colorOptions.map((color) => (
                <div
                  key={color}
                  onClick={() => setSelectedColor(color)}
                  className={clsx(
                    'w-10 h-10 rounded cursor-pointer',
                    selectedColor === color ? 'ring-4 ring-offset-2 ring-slate-800' : ''
                  )}
                  style={{ backgroundColor: color }}
                ></div>
              ))}
            </div>
            <input type="hidden" {...register('backgroundColor')} value={selectedColor} />

            {/* Slug (Disabled) */}
            <div className="hidden">
              <input
                id="slug"
                value={slug}
                disabled
                className="input border border-gray-300 p-2 rounded bg-gray-100"
              />
            </div>

            {/* Open Days */}
            <CompanyCreateWorkingHoursSelector openDays={openDays} setOpenDays={setOpenDays} />

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

        {/* Submit Button */}
        <button
          disabled={!isValid || Object.keys(openDays).length === 0}
          type="submit"
          className={clsx(
            'mt-4 py-2 px-4 w-full rounded font-semibold text-white',
            isValid && Object.keys(openDays).length > 0 && address.trim() !== ""
              ? 'bg-slate-800 hover:bg-slate-950'
              : 'bg-gray-400 cursor-not-allowed'
          )}
        >
          Crear
        </button>
      </form>
    </div >
  );
};
