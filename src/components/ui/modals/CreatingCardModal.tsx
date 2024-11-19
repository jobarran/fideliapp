import React from 'react'
import { CreatingCard } from './CreatingCard';

interface Props {
    userCardForCompany: boolean;
    slug: string;
    companyName: string;
    companyColor: string
    companyLogoUrl?: string
    isCreating: boolean
}

export const CreatingCardModal = ({ isCreating, companyName, companyColor, companyLogoUrl }: Props) => {

    return (
        <>
            {/* Loading Screen */}
            {
                isCreating && (
                    <div
                        className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex justify-center items-center z-50 transition-opacity duration-300 ease-in-out opacity-100 w-full h-full sm:w-auto sm:h-auto"
                        style={{ transition: 'opacity 0.3s ease-in-out' }}
                    >
                        <div className="bg-white p-8 rounded-lg mx-auto border text-center flex flex-col justify-center items-center w-full h-full sm:w-auto sm:h-auto">
                            <p className="text-md text-gray-800 mb-4">
                                Estamos creando tu tarjeta para <strong>{companyName}</strong>
                            </p>

                            {/* Centered card with fixed width */}
                            <div className="flex justify-center items-center w-full">
                                <div className="w-52"> {/* Fixed width of 16rem */}
                                    <CreatingCard
                                        name={companyName}
                                        backgroundColor={companyColor}
                                        logo={companyLogoUrl}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }
        </>
    )
}
