"use client";

import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // Import icons for show/hide

interface PasswordFieldProps {
    label: string;
    placeholder?: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    disabled: boolean;
    divClassName?: string;
    labelClassName?: string;
    inputClassName?: string;
}

export const PasswordField = ({
    label,
    placeholder,
    value,
    onChange,
    disabled,
    divClassName,
    labelClassName,
    inputClassName,
}: PasswordFieldProps) => {
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword((prev) => !prev);
    };

    return (
        <div className='grid grid-cols-1 sm:grid-cols-5 gap-2 items-center mb-2'>
            <label className="font-medium hidden sm:flex">{label}</label>
            <div className="relative col-span-2">
                <input
                    type={showPassword ? "text" : "password"} // Toggle between password and text
                    value={value}
                    onChange={onChange}
                    disabled={disabled}
                    placeholder={placeholder}
                    className={`border pl-3 pr-10 py-1 rounded w-full ${inputClassName}`} // Added py-2 for better vertical padding
                />
                <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                >
                    {showPassword ? (
                        <FaEyeSlash size={20} />
                    ) : (
                        <FaEye size={20} />
                    )}
                </button>
            </div>
        </div>
    );
};
