'use client'

import Link from 'next/link'
import React from 'react'

export const LinkNewProject = () => {
    return (
        <Link
            href="/admin/new-project"
            className="relative group"
            onClick={() => { }}
        >
            <span
                className="">
                Nuevo Proyecto
            </span>
        </Link>)
}
