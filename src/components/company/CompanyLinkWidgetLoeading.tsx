import React from 'react'
import { CompanyLinkImage } from './CompanyLinkImage';

export const CompanyLinkWidgetLoading = () => {
    return (
        <div className="rounded-lg overflow-hidden animate-pulse">
            <div className="flex items-center justify-center text-gray-600 mt-2">
                <div className="w-20 h-3 bg-gray-300 rounded"></div>
            </div>
        </div>
    )
}
