"use client";

import { colorOptions } from '@/config';
import clsx from 'clsx';
import { useEffect, useState } from 'react';
import { CompanyCard } from '..';

interface CompanyLogoAndColorProps {
    register: any;
    selectedColor: string;
    setSelectedColor: (color: string) => void;
    name: string;          // Add this line
    address: string;       // Add this line
    activityType: string
}

export const CompanyCreateCard = ({
    register,
    selectedColor,
    setSelectedColor,
    name,
    address,
    activityType
}: CompanyLogoAndColorProps) => {

    const [logo, setLogo] = useState<string>(''); // State to store the uploaded logo

    useEffect(() => {
        setSelectedColor(colorOptions[0])
    }, [])

    // Handle logo change
    const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            // Create a URL for the uploaded file
            const file = e.target.files[0];
            const imageUrl = URL.createObjectURL(file);
            setLogo(imageUrl); // Set the image URL for preview
        }
    };

    return (
        <>

            <h2 className="text-xl font-semibold mb-10 flex justify-center">Diseño de tarjeta</h2>

            {/* Responsive Layout */}
            <div className="flex flex-col lg:flex-row lg:space-x-4 w-full">

                {/* Left Column: Company Card */}
                <div className="flex-1 mb-2 lg:mb-0 flex justify-center">
                    <CompanyCard
                        logo={logo}
                        name={name}
                        address={address}
                        backgroundColor={selectedColor}
                        activityType={activityType}
                    />
                </div>

                {/* Right Column: Color Picker and Logo Input */}
                <div className="flex-1">
                    {/* Background Color Picker */}
                    <div className="flex space-x-2 mb-4 justify-center lg:justify-normal">
                        {colorOptions.map((color) => (
                            <div
                                key={color}
                                onClick={() => setSelectedColor(color)}
                                className={clsx(
                                    'w-10 h-10 rounded cursor-pointer',
                                    selectedColor === color ? 'ring-4 ring-offset-2 ring-slate-800' : '',
                                    color === '#FFFFFF' ? 'border border-slate-600' : '' // Add border to #FFFFFF
                                )}
                                style={{ backgroundColor: color }}
                            ></div>
                        ))}
                    </div>
                    <input type="hidden" {...register('backgroundColor')} value={selectedColor} />

                    {/* Logo Upload */}
                    <div className="flex flex-col mb-2">
                        <span className='block mb-2 text-sm font-medium text-gray-900'>Choose profile photo</span>
                        <input
                            type="file"
                            {...register('logo')}
                            className="block w-full border border-gray-200 shadow-sm rounded-lg text-sm focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none file:bg-gray-50 file:border-0 file:me-4 file:py-3 file:px-4"
                            accept="image/png, image/jpeg"
                            onChange={handleLogoChange}
                        />
                        <p className="mt-1 text-sm text-gray-500" id="file_input_help">PNG or JPG</p>
                    </div>

                </div>
            </div>
        </>
    );
};