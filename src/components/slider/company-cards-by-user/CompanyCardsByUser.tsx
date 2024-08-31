'use client'

import React, { useEffect, useState } from 'react'
import { CompanyCardsByUserSlider } from './CompanyCardsByUserSlider'
import { Card } from '@/interfaces'
import { FullWidthLoading } from '@/components/ui/loading/FullWidthLoading'


interface Props {
    myCompanyCards: Card[]
}

export const CompanyCardsByUser = ({ myCompanyCards }: Props) => {

    return (
        <div>

            <div className="flex justify-between items-center">
                <p className="text-lg text-gray-900">Mis tarjetas</p>
                <p className="text-sm text-gray-900 cursor-pointer">Ver todas</p>
            </div>
            <CompanyCardsByUserSlider myCards={myCompanyCards} />


        </div>
    )
}