'use client'

import React from 'react'
import { Company } from '@/interfaces'
import { CompaniesAllSlider } from '@/components'


interface Props {
    companiesAll: Company[]
}

export const CompaniesAll = ({ companiesAll }: Props) => {
   
    return (
        <div>
            <div className="flex justify-between items-center">
                <p className="text-lg text-gray-900">Negocios destacados</p>
                <p className="text-sm text-gray-900 cursor-pointer">Ver todos</p>
            </div>
            <CompaniesAllSlider companiesAll={companiesAll} />
        </div>
    )
}
