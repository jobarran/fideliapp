import React from 'react'
import { FaMapMarkedAlt } from "react-icons/fa";


export const MapSkeleton = () => {
    return (
        <div>
            <div className='w-full mt-2 mb-2'>
                <div role="status" className="flex items-center justify-center h-96 bg-gray-300 rounded-lg animate-pulse">
                    <FaMapMarkedAlt className="w-10 h-10 text-gray-200" />
                </div>
            </div>
        </div>
        )
}
