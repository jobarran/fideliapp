"use client";

import React from "react";
import { ElementType, useEffect } from "react";
import { renderToString } from "react-dom/server";
import { IconType } from "react-icons";

interface CustomMarkerProps {
    map: google.maps.Map | null;
    location: { lat: number; lng: number };
    label?: string;
    bgColor?: string;
    icon: IconType | ElementType;
}

export const IconMarker = ({
    map,
    location,
    label,
    bgColor = "#2F4F4F",
    icon,
}: CustomMarkerProps) => {
    useEffect(() => {
        if (!map) return;

        if (
            typeof google === "undefined" ||
            !google.maps.marker ||
            !google.maps.marker.PinElement
        ) {
            console.error("AdvancedMarkerElement or PinElement is not available.");
            return;
        }

        // Ensure icon is a valid React element and render it to a string
        const iconElement = <>{React.createElement(icon, { style: { fill: '#FFFFFF', color: '#FFFFFF' } })}</>
        const svgIcon = renderToString(iconElement); // Now you can render it to a string

        // Create an image element and set the SVG as its source
        const glyphImg = document.createElement("img");
        if (svgIcon.startsWith("<svg")) {
            const svgDataUrl = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(
                svgIcon
            )}`;
            glyphImg.src = svgDataUrl;
        }


        const pinElement = new google.maps.marker.PinElement({
            background: bgColor,
            borderColor: bgColor,
            glyph: glyphImg || "", // Glyph can be a string
        });

        new google.maps.marker.AdvancedMarkerElement({
            map,
            position: location,
            content: pinElement.element,
            title: label || "asd",
        });
    }, [map, location, label, bgColor, icon]);

    return null; // No JSX needed; marker is added directly to the map
};
