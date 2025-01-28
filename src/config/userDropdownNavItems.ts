// config/userDropdownNavItems.ts

import { FiHeart, FiHome, FiRepeat, FiUser } from "react-icons/fi";

export const userDropdownNavItems = (userId: string) => [
  {
    label: "Inicio",
    href: "/",
    icon: FiHome,
  },
  {
    label: "Mis favoritos",
    href: `/user/${userId}?tab=favoritos`,
    icon: FiHeart,
  },
  {
    label: "Mis movimientos",
    href: `/user/${userId}?tab=movimientos`,
    icon: FiRepeat,
  },
  {
    label: "Mi Perfil",
    href: `/user/${userId}?tab=informacion`,
    icon: FiUser,
  },
];
