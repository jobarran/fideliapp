
import { FiHeart, FiHome, FiCreditCard, FiUser, FiRepeat } from "react-icons/fi";

interface Props {
    userId?: string
}

export const appFooterNavItems = ({ userId }: Props) => [
    { label: "Inicio", requiresAuth: false, icon: FiHome, route: "/" },
    { label: "Tarjetas", requiresAuth: true, icon: FiCreditCard, route: "/cards" },
    { label: "Favoritos", requiresAuth: true, icon: FiHeart, route: `/user/${userId}?tab=favoritos` },
    { label: "Movimientos", requiresAuth: true, icon: FiRepeat, route: `/user/${userId}?tab=movimientos` },
    { label: "Perfil", requiresAuth: true, icon: FiUser, route: `/user/${userId}?tab=informacion` },
];