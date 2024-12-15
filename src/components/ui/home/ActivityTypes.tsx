'use client'

import { ActivityType } from '@/interfaces'

interface Props {
    activities: ActivityType[]
}

export const ActivityTypes = ({ activities }: Props) => {

    return (
        <div>
            <div className="flex mt-4 justify-between items-center">
                <p className="text-xl text-gray-900">Categorías</p>
                <p className="text-base text-gray-900 cursor-pointer">Ver todas</p>
            </div>
            <div className="mt-2 flex flex-wrap justify-center items-center">
                {activities.map((type, index) => (
                    <button
                        type="button"
                        key={index}
                        className="inline-block m-1 rounded border border-gray-900 px-4 pb-[4px] pt-1 text-xs font-medium leading-normal text-gray-900 transition duration-150 ease-in-out hover:border-gray-200 hover:bg-white hover:text-neutral-800 focus:border-neutral-800 focus:bg-neutral-100 focus:text-neutral-800 focus:outline-none focus:ring-0 active:border-neutral-900 active:text-neutral-900 motion-reduce:transition-none"
                        data-twe-ripple-init>
                        {type.name}
                    </button>
                ))}
            </div>
        </div>
    )
}
