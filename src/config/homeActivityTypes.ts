import FilledMustacheIcon from '@/components/ui/icon/FilledMustacheIcon';
import { FaCoffee, FaCut, FaUtensils, FaBreadSlice, FaIceCream } from 'react-icons/fa';


export const homeActivityTypes = [
    { name: 'Restaurante', icon: FaUtensils, activityTypeSlug: 'Restaurante', color: '#6B8E68', classText: 'hidden md:block', classIcon: 'items-center justify-center'},
    { name: 'Barbería', icon: FilledMustacheIcon , activityTypeSlug: 'Barbería', color: '#4F4F4F', classText: 'hidden md:block', classIcon: 'items-center justify-center'},
    { name: 'Heladería', icon: FaIceCream, activityTypeSlug: 'Heladería', color: '#B04E5A', classText: 'hidden md:block', classIcon: 'items-center justify-center'},
    { name: 'Peluquería', icon: FaCut, activityTypeSlug: 'Peluquería', color: '#4F4F4F', classText: 'hidden md:block', classIcon: 'items-center justify-center'},
    { name: 'Panadería', icon: FaBreadSlice, activityTypeSlug: 'Panadería', color: '#C2B784', classText: 'block', classIcon: 'items-center justify-center'},
    { name: 'Café', icon: FaCoffee, activityTypeSlug: 'Cafe', color: '#A66E4A', classText: 'block', classIcon: 'items-center justify-center'},
];