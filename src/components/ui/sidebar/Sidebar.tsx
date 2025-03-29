"use client";

import { clientAdminNavItems } from "@/config";
import { useState, useEffect, useRef } from "react";
import { FiChevronLeft, FiChevronRight, FiHome, FiLogOut, FiUser } from "react-icons/fi";
import Link from "next/link";
import { CompanyClientDashboard } from "@/interfaces";
import { CompanyLinkImage } from "@/components/company/CompanyLinkImage";
import { Avatar } from "../layout/Avatar";
import { usePathname } from "next/navigation";
import { logout as serverLogout } from "@/actions/auth/logout";

interface Props {
    company?: CompanyClientDashboard | null;
}

const Sidebar = ({ company }: Props) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isTransitionComplete, setIsTransitionComplete] = useState(false);
    const [isSmallScreen, setIsSmallScreen] = useState(false);

    const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const sidebarRef = useRef<HTMLDivElement>(null);
    const pathname = usePathname();

    const updateScreenSize = () => {
        setIsSmallScreen(window.matchMedia("(max-width: 1024px)").matches);
    };

    useEffect(() => {
        updateScreenSize();
        window.addEventListener("resize", updateScreenSize);
        return () => {
            window.removeEventListener("resize", updateScreenSize);
        };
    }, []);

    const openSidebar = () => {
        setIsOpen(true);
    };

    const closeSidebar = () => {
        setIsOpen(false);
        setIsTransitionComplete(false);
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
    };

    const handleTransitionEnd = () => {
        if (isOpen) {
            setIsTransitionComplete(true);
        }
    };

    const handleMouseEnterSidebar = () => {
        if (!isSmallScreen) {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current); // Prevent closing if mouse re-enters quickly
            }
            timeoutRef.current = setTimeout(() => {
                openSidebar();
            }, 500); // 500ms delay for opening
        }
    };

    const handleMouseLeaveSidebar = () => {
        if (!isSmallScreen) {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current); // Clear any existing timeouts to prevent conflicts
            }
            timeoutRef.current = setTimeout(() => {
                closeSidebar();
            }, 1000); // 1-second delay for closing
        }
    };


    const handleClickOutside = (event: MouseEvent) => {
        if (sidebarRef.current && !sidebarRef.current.contains(event.target as Node)) {
            closeSidebar();
        }
    };

    const handleNavItemClick = (path: string) => {
        if (pathname !== path) {
            // closeSidebar();
        }
    };

    const handleLogout = async () => {
        await serverLogout();
        window.location.href = "/";
    };

    useEffect(() => {
        if (isOpen && isSmallScreen) {
            document.addEventListener("click", handleClickOutside);
        } else {
            document.removeEventListener("click", handleClickOutside);
        }

        return () => {
            document.removeEventListener("click", handleClickOutside);
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, [isOpen, isSmallScreen]);

    if (!company) {
        return null;
    }

    return (
        <>
            <div className={`lg:hidden ${isOpen ? "w-16" : "w-0"}`} />
            <aside
                ref={sidebarRef}
                className={`flex flex-col min-h-screen h-full bg-white text-slate-800 border-r border-gray-200 transition-all duration-300
                    ${isOpen ? "w-64" : "w-16"}
                    ${isOpen ? "absolute lg:relative z-40" : "relative"}`}
                onMouseEnter={handleMouseEnterSidebar}
                onMouseLeave={handleMouseLeaveSidebar}
                onTransitionEnd={handleTransitionEnd}
            >
                <div className={`flex ${isOpen ? "items-center justify-between h-20" : "flex-col items-center h-28"} p-4 border-b border-slate-300`}>
                    {(isSmallScreen || !isOpen) && (
                        <button
                            onClick={isOpen ? closeSidebar : openSidebar}
                            className={`p-2 z-40 rounded-full text-slate-800 hover:bg-slate-200 ${isOpen ? "" : "mb-2"}`}
                        >
                            {isOpen ? <FiChevronLeft size={20} /> : <FiChevronRight size={20} />}
                        </button>
                    )}
                    <Link
                        href={`/`}
                        className={`flex items-center gap-2 ${isSmallScreen || !isOpen ? "" : "mx-auto"
                            } ${isOpen ? "order-1" : ""}`}
                    >
                        <FiHome size={24} className="text-slate-800" />
                        {isOpen && isTransitionComplete && (
                            <h1 className="text-xl font-bold text-slate-800 truncate">Klumpit</h1>
                        )}
                    </Link>
                </div>

                {/* Logo and Company Name */}
                <div className={`flex flex-col items-center gap-2 p-4 border-b border-slate-300 ${isOpen ? "h-28" : "h-20"}`}>
                    {company.CompanyLogo?.url ? (
                        <CompanyLinkImage
                            src={company.CompanyLogo.url}
                            width={0}
                            height={0}
                            alt={company.name}
                            className="object-cover rounded-full"
                            priority
                            style={{ width: "48px", height: "48px" }}
                        />
                    ) : (
                        <Avatar name={company.name} backgroundColor={company.backgroundColor} size="48" />
                    )}
                    {isOpen && isTransitionComplete && <span className="text-base font-semibold truncate">{company.name}</span>}
                </div>

                {/* Main Navigation Items */}
                <nav className="flex-1 mt-4">
                    {clientAdminNavItems.map((item) => (
                        <Link
                            href={`${pathname.split('/').slice(0, 3).join('/')}/${item.link}`}
                            key={item.id}
                        >
                            <button
                                onClick={() => handleNavItemClick(item.link)}
                                className={`flex items-center w-full h-11 px-4 text-left text-slate-800 hover:bg-slate-100
                                    ${isOpen ? "justify-start gap-4" : "justify-center gap-0"}
                                    ${pathname.endsWith(item.link) ? "font-bold" : ""}`}
                                disabled={pathname.endsWith(item.link)}
                            >
                                <item.icon
                                    className={`text-3xl p-1 shrink-0 ${pathname.endsWith(item.link) ? "bg-slate-200 text-slate-800 rounded-full" : ""}`}
                                />
                                {isOpen && isTransitionComplete && <span className="truncate">{item.label}</span>}
                            </button>
                        </Link>
                    ))}
                </nav>

                {/* Footer Navigation Items */}
                <nav className="mt-auto border-t border-slate-300">
                    <div>
                        <Link
                            className={`flex items-center w-full h-11 px-4 text-left text-slate-800 hover:bg-slate-100
                            ${isOpen ? "justify-start gap-4" : "justify-center gap-0"}`}
                            href={`/user/${company.userId}`}
                        >
                            <FiUser className="text-xl shrink-0" />
                            {isOpen && isTransitionComplete && <span className="truncate">Ir a perfil de usuario</span>}
                        </Link>
                    </div>
                    <div>
                        <button
                            className={`flex items-center w-full h-11 px-4 text-left text-slate-800 hover:bg-slate-100
                            ${isOpen ? "justify-start gap-4" : "justify-center gap-0"}`}
                            onClick={handleLogout}
                        >
                            <FiLogOut className="text-xl shrink-0" />
                            {isOpen && isTransitionComplete && <span className="truncate">Cerrar sesión</span>}
                        </button>
                    </div>
                </nav>
            </aside>
        </>
    );
};

export default Sidebar;
