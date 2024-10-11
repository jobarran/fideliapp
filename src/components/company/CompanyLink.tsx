import Link from 'next/link'
import React from 'react'
import { CompanyLinkImage } from '..'
import { Company } from '@/interfaces'

interface Props {
    company: Company
}

export const CompanyLink = ({ company }: Props) => {

    const backgroundColor = '#slate-900'; // Dark gray as default

    return (

        <div className="rounded-lg overflow-hidden"
            style={{ borderColor: backgroundColor, borderWidth: 2, borderStyle: 'solid' }}>
            <div className="flex flex-col items-center justify-center h-24 bg-white">
                {/* <div className="mt-1 text-base font-medium" style={{ color: color }}>{company.name}</div> */}
                <div className="mt-1 mb-2">
                    <Link href={`/companies/${company.slug}`}>
                        <div className="relative w-16 h-16 rounded-full overflow-hidden flex items-center justify-center bg-white">
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
                    </Link>
                </div>
            </div>

        </div>
    )
}
