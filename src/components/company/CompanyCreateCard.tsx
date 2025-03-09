'use client';

import clsx from 'clsx';
import { useEffect, useState } from 'react';
import { CompanyCard } from '..';
import { Vibrant } from 'node-vibrant/browser'; // Correct import for the browser version
import { FiEdit } from 'react-icons/fi';

interface CompanyLogoAndColorProps {
    register: any;
    selectedColor: string;
    setSelectedColor: (color: string) => void;
    selectedTextColor: string;
    setSelectedTextColor: (color: string) => void;
    name: string;
    address: string;
    activityType: string;
}

export const CompanyCreateCard = ({
    register,
    selectedColor,
    setSelectedColor,
    name,
    address,
    activityType,
    selectedTextColor,
    setSelectedTextColor
}: CompanyLogoAndColorProps) => {
    const [logo, setLogo] = useState<string>(''); // State to store the uploaded logo
    const [dynamicColors, setDynamicColors] = useState<string[]>([]); // State for extracted colors from the logo

    // Handle logo change and extract colors
    const handleLogoChange = async (imageUrl: string) => {
        try {
            const vibrant = new Vibrant(imageUrl);  // Use the Vibrant class directly for browser
            const palette = await vibrant.getPalette();  // Extract the palette

            console.log('Extracted palette:', palette); // Log the entire palette object to check if it's retrieved correctly

            // Check if palette is an empty object or contains swatches
            const extractedColors = Object.values(palette)
                .map((swatch) => swatch?.hex) // Directly accessing the `hex` value
                .filter(Boolean) as string[];

            console.log('Extracted colors:', extractedColors); // Log the extracted colors

            // Limit to top 5 colors
            const top5Colors = extractedColors.slice(0, 9);
            if (top5Colors.length > 0) {
                setDynamicColors(top5Colors); // Update dynamic colors with the top 5 colors
            } else {
                console.log('No colors extracted from the logo');
            }
        } catch (error) {
            console.error('Error extracting colors from the logo:', error);
        }
    };

    // UseEffect to update dynamicColors if logo is changed
    useEffect(() => {
        if (logo) {
            handleLogoChange(logo); // Trigger color extraction when logo URL is set
        }
    }, [logo]); // Only run when logo URL changes

    // Handle logo change input
    const handleLogoInputChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
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
                        textColor={selectedTextColor} // Pass the textColor to the CompanyCard
                    />
                </div>

                {/* Right Column: Color Picker and Logo Input */}
                <div className="flex-1">
                    {/* Logo Upload */}
                    <div className="flex flex-col mb-4">
                        <input
                            type="file"
                            {...register('logo')}
                            className="block w-full border border-slate-300 rounded-lg text-sm focus:z-10 disabled:opacity-50 disabled:pointer-events-none file:bg-slate-80 file:border-0 file:me-4 file:py-3 file:px-4"
                            accept="image/png, image/jpeg"
                            onChange={handleLogoInputChange} // Handle input change
                        />
                        <p className="mt-1 text-sm text-gray-500" id="file_input_help">PNG or JPG</p>
                    </div>

                    {/* Label and Color Picker for Logo Colors */}
                    {logo && (
                        <div className="flex flex-col mb-4">
                            <div className="flex space-x-2">
                                {dynamicColors.length > 0 ? (
                                    dynamicColors.map((color, index) => (
                                        <div
                                            key={`${color}-${index}`}  // Add index to make sure the key is unique
                                            onClick={() => setSelectedColor(color)}
                                            className={clsx(
                                                'w-10 h-10 rounded cursor-pointer',
                                                selectedColor === color ? 'ring-4 ring-offset-2 ring-slate-800' : ''
                                            )}
                                            style={{ backgroundColor: color }}
                                        ></div>
                                    ))
                                ) : (
                                    <></>
                                )}
                            </div>
                        </div>
                    )}

                    {/* Label and Normal Color Picker with Adjustments for Background Color */}
                    <div className="flex flex-col relative cursor-pointer mb-1">
                        <input
                            type="color"
                            value={selectedColor}
                            onChange={(e) => setSelectedColor(e.target.value)}
                            className="w-auto h-10 rounded-md border-none cursor-pointer"
                        />
                        <p className="absolute text-sm top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-slate-400">Color de fondo</p>
                    </div>

                    {/* Label and Color Picker for Text Color */}
                    <div className="flex flex-col relative cursor-pointer">
                        <input
                            type="color"
                            value={selectedTextColor}
                            onChange={(e) => setSelectedTextColor(e.target.value)} // Handle text color change
                            className="w-auto h-10 rounded-md border-none cursor-pointer"
                        />
                        <p className="absolute text-sm top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-slate-400">Color de texto</p>
                    </div>

                    <input type="hidden" {...register('backgroundColor')} value={selectedColor} />
                    <input type="hidden" {...register('textColor')} value={selectedTextColor} /> {/* Add hidden input for textColor */}
                </div>
            </div>
        </>
    );
};
