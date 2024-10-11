import Link from 'next/link'
import React from 'react'
import { FaHeart, FaRegHeart } from 'react-icons/fa6'

interface Props {
    color: string
}

export const UserCardAdd = ({ color }: Props) => {
    return (
        <Link href={`/companies`}>
            <div
                className="w-70 rounded-lg shadow-sm overflow-hidden hover:bg-white"
                style={{ borderColor: color, borderWidth: 2, borderStyle: 'solid' }}
            >
                <div className="flex flex-col items-center justify-center">
                    <div className={`mt-2 text-sm font-medium text-${color}`}>Nueva Tarjeta</div>
                    <div className="mt-1 mb-2">
                        {/* Dotted circle with "+" inside */}
                        <div className="w-16 h-16 rounded-full border-2 border-dotted border-slate-400 flex items-center justify-center">
                            <p className={`text-5xl font-thin text-${color}`}>
                                +
                            </p>
                        </div>
                    </div>
                </div>
                <div className="flex items-center justify-between px-4 pb-2">
                    {/* Mis puntos section at bottom left */}
                    <div className="flex flex-col items-start">
                        <p className={`text-xs font-medium text-${color}`}>{`Puntos`}</p>
                    </div>
                    {/* Icons section at bottom right */}
                    <div className="flex space-x-2">
                        <FaRegHeart size={16} className={`text-${color}`} />
                    </div>
                </div>
            </div>
        </Link>
    )
}
