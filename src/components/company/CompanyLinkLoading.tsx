import React from 'react'
import { CompanyLinkImage } from './CompanyLinkImage';

export const CompanyLinkLoading = () => {
    return (
        <div className="rounded-lg overflow-hidden animate-pulse border-2 border-slate-200 bg-white">
            <div className="flex flex-col items-center justify-center h-24 bg-white p-4">
                {/* Placeholder for company image */}
                <div className="mt-1 mb-2">
                    <div className="relative w-16 h-16 rounded-full overflow-hidden flex items-center justify-center bg-gray-200">
                        <CompanyLinkImage
                            src={undefined}
                            width={0}
                            height={0}
                            alt={'companies skeleton'}
                            className="object-cover"
                            priority
                            style={{ width: '100%', height: '100%' }}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}
