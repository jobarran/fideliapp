'use client';

import { Company } from '@/interfaces';
import Link from 'next/link';

import { CompanyGridImage } from './CompanyGridImage';
import { cropText } from '../../utils/cropText';

interface Props {
    company: Company;
    isInUserCards: boolean
}

export const CompanyGridItem = ({ company, isInUserCards }: Props) => {

    // Unified color logic
    const borderColor = isInUserCards ? 'border-green-700' : 'border-slate-200';



    return (
        <div className={`relative w-70 rounded-lg  border-2 bg-white hover:bg-gray-100 ${borderColor}`}>
            <Link href={`/companies/${company.slug}`}>
                <div className="flex flex-col items-center justify-center h-24">
                    <div className="mt-2">
                        <div className="relative w-14 h-14 rounded-full overflow-hidden flex items-center justify-center">
                            <CompanyGridImage
                                src={company.CompanyLogo?.url}
                                width={0}
                                height={0}
                                alt={company.name}
                                className="object-cover"
                                priority
                                style={{ width: '100%', height: '100%' }}
                            />
                        </div>
                        {isInUserCards && (
                            <div className="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-green-600 border-2 border-white rounded-full -top-2 -right-2">
                                ✔
                            </div>
                        )}

                    </div>
                    <div className="text-center mb-1 mt-1 text-xs">
                        {cropText(company.name, 14)}
                    </div>
                </div>
            </Link>

        </div>
    )
}




