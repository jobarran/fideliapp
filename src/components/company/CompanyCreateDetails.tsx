import { CompanyCreateWorkingHoursSelector, CreateCompanyMapContainer } from '@/components';

interface CompanyDetailsProps {
  register: any;
  watch: any;
  isValid: boolean;
  openHours: { [key: string]: { from: string; to: string } };
  setOpenHours: (openHours: { [key: string]: { from: string; to: string } }) => void;
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
          <CompanyCreateWorkingHoursSelector openHours={openHours} setOpenHours={setOpenHours} />
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
