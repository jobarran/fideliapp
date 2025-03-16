import React from 'react'
import { CompanyClientDashboard } from '@/interfaces'

interface Props {
    content: React.ReactNode; 
}

export const ProfileContent  = ({ content }: Props) => {

    return (
        <div className="p-4 border rounded-lg bg-white">
            {content}
        </div>

    )
}
