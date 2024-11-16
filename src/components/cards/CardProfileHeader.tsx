"use client"

import React, { useState } from 'react'
import { CardProfileHeaderAction, UserCard } from '..'
import { Card } from '@/interfaces'
import { generatePin } from '@/actions'

interface Props {
    card: Card
}

export const CardProfileHeader = ({ card }: Props) => {

    const [activePin, setActivePin] = useState<string>('');
    const [isLoading, setIsLoading] = useState(false);

    const handleCreatePin = async () => {
        setIsLoading(true);
        const createdPin = await generatePin(card.userId, card.companyId);
        setIsLoading(false);

        if (createdPin?.pin) {
            setActivePin(createdPin.pin);
        }
    };



    return (
        <div className="flex flex-col sm:flex-row sm:items-center space-x-2 space-y-2">
            {/* Fixed width for UserCard */}
            <div className="w-auto sm:w-56 flex-shrink-0">
                <UserCard key={card.id} card={card} />
            </div>
            {/* Responsive layout for CardProfileHeaderAction */}
            <div className="flex-grow h-64 sm:ml-4 mt-4 sm:mt-0">
                <CardProfileHeaderAction handleCreatePin={handleCreatePin} isLoading={isLoading}/>
            </div>
            <p>{activePin ? `Pin Generated: ${activePin}` : 'No Pin generated yet'}</p>
        </div>
    )
}
