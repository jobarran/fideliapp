
import { FiHeart, FiHome, FiCreditCard, FiUser, FiRepeat, FiSearch } from "react-icons/fi";

interface Props {
    userId?: string
}

export const appFooterNavItems = ({ userId }: Props) => [
    { label: "Inicio", requiresAuth: false, icon: FiHome, route: "/" },
    { label: "Tarjetas", requiresAuth: true, icon: FiCreditCard, route: `/user/${userId}?tab=tarjetas` },
    { label: "Buscar", requiresAuth: false, icon: FiSearch, route: "/companies" },
    { label: "Movimientos", requiresAuth: true, icon: FiRepeat, route: `/user/${userId}?tab=movimientos` },
    { label: "Perfil", requiresAuth: true, icon: FiUser, route: `/user/${userId}?tab=informacion` },
];