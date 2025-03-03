import { ElementType } from "react";
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

export const TextField = ({
  label,
  placeholder,
  value,
  onChange,
  disabled,
  divClassName = "",
  labelClassName = "",
  inputClassName = "",
  icon: Icon,
}: Props) => (
  <div className={divClassName}>
    <label className={labelClassName}>{label}</label>
    <div className={`relative w-full col-span-2`}>
      {Icon && (
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <Icon className="text-slate-600 font-semibold" />
        </div>
      )}
      <input
        type="text"
        value={value}
        onChange={onChange}
        disabled={disabled}
        placeholder={placeholder}
        className={`${inputClassName}`} // Add padding to account for icon
      />
    </div>
  </div>
);
