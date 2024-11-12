import React from 'react'
import { CardProfileHeaderAction, UserCard } from '..'
import { Card } from '@/interfaces'

interface Props {
    card: Card
}

export const CardProfileHeader = ({ card }: Props) => {
    return (
        <div className="flex flex-col sm:flex-row sm:items-center space-x-2 space-y-2">
            {/* Fixed width for UserCard */}
            <div className="w-auto sm:w-56 flex-shrink-0">
                <UserCard key={card.id} card={card} />
            </div>
            {/* Responsive layout for CardProfileHeaderAction */}
            <div className="flex-grow sm:ml-4 mt-4 sm:mt-0">
                <CardProfileHeaderAction />
            </div>
        </div>
    )
}
