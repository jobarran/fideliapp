interface Props {
    label: string;
    value: string | number;
    smScreenValue?: string;
    color?: string;
    width?: string;
    className?: string; // Add className as an optional prop
}

export const ClientContentMovementsDetail = ({
    label,
    value,
    smScreenValue,
    width = '',
    color = '',
    className = '', // Default to an empty string if no className is passed
}: Props) => (
    <div className={`flex flex-col items-center justify-center ${width} ${className}`}>
        {/* For larger screens, show the label */}
        <p className="hidden sm:flex text-xs text-slate-400">{label}</p>

        {/* For larger screens, show the full value with truncation if needed */}
        <p className={`hidden sm:flex text-sm font-medium sm:mt-1 ${color} truncate`}>
            {value}
        </p>

        {/* For small screens, display smScreenValue or the regular value */}
        <p className={`flex sm:hidden text-sm font-medium sm:mt-1 ${color} truncate`}>
            {smScreenValue || value}
        </p>
    </div>
);
