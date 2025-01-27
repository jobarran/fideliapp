import { BsFillPostcardHeartFill } from "react-icons/bs";
import { FaArrowRightArrowLeft, FaCircleInfo, FaRegHeart } from "react-icons/fa6";
import { FiUser } from "react-icons/fi";

export const userNavItems = [
    { id: 'favoritos', label: 'Favoritos', icon:FaRegHeart},
    { id: 'movimientos', label: 'Movimientos', icon:FaArrowRightArrowLeft},
    { id: 'informacion', label: 'Información', icon:FiUser},
    { id: 'planes', label: 'Planes', icon:BsFillPostcardHeartFill},

];