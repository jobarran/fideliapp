"use client";

import { ActivityType, UserCard as UserCardProp } from '@/interfaces'
import React from 'react'
import { FilterComponent, UserCard, UserCardAdd, UserCardSlider } from '..'
import { useCompanyNameFilter } from '@/hooks/useCompanyNameFilter';

interface Props {
    userCards: UserCardProp[],
    gridClass: string,
    activityTypes: ActivityType[];
    search: string;
    userId: string
}

export const UserCardGrid = ({ userCards, gridClass, activityTypes, search, userId }: Props) => {

    const { filteredItems, filteredObj, filters, setFilters, clearFilters } = useCompanyNameFilter(userCards, search);


    return (

        <>
            <FilterComponent
                filters={filters}
                setFilters={setFilters}
                clearFilters={clearFilters}
                activityTypes={activityTypes}
                customClassName="flex flex-row items-center justify-between pb-2"
            />
            <div>

                <div className='sm:hidden'><UserCardSlider userCards={filteredItems as UserCardProp[]} userId={userId} showHeader={false} /></div>

                <div>
                    {filteredObj === "card" ? (
                        <div className={gridClass}>
                            {(filteredItems as UserCardProp[]).map((card: UserCardProp) => (
                                <UserCard card={card} key={card.id} />
                            ))}
                            <UserCardAdd color={'slate-400'} />
                        </div>
                    ) : (
                        <div className="w-full text-center italic mt-10">Sin resultados</div>
                    )}
                </div>
            </div>
        </>

    )
}
