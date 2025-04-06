import React from 'react'
import { CompanyLinkImage } from '..'

export const ProductPromoLinkLoading = () => {
    return (
        <div className="rounded-lg overflow-hidden animate-pulse border border-slate-200 bg-white h-16">
            <div className="w-full rounded-lg overflow-hidden"
                style={{ backgroundColor: '#F8F8F8' }}
            >
                <div
                    className="rounded-lg flex items-center"
                    style={{
                        backgroundColor: '#FFFFFF',
                        borderColor: '#CBD5E1',
                        borderWidth: 0.5,
                        borderStyle: 'solid',
                    }}
                >

                    {/* PromoType Section with vertically rotated text */}
                    <div
                        className="flex items-center justify-center p-1 bg-red-600 rounded-s-lg"
                        style={{
                            height: '4rem', // Match h-16
                            width: '2rem',
                        }}
                    >
                        <span
                            className="h-15 w-2 bg-gray-300 rounded"
                            style={{
                                transformOrigin: 'center',
                                whiteSpace: 'nowrap',
                            }}
                        />
                    </div>

                    {/* Coupon Cut Divider */}
                    <div className="relative h-16 flex items-center justify-center bg-white">
                        {/* Dotted Line */}
                        <div className="w-px h-full border-l border-dotted border-slate-300 z-0"></div>
                        {/* Top Half Circle */}
                        <div
                            className="absolute top-0 left-1/2 -translate-x-1/2 -mt-[1px] w-3 h-2 bg-[#F8F8F8] border-x border-b border-gray-300 rounded-b-full z-10"
                        />

                        {/* Bottom Half Circle */}
                        <div
                            className="absolute bottom-0 left-1/2 -translate-x-1/2 -mb-[1px] w-3 h-2 bg-[#F8F8F8] border-x border-t border-gray-300 rounded-t-full z-10"
                        />
                    </div>

                    <div className="flex-grow min-w-0 mr-2 ml-2 text-left flex items-center space-x-2">
                    <div className="w-8 h-8 flex-shrink-0 rounded-full overflow-hidden bg-gray-200 mr-2">
                            <CompanyLinkImage
                                src={undefined}
                                alt={'reward loading'}
                                className="object-cover"
                                width={0}
                                height={0}
                                style={{ width: '100%', height: '100%' }}
                            />
                        </div>
                        <div className="flex flex-col space-y-2">
                            <div className="w-24 h-2 bg-gray-300 rounded"></div>
                            <div className="w-20 h-2 bg-gray-300 rounded"></div>
                        </div>
                    </div>

                    {/* Vertical Dotted Line Separator */}
                    <div className="border-l border-dotted border-gray-300 h-12 mx-1"></div>

                    {/* Points Section */}
                    <div className="flex flex-col items-center flex-shrink-0">
                        {/* Reward Points */}
                        <div className="text-center flex flex-col items-center space-y-1 p-2">
                            <div className="w-7 h-4 bg-gray-300 rounded"></div>
                            <div className="w-7 h-2 bg-gray-300 rounded"></div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}
