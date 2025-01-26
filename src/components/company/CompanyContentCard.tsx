"use client";

import { CompanyContentNoCard } from '..';

interface Props {
    userCardForCompany: boolean;
    slug: string;
    companyName: string;
    companyColor: string
    companyLogoUrl?: string
}

export const CompanyContentCard = ({ userCardForCompany, slug, companyName, companyColor, companyLogoUrl }: Props) => {


    return (
        <div>
            {userCardForCompany && (
                <div className="flex justify-between items-center mt-1 mb-4">
                    <h2 className="text-xl font-semibold text-gray-800">Tarjeta</h2>
                </div>
            )}

            <div className="mt-4 mb-4">
                    <CompanyContentNoCard
                        userCardForCompany={userCardForCompany}
                        slug={slug}
                        companyName={companyName}
                        companyColor={companyColor}
                        companyLogoUrl={companyLogoUrl}
                    />
                    <p>Tarjeta de beneficios activa</p>
                
            </div>
        </div>
    );
};
