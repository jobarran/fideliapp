import { translucentColor } from "@/utils";

interface Props {
    label: string;
    colors: string[];
    selectedColor: string;
    onChange: (color: string) => void; isEditing: boolean;
    divClassName?: string;
    labelClassName?: string;
    pickerClassName?: string;
    size: string;
}

export const ColorPicker = ({
    label,
    colors,
    selectedColor,
    onChange,
    isEditing,
    divClassName,
    labelClassName,
    pickerClassName,
    size
}: Props) => {
    return (
        <div className={divClassName}>
            <label className={labelClassName}>{label}:</label>
            <div className={pickerClassName}>
                {colors.map((color) => (
                    <div
                        key={color}
                        className={`cursor-pointer rounded-full w-${size} h-${size} border border-slate-400`}
                        style={{
                            backgroundColor: color,
                            opacity: translucentColor(color, selectedColor),
                        }}
                        onClick={() => isEditing && onChange(color)}
                    />
                ))}
            </div>
        </div>
    )
}


