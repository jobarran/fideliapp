import { FiCreditCard, FiHome, FiUser } from "react-icons/fi";
import { TfiArrowsHorizontal } from "react-icons/tfi";
import { FaArrowRightArrowLeft, FaArrowsLeftRight, FaRegHeart } from "react-icons/fa6";

interface Props {
    userId?: string
}

export const appFooterNavItems = ({ userId }: Props) => [
    { label: "Inicio", requiresAuth: false, icon: FiHome, route: "/" },
    { label: "Tarjetas", requiresAuth: true, icon: FiCreditCard, route: "/cards" },
    { label: "Favoritos", requiresAuth: true, icon: FaRegHeart, route: `/user/${userId}?tab=favoritos` },
    { label: "Movimientos", requiresAuth: true, icon: FaArrowRightArrowLeft, route: `/user/${userId}?tab=movimientos` },
    { label: "Perfil", requiresAuth: true, icon: FiUser, route: `/user/${userId}?tab=informacion` },
];
