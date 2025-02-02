"use client";

import { ActivityType, UserCard as UserCardProp } from '@/interfaces'
import React from 'react'
import { FilterComponent, UserCard, UserCardAdd } from '..'
import { useCompanyNameFilter } from '@/hooks/useCompanyNameFilter';

interface Props {
    userCards: UserCardProp[],
    gridClass: string,
    activityTypes: ActivityType[];
    search: string;
}

export const UserCardGrid = ({ userCards, gridClass, activityTypes, search }: Props) => {

    const { filteredItems, filteredObj, filters, setFilters, clearFilters } = useCompanyNameFilter(userCards, search);


    return (

        <>
            <FilterComponent
                filters={filters}
                setFilters={setFilters}
                clearFilters={clearFilters}
                activityTypes={activityTypes}
            />
            <div>

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
