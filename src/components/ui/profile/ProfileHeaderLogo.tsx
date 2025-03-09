import { Avatar, CompanyLinkImage } from '@/components'
import { CompanyClientDashboard } from '@/interfaces'
import React from 'react'

interface Props {
    company: CompanyClientDashboard
    setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export const ProfileHeaderLogo = ({ company, setOpenModal }: Props) => {
    return (

        <div className="flex justify-center px-4" >
            <div
                className="relative w-20 h-20 sm:w-28 sm:h-28 rounded-full overflow-hidden flex items-center justify-center my-4 border-4 border-slate-100"
                style={{ backgroundColor: company ? company.backgroundColor : '#FFFFFF' }} >
                <button
                    onClick={() => setOpenModal(true)}
                    className="sm:pointer-events-auto pointer-events-none"
                >
                    {company.CompanyLogo ? (
                        <CompanyLinkImage
                            src={company.CompanyLogo.url}
                            width={0}
                            height={0}
                            alt={company.name}
                            className="object-cover"
                            priority
                            style={{
                                borderRadius: '50%',
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover',
                                objectPosition: 'center center',
                                aspectRatio: '1/1',
                            }}
                        />
                    ) : (
                        <Avatar name={company.name} backgroundColor={company.backgroundColor} size={'20'} />
                    )}
                </button>
            </div>
        </div>

    )
}
