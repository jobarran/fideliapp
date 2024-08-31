'use client'

import React from 'react'
import { Company } from '@/interfaces'
import { CompaniesAllSlider } from '@/components'
import Link from 'next/link'


interface Props {
    companiesAll: Company[]
}

export const CompaniesAll = ({ companiesAll }: Props) => {

    return (
        <div>
            <div className="flex justify-between items-center">
                <p className="text-lg text-gray-900">Negocios destacados</p>
                <Link
                    className="cursor-pointer"
                    href={`/companies`}>
                    <p className="text-sm text-gray-900">Ver todos</p>
                </Link>
            </div>
            <CompaniesAllSlider companiesAll={companiesAll} />
        </div>
    )
}
