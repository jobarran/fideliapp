import { BsInfoCircle } from "react-icons/bs";
import { FaArrowRightArrowLeft, FaIdCard, FaList, FaRegStar } from "react-icons/fa6";

export const companyNavItems = [
    { id: 'tarjeta', label: 'Tarjeta', icon: FaIdCard },
    { id: 'productos', label: 'Productos', icon: FaList },
    { id: 'opiniones', label: 'Opiniones', icon: FaRegStar },
    { id: 'movimientos', label: 'Movimientos', icon: FaArrowRightArrowLeft },
    { id: 'informacion', label: 'Información', icon: BsInfoCircle },
];