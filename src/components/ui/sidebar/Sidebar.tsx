"use client";

import { clientAdminNavItems, footerNavItems } from "@/config";
import { useState, useEffect, useRef } from "react";
import { FiChevronLeft, FiChevronRight, FiHome } from "react-icons/fi";
import Link from "next/link";
import { CompanyClientDashboard } from "@/interfaces";
import { CompanyLinkImage } from "@/components/company/CompanyLinkImage";
import { Avatar } from "../layout/Avatar";
import { usePathname } from 'next/navigation'

interface Props {
    company?: CompanyClientDashboard | null;
}

const Sidebar = ({ company }: Props) => {

    const [isOpen, setIsOpen] = useState(false);
    const [isTransitionComplete, setIsTransitionComplete] = useState(false);

    const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const hoverTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const sidebarRef = useRef<HTMLDivElement>(null);

    const pathname = usePathname()

    const openSidebar = () => {
        setIsOpen(true);
        resetAutoCloseTimer();
    };

    const closeSidebar = () => {
        setIsOpen(false);
        setIsTransitionComplete(false);
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
    };

    const resetAutoCloseTimer = () => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
        timeoutRef.current = setTimeout(() => {
            setIsOpen(false);
            setIsTransitionComplete(false);
        }, 1000);
    };

    const handleTransitionEnd = () => {
        if (isOpen) {
            setIsTransitionComplete(true);
        }
    };


    const handleMouseEnterNavItem = () => {
        // Set a timeout to open sidebar after 2 seconds of hovering over a nav item
        hoverTimeoutRef.current = setTimeout(() => {
            openSidebar();
        }, 500);
    };

    const handleMouseLeaveNavItem = () => {
        // Clear timeout if mouse leaves before 2 seconds
        if (hoverTimeoutRef.current) {
            clearTimeout(hoverTimeoutRef.current);
        }
    };

    const handleMouseEnterSidebar = () => {
        // Do nothing if mouse enters other sidebar parts (not nav items)
    };

    const handleMouseLeaveSidebar = () => {
        if (isOpen) {
            resetAutoCloseTimer();  // Reset the auto-close timer when mouse leaves
        }
    };

    const handleClickOutside = (event: MouseEvent) => {
        if (
            sidebarRef.current &&
            !sidebarRef.current.contains(event.target as Node)
        ) {
            closeSidebar();
        }
    };

    useEffect(() => {
        if (isOpen) {
            document.addEventListener("click", handleClickOutside);
        } else {
            document.removeEventListener("click", handleClickOutside);
        }

        return () => {
            document.removeEventListener("click", handleClickOutside);
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
            if (hoverTimeoutRef.current) {
                clearTimeout(hoverTimeoutRef.current);
            }
        };
    }, [isOpen]);

    if (!company) {
        return null;
    }

    return (
        <>
            <div className={`lg:hidden ${isOpen ? "w-16" : "w-0"}`} />
            <aside
                ref={sidebarRef}
                className={`
                flex flex-col h-screen bg-white text-slate-800 border-r border-gray-200
                ${isOpen ? "w-64" : "w-16"}
                ${isOpen ? "absolute lg:relative z-40 transition-all duration-300" : "relative"}
              `}
                onMouseEnter={handleMouseEnterSidebar}
                onMouseLeave={handleMouseLeaveSidebar}
                onTransitionEnd={handleTransitionEnd}
            >

                {/* Top Section: Logo and Toggle */}
                <div
                    className={`flex ${isOpen ? "items-center justify-between" : "flex-col items-center"
                        } p-4 border-b border-slate-300`}
                >
                    {/* Toggle Button */}
                    <button
                        onClick={isOpen ? closeSidebar : openSidebar}
                        className={`p-2 z-40 rounded-full text-slate-800 hover:bg-slate-200 ${isOpen ? "" : "mb-2"
                            }`}
                    >
                        {isOpen ? <FiChevronLeft size={20} /> : <FiChevronRight size={20} />}
                    </button>

                    {/* Website Logo and Name */}
                    <Link href={`/`} className={`flex items-center gap-2 ${isOpen ? "order-1" : ""}`}>
                        <FiHome size={24} className="text-slate-800" /> {/* Replace with your logo */}
                        {isOpen && isTransitionComplete && (
                            <h1 className="text-xl font-bold text-slate-800 truncate">Klumpit</h1>
                        )}
                    </Link>
                </div>

                {/* Logo and Company Name */}
                <div
                    className={`flex flex-col items-center gap-2 p-4 border-b border-slate-300 ${isOpen ? "h-28" : ""}`}
                >
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
                        <Avatar
                            name={company.name}
                            backgroundColor={company.backgroundColor}
                            size="48"
                        />
                    )}
                    {isOpen && isTransitionComplete && (
                        <span className="text-base font-semibold truncate">{company.name}</span>
                    )}
                </div>

                {/* Main Navigation Items */}
                <nav className="flex-1 mt-4">
                    {clientAdminNavItems.map((item) => (
                        <Link
                            href={`${pathname}/${item.link}`}
                            key={item.id}
                        >
                            <button
                                className={`flex items-center w-full h-11 px-4 text-left text-slate-800 hover:bg-slate-100 ${isOpen ? "justify-start gap-4" : "justify-center gap-0"}`}
                                onMouseEnter={handleMouseEnterNavItem}
                                onMouseLeave={handleMouseLeaveNavItem}
                            >
                                <item.icon className="text-xl shrink-0" />
                                {isOpen && isTransitionComplete && <span className="truncate">{item.label}</span>}
                            </button>
                        </Link>
                    ))}
                </nav>

                {/* Footer Navigation Items */}
                <nav className="mt-auto border-t border-slate-300">
                    {footerNavItems.map((item) => (
                        <button
                            key={item.id}
                            className={`flex items-center w-full h-11 px-4 text-left text-slate-800 hover:bg-slate-100 ${isOpen ? "justify-start gap-4" : "justify-center gap-0"
                                }`}
                            onMouseEnter={handleMouseEnterNavItem}
                            onMouseLeave={handleMouseLeaveNavItem}
                        >
                            <item.icon className="text-xl shrink-0" />
                            {isOpen && isTransitionComplete && <span className="truncate">{item.label}</span>}
                        </button>
                    ))}
                </nav>


            </aside>
        </>
    );
};

export default Sidebar;
