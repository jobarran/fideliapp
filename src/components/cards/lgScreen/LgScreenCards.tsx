import { CompanyCardsByUserSlider } from '@/components'
import { Card } from '@/interfaces'
import Link from 'next/link'
import React from 'react'

interface Props {
    myCompanyCards: Card[]
}

export const LgScreenCards = ({ myCompanyCards }: Props) => {
    return (
        <div>
            <div className="flex justify-between items-center">
                <p className="text-lg text-gray-900">Mis tarjetas</p>
                <Link
                    className="cursor-pointer"
                    href={`/companies`}>
                    <p className="text-sm text-gray-900">Agregar</p>
                </Link>
            </div>
            <CompanyCardsByUserSlider myCards={myCompanyCards} />
        </div>
    )
}
