import FilledMustacheIcon from '@/components/ui/icon/FilledMustacheIcon';
import { FaCoffee, FaCut, FaUtensils, FaBreadSlice, FaIceCream } from 'react-icons/fa';


export const homeActivityTypes = [
    { name: 'Restaurante', icon: FaUtensils, color: '#6B8E68', classText: 'hidden md:inline', classIcon: 'items-center justify-center'},
    { name: 'Barbería', icon: FilledMustacheIcon , color: '#4F4F4F', classText: 'hidden md:inline', classIcon: 'items-center justify-center'},
    { name: 'Heladería', icon: FaIceCream, color: '#B04E5A', classText: 'hidden md:inline', classIcon: 'items-center justify-center'},
    { name: 'Peluquería', icon: FaCut, color: '#4F4F4F', classText: 'hidden md:inline', classIcon: 'items-center justify-center'},
    { name: 'Panadería', icon: FaBreadSlice, color: '#C2B784', classText: 'inline', classIcon: 'items-center justify-center'},
    { name: 'Café', icon: FaCoffee, color: '#B04E5A', classText: 'inline', classIcon: 'items-center justify-center'},
];