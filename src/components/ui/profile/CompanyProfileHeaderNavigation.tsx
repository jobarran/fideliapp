import { companyNavItems } from "@/config";

interface Props {
    handleTabChange: (tab: string) => void;
    selectedTab: string;
    actionButtons?: React.ReactNode;
}

export const CompanyProfileHeaderNavigation = ({
    handleTabChange,
    selectedTab,
    actionButtons,
}: Props) => {
    const NavItems = companyNavItems;

    return (
        <ul className="flex flex-wrap items-stretch w-full list-none">
            {NavItems.map((item) => (
                <li
                    className="flex-grow sm:flex-initial sm:mr-6"
                    key={item.id}
                >
                    <a
                        aria-controls={item.id}
                        className={`block w-full text-center transition-colors duration-200 ease-in-out border-b-2 
                            ${
                                selectedTab === item.id
                                    ? "border-slate-700"
                                    : "border-transparent hover:border-slate-800"
                            } cursor-pointer`}
                        onClick={() => handleTabChange(item.id)}
                    >
                        <span
                            className={`text-xs sm:text-sm ${
                                selectedTab === item.id
                                    ? "text-slate-900"
                                    : "text-slate-400"
                            }`}
                        >
                            {item.label}
                        </span>
                    </a>
                </li>
            ))}

            <li className="flex ml-auto">
                {/* This will push the link button to the right */}
                {actionButtons && (
                    <div className="bottom-4 right-4 flex space-x-2">
                        {actionButtons}
                    </div>
                )}
            </li>
        </ul>
    );
};
