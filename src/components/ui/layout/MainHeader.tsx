'use client';

import { Avatar, CompanyLinkImage } from '@/components'
import React from 'react'

interface Props {
    headerClass: string
    img?: string
    title: string
    subtitle: string
    checked?: boolean
    actionButtons?: React.ReactNode
}

export const MainHeader = ({ headerClass, img, title, subtitle, checked, actionButtons }: Props) => {

    return (

        <header
            className={`bg-white border-2 shadow-sm rounded-lg p-4 relative ${headerClass}`}
        >
            <div className="flex space-x-6">
                <div className="relative w-28 h-28 rounded-full overflow-hidden flex items-center justify-center bg-white">
                    {img ? (
                        <CompanyLinkImage
                            src={img}
                            alt={title}
                            className="object-cover"
                            width={0}
                            height={0}
                            style={{ width: '100%', height: '100%' }}
                        />
                    ) : (
                        <Avatar name={title} size={'28'} className ={'border-4 border-slate-200'} />
                    )}
                </div>
                <div className="flex-1">
                    <h1 className="text-lg sm:text-3xl font-semibold text-gray-800">{title}</h1>
                    <p className="text-sm text-gray-500">{subtitle}</p>
                </div>
            </div>

            {checked && (
                <div className="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-green-600 border-2 border-white rounded-full -top-2 -right-2">
                    ✔
                </div>
            )}

            {actionButtons && (
                <div className="absolute bottom-4 right-4 flex space-x-2">
                    {actionButtons}
                </div>
            )}

        </header>
    )
}
