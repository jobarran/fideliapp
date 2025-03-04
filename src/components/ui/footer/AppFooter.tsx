"use client";

import React from "react";
import Link from "next/link";
import { LoginModal, NewAccountModal } from "@/components";
import { useLoginModal } from "@/hooks/useLoginModal";
import { appFooterNavItems } from "@/config";
import { FiHome, FiSearch } from "react-icons/fi";

interface Props {
    userId?: string;
}


export const AppFooter = ({ userId }: Props) => {

    const navItems = appFooterNavItems({ userId });

    // Check if there's a userId to determine the footer content
    const { loginModal, toggleLoginModal, newAccountModal, toggleNewAccountModal } = useLoginModal();


    const handleProtectedClick = () => {
        toggleLoginModal();
    };


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
                setLoginModal={toggleLoginModal}
            />
            <div className={`fixed bottom-0 inset-x-0 bg-white shadow border-t border-slate-300 z-40 sm:hidden`}>
                <div className="flex justify-between items-center py-4">
                    {navItems.map((item) => (
                        <div key={item.label} className="flex-1 text-center">
                            {item.requiresAuth && !userId ? (
                                <div className="flex flex-col items-center text-slate-600 hover:text-slate-800">
                                    <button
                                        onClick={handleProtectedClick}
                                    >
                                        <div className="flex flex-col w-full items-center justify-center gap-1">
                                            <item.icon className="text-2xl mb-1 items-center" />
                                            <span className="text-xs font-medium">{item.label}</span>
                                        </div>
                                    </button>
                                </div>
                            ) : (
                                <div className="flex flex-col items-center text-slate-600 hover:text-slate-800">
                                    <Link
                                        href={item.route}
                                    >
                                        <div className="flex flex-col w-full items-center justify-center">
                                            <item.icon className="text-2xl mb-1 items-center" />
                                            <span className="text-xs font-medium">{item.label}</span>
                                        </div>

                                    </Link>
                                </div>

                            )}
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};
