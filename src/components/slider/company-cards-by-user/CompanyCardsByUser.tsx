'use client'

import React, { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { CompanyCardsByUserSlider } from './CompanyCardsByUserSlider'
import { getAllCardsByUser } from '@/actions'
import { Card } from '@/interfaces'

// Ensure you import the Card type if it's defined in a separate file
// import { Card } from '@/types'

export const CompanyCardsByUser = () => {
    const { data: session, status } = useSession();
    const user = session?.user || null;

    // Explicitly type the state
    const [myCards, setMyCards] = useState<Card[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchCards = async () => {
            if (user) {
                try {
                    const cards: Card[] = await getAllCardsByUser(user.id);
                    setMyCards(cards);
                } catch (err) {
                    console.error('Failed to fetch cards', err);
                    setError('Failed to fetch cards');
                } finally {
                    setLoading(false);
                }
            } else {
                setMyCards([]);
                setLoading(false);
            }
        };

        fetchCards();
    }, [user]);

    if (status === 'loading' || loading) {
        return <p>Loading...</p>; // Optional: Add a loading spinner or message
    }

    if (error) {
        return <p>Error: {error}</p>; // Optional: Add error handling UI
    }

    return (
        <div>
            <div className="flex justify-between items-center">
                <p className="text-xl text-gray-900">Mis tarjetas</p>
                <p className="text-base text-gray-900 cursor-pointer">Ver todas</p>
            </div>
            <CompanyCardsByUserSlider myCards={myCards} />
        </div>
    )
}
