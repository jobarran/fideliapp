import { FiInfo, FiShoppingBag, FiRepeat, FiPlusCircle, FiBarChart2, FiLayers, FiUser, FiSettings, FiLogOut, FiBox, FiPackage, FiGrid, FiShoppingCart } from "react-icons/fi";

export const clientNavItems = [
  { id: 'transaccion', shortLabel: 'Nueva', label: 'Transacción', icon: FiPlusCircle },
  { id: 'movimientos', shortLabel: 'Movimientos', label: 'Movimientos', icon: FiRepeat },
  { id: 'productos', shortLabel: 'Productos', label: 'Productos', icon: FiShoppingBag },
  { id: 'informacion', shortLabel: 'Info', label: 'Información', icon: FiInfo },
];

export const clientAdminNavItems = [
  { id: "inicio", link: "dashboard", shortLabel: "Inicio", label: "Inicio", icon: FiBarChart2 },
  { id: "transaccion", link: "transaction", shortLabel: "Nueva", label: "Transacción", icon: FiPlusCircle },
  { id: "productos", link: "products", shortLabel: "Productos", label: "Productos", icon: FiPackage },
  { id: "movimientos", link: "movements", shortLabel: "Movimientos", label: "Movimientos", icon: FiRepeat },
  // { id: "informacion", link: "information", shortLabel: "Info", label: "Información", icon: FiInfo },
  // { id: "estadisticas", link: "charts", shortLabel: "Estadísticas", label: "Estadísticas", icon: FiBarChart2 },
  { id: "configuracion", link: "configuration", shortLabel: "Config", label: "Configuración", icon: FiSettings }, // New
  // { id: "planes", link: "plans", shortLabel: "Planes", label: "Planes", icon: FiLayers },
];

export const footerNavItems = [
  { id: "perfil", shortLabel: "Perfil", label: "Ir a perfil de usuario", icon: FiUser },
  { id: "logout", shortLabel: "Salir", label: "Cerrar sesión", icon: FiLogOut },
];