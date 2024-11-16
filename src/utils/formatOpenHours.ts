export const formatOpenHours = (openHours: any) => {
    const daysOfWeek = {
        mon: "Lunes",
        tue: "Martes",
        wed: "Miércoles",
        thu: "Jueves",
        fri: "Viernes",
        sat: "Sábado",
        sun: "Domingo",
    };

     // Ordered list of days from Monday to Sunday
     const orderedDays = [
        "mon", "tue", "wed", "thu", "fri", "sat", "sun"
    ];

    return orderedDays.map(day => {
        const dayName = daysOfWeek[day as keyof typeof daysOfWeek];
        const hours = openHours[day];

        if (hours.closed) {
            return `${dayName}: Cerrado`;
        }

        return `${dayName}: ${hours.from} a ${hours.to}`;
    }).join("\n"); // Join with a newline to separate days
};