import React from 'react'

interface Props {
    handleTabChange: (tab: string) => void;
    selectedTab: string
}

export const ClientDashboardNavigation = ({ handleTabChange, selectedTab }: Props) => {
    return (
        < ul className="group flex flex-wrap items-stretch text-[1rem] sm:text-[1rem] list-none border-b-2 border-transparent" >
            <li className="flex">
                <a
                    aria-controls="productos"
                    className={`mr-3 lg:mr-6 transition-colors duration-200 ease-in-out border-b-2 border-transparent ${selectedTab === "productos" ? "border-slate-700" : "text-muted hover:border-slate-800"} cursor-pointer`}
                    onClick={() => handleTabChange("productos")}
                >
                    Productos
                </a>
            </li>
            <li className="flex">
                <a
                    aria-controls="transacciones"
                    className={`mr-3 lg:mr-6 transition-colors duration-200 ease-in-out border-b-2 border-transparent ${selectedTab === "transacciones" ? "border-slate-700" : "text-muted hover:border-slate-800"} cursor-pointer`}
                    onClick={() => handleTabChange("transacciones")}
                >
                    Transacciones
                </a>
            </li>
            <li className="flex">
                <a
                    aria-controls="informacion"
                    className={`mr-3 lg:mr-6 transition-colors duration-200 ease-in-out border-b-2 border-transparent ${selectedTab === "informacion" ? "border-slate-700" : "text-muted hover:border-slate-800"} cursor-pointer`}
                    onClick={() => handleTabChange("informacion")}
                >
                    Información
                </a>
            </li>
        </ul>
    )
}
