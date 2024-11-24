import { clientNavItems, userNavItems } from "@/config";
import Link from "next/link";
import { FaArrowRightToBracket } from "react-icons/fa6";

interface Props {
    handleTabChange: (tab: string) => void;
    selectedTab: string;
    profileType: 'user' | 'client';
    userId: string;
    hasCompany: boolean;
}

export const ProfileHeaderNavigation = ({ handleTabChange, selectedTab, profileType, userId, hasCompany }: Props) => {

    const navItems = profileType === 'user' ? userNavItems : clientNavItems;
    const linkUrl = profileType === 'user' ? `/client/${userId}` : `/user/${userId}`;
    const linkLabel = profileType === 'user' ? "Negocio" : "Usuario";

    return (
        <ul className="group flex flex-wrap items-stretch text-[1rem] sm:text-[1rem] list-none border-b-2 border-transparent">
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
                            <item.icon />
                        </span>
                        <span className={`hidden sm:block text-sm ${selectedTab === item.id ? 'text-slate-900' : 'text-slate-400'}`}>{item.label}</span>
                    </a>
                    {/* Add a vertical line separator only on small screens */}
                    {index < navItems.length - 1 && (
                        <div className="block sm:hidden mx-4 h-6 border-l border-slate-300" /> // Vertical line separator
                    )}
                </li>
            ))}
            {hasCompany &&
                <li className="flex ml-auto"> {/* This will push the link button to the right */}
                    <Link
                        className="flex items-center gap-2 mr-3 lg:mr-6 text-sm font-medium" // Added 'items-center' here
                        href={linkUrl}
                        onClick={() => handleTabChange(navItems[0].id)}
                    >
                        {linkLabel}
                        <FaArrowRightToBracket className="font-normal" /> {/* Optional: add size for consistency */}
                    </Link>
                </li>
            }
        </ul>
    )
}
