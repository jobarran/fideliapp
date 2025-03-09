interface Props {
    label: string;
    placeholder?: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    disabled: boolean;
    divClassName?: string;
    labelClassName?: string;
    inputClassName?: string;
    rows?: number
}

export const TextAreaField = ({
    label,
    placeholder,
    value,
    onChange,
    disabled,
    divClassName,
    labelClassName,
    inputClassName,
    rows = 5
}: Props) => (
    <div className={divClassName}>
        <label className={labelClassName}>{label}</label>
        <textarea
            value={value}
            onChange={onChange}
            disabled={disabled}
            className={inputClassName}
            rows={rows}
            maxLength={1000}
            placeholder={'¿Quienes somos?'}
        />
    </div>
);