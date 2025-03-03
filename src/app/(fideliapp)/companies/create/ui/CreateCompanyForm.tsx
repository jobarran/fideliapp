"use client";

import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { generateSlug } from '@/utils';
import { CompanyCreateCard, CompanyDetails } from '@/components';
import { useRouter } from 'next/navigation';
import { User } from '@/interfaces';
import { getActivityTypes, registerCompany } from '@/actions';
import clsx from 'clsx';
import { colorOptions } from '@/config';
import { FaSpinner } from 'react-icons/fa';

interface DayHours {
  from: string;
  to: string;
  closed: boolean;
}

type FormInputs = {
  name: string;
  backgroundColor: string;
  address: string;
  slug: string;
  lat: number;
  lng: number;
  openHours: string;
  activityTypeId: string;
  logo?: FileList | undefined;
  active: true;
  description: string;
  instagram: string;
  facebook: string;
  twitter: string;
  whatsapp: string;
  phone: string;
  site: string;
  validated: boolean
};

interface Props {
  userId?: string
}

export const CreateCompanyForm = ({ userId }: Props) => {
  const router = useRouter();

  const [slug, setSlug] = useState<string>('');
  const [selectedColor, setSelectedColor] = useState<string>(colorOptions[0]); // Default color
  const [address, setAddress] = useState<string>('');
  const [lat, setLat] = useState<number>(0);
  const [lng, setLng] = useState<number>(0);
  const [openHours, setOpenHours] = useState<{ [key: string]: DayHours }>({});
  const [activityTypes, setActivityTypes] = useState<Array<{ id: string, name: string }>>([]);
  const [activityType, setActivityType] = useState<string>('')
  const [currentStep, setCurrentStep] = useState<number>(1); // Step state for rendering cards
  const [loading, setLoading] = useState(false); // State to track form submission

  const {
    handleSubmit,
    register,
    watch,
    formState: { isValid },
  } = useForm<FormInputs>({
    mode: 'onChange',
    defaultValues: {
      name: '',
      backgroundColor: selectedColor,
      address: '',
      slug: '',
      lat: 0,
      lng: 0,
      openHours: '',
      activityTypeId: '',
      active: true,
      description: '',
      instagram: '',
      facebook: '',
      twitter: '',
      whatsapp: '',
      phone: '',
      site: '',
      validated: false,
    }
  });

  const nameValue = watch('name');
  const activityTypeId = watch('activityTypeId'); // Watch the activityTypeId

  // Redirect if no session
  useEffect(() => {
    if (!userId) {
      const callbackUrl = encodeURIComponent(window.location.href);
      router.push(`/auth/login?callbackUrl=${callbackUrl}`);
    }
  });

  // Fetch activity types on component mount
  useEffect(() => {
    const fetchActivityTypes = async () => {
      const types = await getActivityTypes();
      setActivityTypes(types);
    };
    fetchActivityTypes();
  }, []);

  useEffect(() => {
    if (nameValue && userId) {
      const newSlug = generateSlug(nameValue, userId);
      setSlug(newSlug);
    }
  }, [nameValue, userId]);

  const onSubmit = async (data: FormInputs) => {
    setLoading(true);

    const formData = new FormData();

    const { logo, ...companyToSave } = data;

    // Append individual fields to FormData
    formData.append("name", companyToSave.name);
    formData.append("activityTypeId", companyToSave.activityTypeId);
    formData.append("backgroundColor", selectedColor);
    formData.append("address", address);
    formData.append("lat", lat.toString());
    formData.append("lng", lng.toString());
    formData.append("openHours", JSON.stringify(openHours)); // Serialize to JSON string
    formData.append("slug", slug);
    formData.append("description", companyToSave.description);
    formData.append("facebook", companyToSave.facebook);
    formData.append("site", companyToSave.site);
    formData.append("twitter", companyToSave.twitter);
    formData.append("instagram", companyToSave.instagram);
    formData.append("phone", companyToSave.phone);
    formData.append("whatsapp", companyToSave.whatsapp);



    if (logo && logo.length > 0) {
      formData.append('logo', logo[0]);
    }

    const { message, ok } = await registerCompany(formData);
    if (ok) {
      router.replace(`/client/${userId}`)
    }
    setLoading(false)

  };

  return (
    <div className="bg-white p-8 border rounded-lg mx-auto">
      <form onSubmit={handleSubmit(onSubmit)}>
        {currentStep === 1 && ( // First Card
          <CompanyDetails
            register={register}
            watch={watch}
            isValid={isValid}
            openHours={openHours}
            setOpenHours={setOpenHours}
            address={address}
            setAddress={setAddress}
            lat={lat}
            setLat={setLat}
            lng={lng}
            setLng={setLng}
            activityTypes={activityTypes}
            setActivityType={setActivityType}
          />
        )}

        {currentStep === 2 && ( // Second Card
          <CompanyCreateCard
            register={register}
            selectedColor={selectedColor}
            setSelectedColor={setSelectedColor}
            name={nameValue}
            address={address}
            activityType={activityType}
          />
        )}

        <div className="flex justify-end mt-4">
          {currentStep === 1 && ( // Show "Siguiente" button on first step
            <button
              type="button"
              onClick={() => setCurrentStep(2)}
              disabled={!isValid || Object.keys(openHours).length === 0 || address.trim() === ''}
              className={clsx(
                'h-10 mt-4 py-2 px-4 w-full rounded font-semibold text-white',
                !isValid || Object.keys(openHours).length === 0 || address.trim() === ''
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-slate-800 hover:bg-slate-950'
              )}
            >
              Siguiente
            </button>
          )}

          {currentStep === 2 && (
            <button
              disabled={!isValid || loading}
              type="submit"
              className={clsx(
                'h-10 mt-4 py-2 px-4 w-full rounded font-semibold text-white flex items-center justify-center',
                isValid
                  ? 'bg-slate-800 hover:bg-slate-950'
                  : 'bg-gray-400 cursor-not-allowed'
              )}
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <div className="w-5 h-5 border-2 border-gray-300 border-t-slate-800 rounded-full animate-spin"></div>
                </div>
              ) : (
                "Crear"
              )}
            </button>
          )}
        </div>

      </form>
    </div>
  );
};

export default CreateCompanyForm;
