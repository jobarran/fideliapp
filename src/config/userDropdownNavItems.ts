// config/userDropdownNavItems.ts

import { FiCreditCard, FiHeart, FiHome, FiRepeat, FiUser } from "react-icons/fi";

export const userDropdownNavItems = (userId: string) => [
  {
    label: "Inicio",
    href: "/",
    icon: FiHome,
  },
  {
    label: "Mis taerjetas",
    href: `/user/${userId}?tab=taerjetas`,
    icon: FiCreditCard,
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
