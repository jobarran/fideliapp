"use client";

import React from "react";
import Link from "next/link";
import { LoginModal, NewAccountModal } from "@/components";
import { useLoginModal } from "@/hooks/useLoginModal";
import { appFooterNavItems } from "@/config";

interface Props {
    userId?: string;
}

export const AppFooter = ({ userId }: Props) => {
    const { loginModal, toggleLoginModal, newAccountModal, toggleNewAccountModal } = useLoginModal();

    const navItems = appFooterNavItems({ userId });

    const handleProtectedClick = () => {
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
                    <div className="flex justify-between items-center py-4">
                        {navItems.map((item) => (
                            <div key={item.label} className="flex-1 text-center">
                                {item.requiresAuth && !userId ? (
                                    <button
                                        onClick={handleProtectedClick}
                                        className="flex flex-col items-center text-slate-600 hover:text-slate-800"
                                    >
                                        <item.icon className="text-2xl mb-1" />
                                        <span className="text-xs font-medium">{item.label}</span>
                                    </button>
                                ) : (
                                    <Link
                                        href={item.route}
                                        className="flex flex-col items-center text-slate-600 hover:text-slate-800"
                                    >
                                        <item.icon className="text-2xl mb-1" />
                                        <span className="text-xs font-medium">{item.label}</span>
                                    </Link>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </>
    );
};
