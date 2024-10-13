import { clientNavItems } from "@/config";

interface Props {
    handleTabChange: (tab: string) => void;
    selectedTab: string;
}

export const ProfileHeaderNavigation = ({ handleTabChange, selectedTab }: Props) => {
    return (
        <ul className="group flex flex-wrap items-stretch text-[1rem] sm:text-[1rem] list-none border-b-2 border-transparent">
            {clientNavItems.map((item) => (
                <li className="flex" key={item.id}>
                    <a
                        aria-controls={item.id}
                        className={`mr-3 lg:mr-6 transition-colors duration-200 ease-in-out border-b-2 border-transparent 
                        ${selectedTab === item.id ? "border-slate-700" : "text-muted hover:border-slate-800"} cursor-pointer`}
                        onClick={() => handleTabChange(item.id)}
                    >
                        {item.label}
                    </a>
                </li>
            ))}
        </ul>
    )
}
