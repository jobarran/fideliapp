import React from 'react'
import { CompanyClientDashboard } from '@/interfaces'

interface Props {
    content: React.ReactNode; 
}

export const ProfileContent  = ({ content }: Props) => {

    return (
        <div className="mt-4 p-4 border-1 rounded-lg bg-white">
            {content}
        </div>

    )
}
