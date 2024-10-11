import { Company, CompanyClientDashboard } from '@/interfaces';
import Link from 'next/link';
import React from 'react'
import { CompanyLinkImage } from './CompanyLinkImage';

interface Props {
    company: CompanyClientDashboard,
    userId: string | undefined
}

export const CompanyCreateCardExist = ({ company, userId }: Props) => {

    const borderColor = company?.backgroundColor! !== '#FFFFFF' ? company?.backgroundColor! : '#4F4F4F';

    return (
        <div className="bg-white p-8 shadow-lg rounded-lg mx-auto">
            <h2 className="text-xl font-semibold mb-10 flex justify-center">Ya tienes un negocio registrado!</h2>

            {/* Add a flex container to center the Link div */}
            <div className="flex justify-center items-center">
                <Link href={`/client/${userId}`}>
                    <div
                        className="w-72 rounded-lg shadow-sm bg-white flex justify-center mb-10"
                        style={{ borderColor: borderColor, borderWidth: 1, borderStyle: 'solid' }}
                    >
                        <div className="flex flex-col items-center justify-center">
                            <div className="mt-1 text-base font-medium" style={{ color: borderColor }}>
                                {company.name}
                            </div>
                            <div className="mt-1 mb-2">
                                <div className="relative w-20 h-20 rounded-full overflow-hidden flex items-center justify-center bg-white my-4">
                                    <CompanyLinkImage
                                        src={company.CompanyLogo?.url}
                                        width={0}
                                        height={0}
                                        alt={company.name}
                                        className="object-cover"
                                        priority
                                        style={{ width: '100%', height: '100%' }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </Link>
            </div>
        </div>
    );
}
