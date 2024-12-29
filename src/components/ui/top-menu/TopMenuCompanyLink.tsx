import { CompanyClientDashboard } from '@/interfaces'
import Link from 'next/link'
import React from 'react'
import { truncateText } from '../../../utils/truncateText';

interface Props {
    company: CompanyClientDashboard
}

export const TopMenuCompanyLink = ({ company }: Props) => {

    return (
        <div className="relative">
            <Link
                href={`/client/${company.userId}`}
            >
                <p className='text-xs font-bold'>
                    {truncateText(company.name, 25)}
                </p>
            </Link>
        </div >
    )
}
