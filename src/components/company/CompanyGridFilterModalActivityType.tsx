import { ActivityType } from '@/interfaces';
import React from 'react'

interface Props {
    activityTypes: ActivityType[];
    selectedActivityTypes: string[];
    onTagClick: (id: string) => void;
}

export const CompanyGridFilterModalActivityType = ({ activityTypes, selectedActivityTypes, onTagClick }: Props) => {


    return (
        <div className="flex flex-wrap gap-2 p-4">
            <h2 className="text-sm font-normal text-slate-900 mb-2">Tipo de Actividad</h2>
            <div className="flex flex-wrap gap-2">
                {activityTypes.map(type => (
                    <button
                        key={type.id}
                        className={`px-3 py-1 text-sm rounded-full ${selectedActivityTypes.includes(type.id) ? 'bg-slate-800 text-white' : 'bg-gray-200 text-slate-800'}`}
                        onClick={() => onTagClick(type.id)}
                    >
                        {type.name}
                    </button>
                ))}
            </div>
        </div>
    )
}
