import React from 'react'
import { Avatar, CompanyLinkImage, ProductRewardLink } from "..";
import Image from 'next/image'

interface Props {
    logo: string
    companyColor: string
    productName: string
    companyName: string
    rewardPoints: number
}

export const ProductRewardPreview = ({ logo, companyColor, productName, companyName, rewardPoints }: Props) => {
    return (
        <div
            className="rounded-lg"
            style={{
                backgroundColor: '#F8F8F8',
                borderColor: '#CBD5E1',
                borderWidth: 0.5,
                borderStyle: 'solid',
            }}
        >
            <div
                className="w-full rounded-lg overflow-hidden"
                style={{
                    borderColor: '#F8F8F8',
                    borderWidth: 0.5,
                    borderStyle: 'solid',
                }}
            >
                <div className="flex items-center bg-white p-2">

                    {/* Product Image Section */}
                    <div className="w-10 h-10 rounded-full overflow-hidden mr-2" style={{ background: companyColor }}>
                        {logo ? (
                            <Image
                                src={logo}
                                alt="Preview"
                                className="object-cover w-full h-full"
                                width={0} height={0} sizes="100vw"
                                style={{ width: '100%', height: '100%' }}
                            />
                        ) : (
                            <Avatar name={productName} backgroundColor="#E5E5E5" size="10" />
                        )}
                    </div>

                    {/* Product Details Section */}
                    <div className="flex-grow min-w-0 mr-2 text-left">
                        <p className="text-slate-400 text-xs overflow-hidden text-ellipsis whitespace-nowrap">
                            {companyName}
                        </p>
                        <h3 className="text-sm font-medium text-slate-800 overflow-hidden text-ellipsis whitespace-nowrap">
                            {productName}
                        </h3>
                    </div>

                    {/* Vertical Dotted Line Separator */}
                    <div className="border-l border-dotted border-gray-300 h-12 mr-2"></div>

                    {/* Points Section */}
                    <div className="flex flex-col items-center flex-shrink-0 mx-2">
                        {/* Reward Points */}
                        <div className="text-center flex flex-col items-center space-y-1">
                            <p className="text-sm md:text-md font-normal sm:font-semibold text-amber-600">{rewardPoints}</p>
                            <p className="text-xs text-amber-600">Valor</p>
                        </div>
                    </div>

                </div>
            </div>
        </div>)
}
