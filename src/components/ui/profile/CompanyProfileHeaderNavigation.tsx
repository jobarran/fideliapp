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
    const NavItems = companyNavItems;



    return (
        <div className="relative w-full">
            <ul className="flex flex-wrap items-stretch w-full list-none">
                {NavItems.map((item) => (
                    <li className="flex-grow sm:flex-initial sm:mr-6" key={item.id}>
                        <a
                            aria-controls={item.id}
                            className={`block w-full text-center transition-colors duration-200 ease-in-out border-b-2 
                                ${selectedTab === item.id
                                    ? "border-slate-700"
                                    : "border-transparent hover:border-slate-800"
                                } cursor-pointer`}
                            onClick={() => handleTabChange(item.id)}
                        >
                            <span
                                className={`text-xs sm:text-sm ${selectedTab === item.id
                                    ? "text-slate-900"
                                    : "text-slate-400"
                                    }`}
                            >
                                {item.label}
                            </span>
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    );
};
