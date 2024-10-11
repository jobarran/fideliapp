interface Props {
    label: string;
    checked: boolean;
    onChange: () => void;
    disabled: boolean;
    divClassName?: string;
    labelClassName?: string;
    inputClassName?: string
}

export const CheckboxField = ({ label,
    checked,
    onChange,
    disabled,
    divClassName,
    labelClassName,
    inputClassName
}: Props) => {
    return (
        <div className={divClassName}>
            <label htmlFor={label} className={labelClassName}>
                {label}
            </label>
            <input
                id={label}
                type="checkbox"
                checked={checked}
                onChange={onChange}
                disabled={disabled}
                className={inputClassName}
            />
        </div>
    )
}