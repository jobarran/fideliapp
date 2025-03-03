import React from 'react'

type OpenHours = {
    [key: string]: {
        from?: string;
        to?: string;
        closed: boolean;
    };
};

interface Props {
    openHours: OpenHours | null
}


export const CompanyOpenHours: React.FC<Props> = ({ openHours }) => {

    const daysOfWeek: Record<string, string> = {
        mon: "Lunes",
        tue: "Martes",
        wed: "Miércoles",
        thu: "Jueves",
        fri: "Viernes",
        sat: "Sábado",
        sun: "Domingo",
    };

    // Default message for missing or null openHours
    const defaultMessage = "Sin información";

    // Normalize openHours if it's null, filling in missing days with the default message
    const normalizedOpenHours = openHours ?? Object.fromEntries(
        Object.keys(daysOfWeek).map((key) => [key, { closed: true }])
    );

    return (
        <div >
            <h3 className="text-base font-semibold text-gray-800">Horarios</h3>
            <div className="grid grid-cols-[auto_1fr] gap-x-4 text-xs sm:text-sm">
                {Object.entries(normalizedOpenHours).map(([day, hours]) => (
                    <React.Fragment key={day}>
                        {/* Day Name Column */}
                        <div className="text-slate-800">{daysOfWeek[day]}</div>

                        {/* Hours Column */}
                        <div className="text-left text-slate-500">
                            {hours.closed
                                ? "Cerrado"
                                : hours.from && hours.to
                                    ? `${hours.from} a ${hours.to}`
                                    : defaultMessage}
                        </div>
                    </React.Fragment>
                ))}
            </div>
        </div>
    );
};
