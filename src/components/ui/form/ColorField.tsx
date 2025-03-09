"use client"

import { ElementType, useRef } from "react";
import { IconType } from "react-icons";

interface Props {
  label: string;
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled: boolean;
  divClassName?: string;
  labelClassName?: string;
  inputClassName?: string;
  icon?: IconType | ElementType; // Allow IconType or custom component
}

export const ColorField = ({
  label,
  placeholder,
  value,
  onChange,
  disabled,
  divClassName = "",
  labelClassName = "",
  inputClassName = "",
}: Props) => {
  const colorInputRef = useRef<HTMLInputElement | null>(null); // Ref to target the input

  return (
    <div className={divClassName}>
      <div className={`relative w-full col-span-2`}>
        <input
          ref={colorInputRef} // Attach the ref here
          type="color"
          value={value}
          onChange={onChange}
          disabled={disabled}
          placeholder={placeholder}
          className={`${inputClassName} ${disabled ? 'cursor-default' : 'cursor-pointer'}`}
          style={{
            border: "none", // No border
            outline: "none", // No outline
            boxShadow: "none", // No shadow
            padding: 0, // No padding
            borderRadius: "5px", // Rounded corners
            appearance: "none", // Remove default browser appearance
            background: "transparent", // Transparent background
            boxSizing: "border-box", // Ensures no additional box-sizing behavior
            backgroundColor: "transparent", // Makes sure the background is fully transparent
          }}
        />
        <p
          className={`${labelClassName} ${disabled ? 'cursor-default' : 'cursor-pointer'}`}
          tabIndex={0} // Makes the label focusable
          onClick={() => {
            colorInputRef.current?.click(); // Trigger the click on the specific input element
          }}
        >
          {label}
        </p>
      </div>
    </div>
  );
};
