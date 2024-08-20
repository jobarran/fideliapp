'use client'

import React from 'react'
import { CompanyCardsByUserSlider } from './CompanyCardsByUserSlider'
import { Card } from '@/interfaces'


interface Props {
    myCompanyCards: Card[]
}

export const CompanyCardsByUser = ({ myCompanyCards }: Props) => {

   
    return (
        <div>
            <div className="flex justify-between items-center">
                <p className="text-xl text-gray-900">Mis tarjetas</p>
                <p className="text-base text-gray-900 cursor-pointer">Ver todas</p>
            </div>
            <CompanyCardsByUserSlider myCards={myCompanyCards} />
        </div>
    )
}
