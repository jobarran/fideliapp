import { Company, CompanyClientDashboard } from '@/interfaces';
import Link from 'next/link';
import React from 'react'
import { Avatar, CompanyCard } from '..';

interface Props {
    company: CompanyClientDashboard,
    userId: string | undefined
}

export const CompanyExist = ({ company, userId }: Props) => {

    const borderColor = company?.backgroundColor! !== '#FFFFFF' ? company?.backgroundColor! : '#4F4F4F';

    return (
        <div className="bg-white p-8 rounded-lg mx-auto border">
            <h2 className="text-xl font-semibold mb-6 flex items-center justify-center">Ya tienes un negocio registrado!</h2>

            {/* Add a flex container to center the Link div */}
            <div className="flex justify-center items-center">
                <Link href={`/client/${userId}`}>
                    <CompanyCard
                        logo={company.CompanyLogo?.url}
                        name={company.name}
                        address={company.address}
                        backgroundColor={company.backgroundColor}
                        activityType={company.activityType.name}
                    />
                </Link>
            </div>
        </div>
    );
}
