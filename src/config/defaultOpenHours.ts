interface DayHours {
    closed: boolean;
    from: string;
    to: string;
}
export const defaultOpenHours = (): Record<string, DayHours> => ({
    mon: { from: "09:00", to: "17:00", closed: false },
    tue: { from: "09:00", to: "17:00", closed: false },
    wed: { from: "09:00", to: "17:00", closed: false },
    thu: { from: "09:00", to: "17:00", closed: false },
    fri: { from: "09:00", to: "17:00", closed: false },
    sat: { from: "09:00", to: "17:00", closed: false },
    sun: { from: "09:00", to: "17:00", closed: false },
});