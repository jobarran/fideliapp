// src/config/socialConfig.ts

import { FaFacebook, FaInstagram, FaPhone, FaTwitter, FaWhatsapp } from "react-icons/fa";

export const socialConfig = {
    facebook: {
        register: 'faceook',
        label: 'Facebook',
        icon: FaFacebook,
        placeholder: 'Facebook',
        ariaLabel: 'Facebook',
    },
    twitter: {
        register: 'twitter',
        label: 'Twitter',
        icon: FaTwitter,
        placeholder: 'Twitter',
        ariaLabel: 'Twitter',
    },
    instagram: {
        register: "instagram",
        label: 'Instagram',
        icon: FaInstagram,
        placeholder: 'Instagram',
        ariaLabel: 'Instagram',
    },
    whatsapp: {
        register: "whatsapp",
        label: 'WhatsApp',
        icon: FaWhatsapp,
        placeholder: 'WhatsApp',
        ariaLabel: 'WhatsApp',
    },
    phone: {
        register: "phone",
        label: 'Phone',
        icon: FaPhone,
        placeholder: 'Teléfono',
        ariaLabel: 'Teléfono',
    },
};
