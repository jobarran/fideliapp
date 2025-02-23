"use client";

import { useLoginModal } from '@/hooks/useLoginModal';
import { CompanyContentNoCard, LoginModal, NewAccountModal } from '..';
import { useSession } from 'next-auth/react';

interface Props {
    userCardForCompany: boolean;
    slug: string;
    companyName: string;
    companyColor: string
    companyLogoUrl?: string
}

export const CompanyContentCard = ({ userCardForCompany, slug, companyName, companyColor, companyLogoUrl }: Props) => {

    const { data } = useSession();
    const { loginModal, toggleLoginModal, newAccountModal, toggleNewAccountModal } = useLoginModal();

    return (
        <div>
            <LoginModal
                loginModal={loginModal}
                setLoginModal={toggleLoginModal}
                setNewAccountModal={toggleNewAccountModal}
                uniqueId={"no-card"}
            />
            <NewAccountModal
                newAccountModal={newAccountModal}
                setNewAccountModal={toggleNewAccountModal}
            />
            {
                data?.user ? (
                    <CompanyContentNoCard
                        userCardForCompany={userCardForCompany}
                        slug={slug}
                        companyName={companyName}
                        companyColor={companyColor}
                        companyLogoUrl={companyLogoUrl}
                    />
                ) : (
                    <div className="text-center">
                        <p className="text-sm text-gray-600 italic">
                            Tenés que estar registrado para ver tus movimientos
                        </p>
                        <button
                            className="mt-4 text-sm bg-slate-800 text-white py-2 px-4 rounded-md hover:bg-slate-700"
                            onClick={toggleLoginModal}
                        >
                            Iniciar sesión
                        </button>
                    </div>
                )
            }

            {userCardForCompany && (
                <div className="flex justify-between items-center mt-1 mb-4">
                    <h2 className="text-xl font-semibold text-gray-800">Tarjeta</h2>
                    <p>Tarjeta de beneficios activa</p>
                </div>
            )}
        </div>
    );
};
