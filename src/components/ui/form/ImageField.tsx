interface Props {
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    disabled: boolean;
    divClassName?: string;
    label: string;
    labelClassName?: string;
}

export const ImageField = ({
    onChange,
    disabled,
    divClassName,
    label,
    labelClassName
}: Props) => (
    <div className={divClassName}>
        <label className={labelClassName}>{label}</label>
        <input
            type="file"
            className="block w-full border border-gray-200 shadow-sm rounded-lg text-sm focus:z-10 disabled:opacity-50 disabled:pointer-events-none file:bg-gray-50 file:border-0 file:me-4 file:py-3 file:px-4"
            accept="image/png, image/jpeg"
            disabled={disabled}
            onChange={onChange}
        />
        <p className="mt-1 text-sm text-gray-500" id="file_input_help">PNG or JPG</p>
    </div>
);