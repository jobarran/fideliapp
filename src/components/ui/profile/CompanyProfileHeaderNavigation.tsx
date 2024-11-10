import { companyNavItems } from "@/config";


interface Props {
    handleTabChange: (tab: string) => void;
    selectedTab: string;
    actionButtons?: React.ReactNode

}

export const CompanyProfileHeaderNavigation = ({ handleTabChange, selectedTab, actionButtons }: Props) => {

    const navItems = companyNavItems

    return (
        <ul className="group flex flex-wrap items-stretch text-[1rem] sm:text-[1rem] list-none border-b-2 border-transparent">
            {navItems.map((item, index) => (
                <li className="flex items-center" key={item.id}>
                    <a
                        aria-controls={item.id}
                        className={`sm:mr-6 transition-colors duration-200 ease-in-out border-b-2 border-transparent 
                    ${selectedTab === item.id ? "border-slate-700" : "text-muted hover:border-slate-800"} cursor-pointer`}
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

            <li className="flex ml-auto"> {/* This will push the link button to the right */}
            {actionButtons && (
                <div className="bottom-4 right-4 flex space-x-2">
                    {actionButtons}
                </div>
            )}
            </li>
        </ul>
    )
}
