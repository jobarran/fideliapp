import { allActivityTypes } from "@/config";
import { FaQuestionCircle } from "react-icons/fa";

interface ActivityTypeResult {
    icon: React.ElementType;
    color: string;
}

const normalizeString = (str: string): string => {
    return str ? str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase() : "";
};

export const getActivityTypeDetails = (activityType: string): ActivityTypeResult => {

    // Ensure activityType is a valid string
    if (!activityType || typeof activityType !== "string") {
        return {
            icon: FaQuestionCircle, // Default icon
            color: "#CCCCCC", // Default color (light gray)
        };
    }

    const normalizedActivityType = normalizeString(activityType);

    // Fallback to allActivityTypes
    const allActivity = allActivityTypes.find(
        (item) => normalizeString(item.name) === normalizedActivityType
    );

    if (allActivity) {
        return { icon: allActivity.icon, color: allActivity.color };
    }

    // Return default icon and color if no match found
    return {
        icon: FaQuestionCircle, // Default icon
        color: "#CCCCCC", // Default color (light gray)
    };
};
