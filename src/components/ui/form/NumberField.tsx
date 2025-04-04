interface Props {
    label: string;
    placeholder?: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    disabled: boolean;
    divClassName?: string;
    labelClassName?: string;
    inputClassName?: string;
}

export const NumberField = ({
    label,
    placeholder,
    value,
    onChange,
    disabled,
    divClassName,
    labelClassName,
    inputClassName
}: Props) => (
    <div className={divClassName}>
        <label className={labelClassName}>{label}</label>
        <input
            type="number"
            value={value}
            onChange={onChange}
            disabled={disabled}
            className={inputClassName}
        />
    </div>
);