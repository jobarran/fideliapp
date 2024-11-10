import React from 'react'
import { CompanyLinkImage } from '..'

export const ProductRewardLinkLoading = () => {
    return (
        <div className="rounded-lg overflow-hidden animate-pulse border border-slate-200 bg-white">
            <div className="w-full rounded-lg overflow-hidden"
                style={{ borderColor: '#F8F8F8', borderWidth: 0.5, borderStyle: 'solid' }}
            >
                <div className="flex items-center bg-white p-2">

                    {/* Product Image Section */}
                    <div className="w-10 h-10 flex-shrink-0 rounded-full overflow-hidden bg-gray-200 mr-2">
                        <CompanyLinkImage
                            src={undefined}
                            alt={'reward loading'}
                            className="object-cover"
                            width={0}
                            height={0}
                            style={{ width: '100%', height: '100%' }}
                        />
                    </div>

                    {/* Product Details Section */}
                    <div className="flex-grow min-w-0 mr-2 text-left space-y-2">
                        <div className="w-36 h-2 bg-gray-300 rounded"></div>
                        <div className="w-36 h-4 bg-gray-300 rounded"></div>
                    </div>

                    {/* Vertical Dotted Line Separator */}
                    <div className="border-l border-dotted border-gray-300 h-12 mx-1"></div>

                    {/* Points Section */}
                    <div className="flex flex-col items-center flex-shrink-0">
                        {/* Reward Points */}
                        <div className="text-center flex flex-col items-center space-y-1">
                            <div className="w-7 h-4 bg-gray-300 rounded"></div>
                            <div className="w-7 h-2 bg-gray-300 rounded"></div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}
