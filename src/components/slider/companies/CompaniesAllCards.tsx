import React from 'react'
import Link from "next/link";
import { Card, Company } from '@/interfaces';
import { FaStar, FaHeart, FaGift } from 'react-icons/fa'; // Importing some random icons from react-icons
import { CompaniesAllImage } from './CompaniesAllImage';

interface Props {
    company: Company,
}

export const CompaniesAllCards = ({ company }: Props) => {

    // Unified color logic
    const backgroundColor =  '#slate-900'; // Dark gray as default

    return (
        <div className="rounded-lg overflow-hidden"
            style={{ borderColor: backgroundColor, borderWidth: 2, borderStyle: 'solid' }}>
            <div className="flex flex-col items-center justify-center h-24 bg-white">
                {/* <div className="mt-1 text-base font-medium" style={{ color: color }}>{company.name}</div> */}
                <div className="mt-1 mb-2">
                    <Link href={`/product/${company.name}`}>
                        <div className="relative w-16 h-16 rounded-full overflow-hidden flex items-center justify-center bg-white">
                            <CompaniesAllImage
                                src={company.CompanyLogo?.url}
                                width={0}
                                height={0}
                                alt={company.name}
                                className="object-cover"
                                priority
                                style={{ width: '100%', height: 'auto' }}
                            />
                        </div>
                    </Link>
                </div>
            </div>
           
        </div>
    )
}