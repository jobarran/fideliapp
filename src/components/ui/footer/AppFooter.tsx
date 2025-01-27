import React from "react";
import Link from "next/link";
import { FiCreditCard, FiUser } from "react-icons/fi";
import { TfiArrowsHorizontal } from "react-icons/tfi";
import { HiOutlineMagnifyingGlass } from "react-icons/hi2";
import { BsFillPostcardHeartFill } from "react-icons/bs";

interface Props {
    userId?: string
}

export const AppFooter = ({ userId }: Props) => {
    const navigationItems = [
        { label: "Tarjetas", icon: FiCreditCard, route: "/cards" },
        { label: "Negocios", icon: HiOutlineMagnifyingGlass, route: "/companies" },
        { label: "Favoritos", icon: BsFillPostcardHeartFill, route: `/user/${userId}?tab=favoritos` },
        { label: "Movimientos", icon: TfiArrowsHorizontal, route: `/user/${userId}?tab=movimientos` },
        { label: "Perfil", icon: FiUser, route: `/user/${userId}?tab=informacion` },
    ];

    return (
        <div className="fixed bottom-0 inset-x-0 bg-white shadow border-t border-slate-300 z-50 sm:hidden">
            <div className="flex justify-around items-center py-4">
                {navigationItems.map((item) => (
                    <Link
                        key={item.label}
                        href={item.route}
                        className="flex flex-col items-center text-slate-800 hover:text-slate-900"
                    >
                        <item.icon className="text-2xl mb-1" />
                        <span className="text-xs font-medium">{item.label}</span>
                    </Link>
                ))}
            </div>
        </div>
    );
};