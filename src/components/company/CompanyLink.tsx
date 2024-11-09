"use client"

import Link from 'next/link';
import React from 'react';
import { Avatar, CompanyLinkImage } from '..';
import { Company } from '@/interfaces';

interface Props {
    company: Company;
}

export const CompanyLink = ({ company }: Props) => {

    return (
        <div style={{ backgroundColor: '#F8F8F8' }}>
            <div className="rounded-lg overflow-hidden"
                style={{ borderColor: '#CBD5E1', borderWidth: 0.5, borderStyle: 'solid' }}>
                <div className="flex flex-col items-center justify-center h-24 bg-white">
                    <div className="mt-1 mb-2">
                        <Link href={`/companies/${company.slug}`}>
                            <div className="relative w-16 h-16 rounded-full overflow-hidden flex items-center justify-center bg-white">
                                {company.CompanyLogo ? (
                                    <CompanyLinkImage
                                        src={company.CompanyLogo?.url}
                                        width={0}
                                        height={0}
                                        alt={company.name}
                                        className="object-cover"
                                        priority
                                        style={{ width: '100%', height: '100%' }}
                                    />
                                ) : (
                                    <Avatar name={company.name} backgroundColor={company.backgroundColor} size={'16'} />
                                )}
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};