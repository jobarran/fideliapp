"use client";

import React from "react";
import Link from "next/link";
import { LoginModal, NewAccountModal } from "@/components";
import { useLoginModal } from "@/hooks/useLoginModal";
import { appFooterNavitems } from "@/config";

interface Props {
    userId?: string;
}

export const AppFooter = ({ userId }: Props) => {
    const { loginModal, toggleLoginModal, newAccountModal, toggleNewAccountModal } = useLoginModal();

    const navItems = appFooterNavitems({ userId });

    const handleProtectedClick = () => {
        console.log('open modal')
        toggleLoginModal();
    };

    const shouldShowFooter = !loginModal && !newAccountModal;

    return (
        <>
            <LoginModal
                loginModal={loginModal}
                setLoginModal={toggleLoginModal}
                setNewAccountModal={toggleNewAccountModal}
                uniqueId={"top-menu"}
            />
            <NewAccountModal
                newAccountModal={newAccountModal}
                setNewAccountModal={toggleNewAccountModal}
            />
            {shouldShowFooter && (
                <div className="fixed bottom-0 inset-x-0 bg-white shadow border-t border-slate-300 z-50 sm:hidden">
                    <div className="flex justify-around items-center py-4">
                        {navItems.map((item) =>
                            item.requiresAuth && !userId ? (
                                <button
                                    key={item.label}
                                    onClick={handleProtectedClick}
                                    className="flex flex-col items-center text-slate-800 hover:text-slate-900"
                                >
                                    <item.icon className="text-2xl mb-1" />
                                    <span className="text-xs font-medium">{item.label}</span>
                                </button>
                            ) : (
                                <Link
                                    key={item.label}
                                    href={item.route}
                                    className="flex flex-col items-center text-slate-800 hover:text-slate-900"
                                >
                                    <item.icon className="text-2xl mb-1" />
                                    <span className="text-xs font-medium">{item.label}</span>
                                </Link>
                            )
                        )}
                    </div>
                </div>
            )}
        </>
    );
};
