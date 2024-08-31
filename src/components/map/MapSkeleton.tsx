import React from 'react'
import { FaMapMarkedAlt } from "react-icons/fa";


export const MapSkeleton = () => {
    return (
        <div>
            <div className="flex mt-4 justify-between items-center">
                <p className="text-lg text-gray-900">Negocios cercanos</p>
                <p className="text-sm text-gray-900 cursor-pointer">Ver todos</p>
            </div>
            <div className='w-full mt-2 mb-2'>
                <div role="status" className="flex items-center justify-center h-72 bg-gray-300 rounded-lg animate-pulse">
                    <FaMapMarkedAlt className="w-10 h-10 text-gray-200" />
                </div>
            </div>
        </div>
        )
}
