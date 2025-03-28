import Link from 'next/link'
import React from 'react'
import { FaRegHeart } from 'react-icons/fa6'
import { FiTag } from 'react-icons/fi'

interface Props {
    color: string
}

export const UserCardAdd = ({ color }: Props) => {
    return (
        <Link href={`/companies`}>
            <div
                style={{
                    backgroundColor: '#F8F8F8',
                }}
            >
                <div
                    className="w-70 rounded-lg shadow-sm overflow-hidden hover:bg-white"
                    style={{ borderColor: color, borderWidth: 0.5, borderStyle: 'solid' }}
                >
                    <div className="flex flex-col items-center justify-center">
                        {/* <div className={`mt-1 text-sm font-medium text-${color}`}></div> */}
                        <div className="mt-7 mb-2">
                            {/* Dotted circle with "+" inside */}
                            <div className="w-16 h-16 rounded-full border border-dotted border-slate-400 flex items-center justify-center">
                                <p className={`text-4xl font-thin text-${color}`}>
                                    +
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center justify-between px-4 pb-2">
                        {/* Mis puntos section at bottom left */}
                        <div className="flex flex-col items-start">
                            <FiTag size={16} className={`text-slate-400`} />
                        </div>
                        {/* Icons section at bottom right */}
                        <div className="flex space-x-2">
                            <FaRegHeart size={16} className={`text-slate-400`} />
                        </div>
                    </div>
                </div>

            </div>
        </Link >
    )
}
