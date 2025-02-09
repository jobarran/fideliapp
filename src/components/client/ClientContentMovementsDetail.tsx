interface Props {
    label: string;
    value: string | number;
    smScreenValue?: string;
    xsScreenValue?: string;
    color?: string;
    width?: string;
    className?: string; // Add className as an optional prop
}

export const ClientContentMovementsDetail = ({
    label,
    value,
    smScreenValue,
    xsScreenValue,
    width = '',
    color = '',
    className = '',
}: Props) => (
    <div className={`flex flex-col items-center justify-center ${width} ${className}`}>
        {/* Label for larger screens */}
        <p className="hidden sm:flex text-xs text-slate-400">{label}</p>
        {/* Full value for large screens */}
        <p className={`flex text-sm font-medium sm:mt-1 ${color} w-full items-center justify-center text-center`}>
            <span className="inline-block max-w-full overflow-hidden whitespace-nowrap text-ellipsis text-left">
                {value}
            </span>
        </p>
    </div>
);
