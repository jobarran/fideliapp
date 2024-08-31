'use client';

import { Company } from '@/interfaces';
import Link from 'next/link';

import { CompanyLogo } from './CompanyLogo';
import { CompanyGridImage } from './CompanyGridImage';

interface Props {
    company: Company;
}

export const CompanyGridItem = ({ company }: Props) => {

    // Unified color logic
    const backgroundColor = '#slate-900'; // Dark gray as default

    return (
        <div className="w-70 rounded-lg overflow-hidden"
            style={{ borderColor: backgroundColor, borderWidth: 2, borderStyle: 'solid' }}>
            <Link href={`/product/${company.name}`}>
                <div className="flex flex-col items-center justify-center h-24 bg-white hover:bg-gray-100">
                    <div className="mt-2">
                        <div className="relative w-14 h-14 rounded-full overflow-hidden flex items-center justify-center bg-white">
                            <CompanyGridImage
                                src={company.CompanyLogo?.url}
                                width={0}
                                height={0}
                                alt={company.name}
                                className="object-cover"
                                priority
                                style={{ width: '100%', height: 'auto' }}
                            />
                        </div>

                    </div>
                    <div className="text-center mb-1 mt-1 text-xs">
                        {company.name}
                    </div>
                </div>
            </Link>

        </div>
    )
}




