"use client"

import { companyNavItems } from "@/config";
import { Pin } from "@/interfaces";

interface Props {
    handleTabChange: (tab: string) => void;
    selectedTab: string;
    userPin: Pin | undefined;
}

export const CompanyProfileHeaderNavigation = ({
    handleTabChange,
    selectedTab,
}: Props) => {
    const navItems = companyNavItems;



    return (
        <div className="relative w-full">
            <ul className="flex flex-row sm:flex-wrap items-center sm:items-stretch w-full justify-between sm:justify-normal px-4 sm:px-0 list-none">
                {navItems.map((item, index) => (
                    <li className="flex items-center" key={item.id}>
                        <a
                            aria-controls={item.id}
                            className={`sm:mr-6 transition-colors duration-200 ease-in-out border-b-2 border-transparent 
                    ${selectedTab === item.id ? "border-slate-700" : "text-muted sm:hover:border-slate-800"} cursor-pointer`}
                            onClick={() => handleTabChange(item.id)}
                        >
                            {/* Conditionally render icon or label based on screen size */}
                            <span className={`block sm:hidden lg:mr-6 ${selectedTab === item.id ? 'text-slate-900' : 'text-slate-400'}`}>
                                <item.icon className="text-xl" />
                            </span>
                            <span className={`hidden sm:block text-sm ${selectedTab === item.id ? 'text-slate-900' : 'text-slate-400'}`}>{item.label}</span>
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    );
};
