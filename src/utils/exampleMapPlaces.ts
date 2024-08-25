// locations.ts
export type Place = {
    lat: number;
    lng: number;
    name: string;
    openHours: string;
};

export const places: Place[] = [
    {
        lat: -34.574126483988415,
        lng: -58.459134161464256,
        name: "Business 1",
        openHours: "8:00 AM - 10:00 PM",
    },
    {
        lat: -34.57212258589278,
        lng: -58.45576932186489,
        name: "Business 2",
        openHours: "9:00 AM - 11:00 PM",
    },
];
