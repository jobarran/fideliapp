'use client'

import React from 'react'
import { CompanyCardsByUserSlider } from './CompanyCardsByUserSlider'
import { Card } from '@/interfaces'
import Link from 'next/link'


interface Props {
    myCompanyCards: Card[]
}

export const CompanyCardsByUser = ({ myCompanyCards }: Props) => {

    return (
        <div>

            <div className="flex justify-between items-center">
                <p className="text-lg text-gray-900">Mis tarjetas</p>
                <Link
                    className="cursor-pointer"
                    href={`/cards`}>
                    <p className="text-sm text-gray-900">Ver todas</p>
                </Link>
            </div>
            <CompanyCardsByUserSlider myCards={myCompanyCards} />


        </div>
    )
}