interface Props {
    label: string;
    placeholder: string;
    options: Array<{ id: string; name: string }>;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    isEditing: boolean;
    divClassName?: string;
    labelClassName?: string;
    selectClassName?: string;
}

export const SelectField = ({
    label,
    placeholder,
    options,
    value,
    onChange,
    isEditing,
    divClassName,
    labelClassName,
    selectClassName
}: Props) => (
    <div className="mb-4">
        <div className={divClassName}>
            <label className={labelClassName}>{label}:</label>
            <select
                className={`${!isEditing ? 'bg-gray-50 text-black border-gray-200' : ''} ${selectClassName}`}
                value={value}
                onChange={onChange}
                disabled={!isEditing}
            >
                <option value="">{placeholder}</option>
                {options.map((option) => (
                    <option key={option.id} value={option.id}>
                        {option.name}
                    </option>
                ))}
            </select>
        </div>
    </div>
);