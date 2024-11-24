import FilledMustacheIcon from '@/components/ui/icon/FilledMustacheIcon';
import { FaCoffee, FaCut, FaUtensils, FaBreadSlice, FaIceCream } from 'react-icons/fa';
import { TbMoustache } from 'react-icons/tb';


// homeActivityTypes.ts
export const homeActivityTypes = [
    {
        name: 'Restaurante',
        icon: FaUtensils,
        activityTypeSlug: 'Restaurante',
        iconColor: '#6B8E68', // Muted green
    },
    {
        name: 'Barbería',
        icon: FilledMustacheIcon,
        activityTypeSlug: 'Barbería',
        iconColor: '#4F4F4F', // Neutral gray
    },
    {
        name: 'Heladería',
        icon: FaIceCream,
        activityTypeSlug: 'Heladería',
        iconColor: '#B04E5A', // Muted pink-red
    },
    {
        name: 'Peluquería',
        icon: FaCut,
        activityTypeSlug: 'Peluquería',
        iconColor: '#6B7C8C', // Muted blue-gray
    },
    {
        name: 'Panadería',
        icon: FaBreadSlice,
        activityTypeSlug: 'Panadería',
        iconColor: '#C2B784', // Light tan
    },
    {
        name: 'Café',
        icon: FaCoffee,
        activityTypeSlug: 'Cafe',
        iconColor: '#A66E4A', // Light mocha brown
    },
];



export const allActivityTypes = [
    { name: 'restaurante', icon: FaUtensils, activityTypeSlug: 'Restaurante', color: '#6B8E68' },
    { name: 'barberia', icon: TbMoustache, activityTypeSlug: 'Barbería', color: '#4F4F4F' },
    { name: 'heladeria', icon: FaIceCream, activityTypeSlug: 'Heladería', color: '#B04E5A' },
    { name: 'peluqueria', icon: FaCut, activityTypeSlug: 'Peluquería', color: '#4F4F4F' },
    { name: 'panaderia', icon: FaBreadSlice, activityTypeSlug: 'Panadería', color: '#C2B784' },
    { name: 'cafe', icon: FaCoffee, activityTypeSlug: 'Cafe', color: '#A66E4A' },
];