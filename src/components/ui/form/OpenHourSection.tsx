import { DayHours } from "@/interfaces";
import { dayTranslations } from "@/utils";

interface Props {
    label: string;
    openHours: Record<string, DayHours>;
    onHourChange: (
        e: React.ChangeEvent<HTMLInputElement>,
        day: string,
        type: 'from' | 'to'
    ) => void;
    onCheckboxChange: (day: string, checked: boolean) => void;
    isEditing: boolean;
    divClassName: string;
    labelClassName: string;
    sectionClassName: string;
}

export const OpenHoursSection = ({
    label,
    openHours,
    onHourChange,
    onCheckboxChange,
    isEditing,
    divClassName,
    labelClassName,
    sectionClassName
}: Props) => {
    return (
        <div className={divClassName}>
            <h3 className={labelClassName}>{label}</h3>
            {Object.keys(openHours || {}).length > 0 ? (
                <div className="flex flex-col">
                    {Object.entries(openHours || {}).map(([day, hours]) => (
                        <div key={day} className={sectionClassName}>
                            <div className='flex'>
                                <div className="flex items-center">
                                    <input
                                        type="checkbox"
                                        checked={!hours?.closed}
                                        onChange={(e) => onCheckboxChange(day, e.target.checked)}
                                        disabled={!isEditing}
                                        className="mr-2"
                                    />
                                </div>
                                <div className="capitalize py-1">{dayTranslations[day]}</div>
                            </div>

                            {/* If closed, show "Cerrado" instead of time inputs */}
                            {hours.closed ? (
                                <div className="col-span-2 text-sm text-gray-600 italic py-1">Cerrado</div>
                            ) : (
                                <>
                                    <input
                                        type="time"
                                        value={hours?.from || ''}
                                        onChange={(e) => onHourChange(e, day, 'from')}
                                        disabled={!isEditing}
                                        className="border rounded text-sm py-1 pl-1"
                                    />
                                    <input
                                        type="time"
                                        value={hours?.to || ''}
                                        onChange={(e) => onHourChange(e, day, 'to')}
                                        disabled={!isEditing}
                                        className="border rounded text-sm py-1 pl-1"
                                    />
                                </>
                            )}
                        </div>
                    ))}
                </div>
            ) : (
                <p>No se han proporcionado horarios de apertura.</p>
            )}
        </div>
    )
}
