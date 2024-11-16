import React from 'react'
import { CardProfileContent, CardProfileHeader, UserCard } from '..'
import { Card } from '@/interfaces'

interface Props {
    card: Card
}

export const CardProfile = async ({ card }: Props) => {

    return (

        <div className="flex flex-col">
            <CardProfileHeader card={card} />
            <CardProfileContent />
        </div>
    )
}
