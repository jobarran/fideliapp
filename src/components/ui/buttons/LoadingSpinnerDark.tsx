import React from 'react'

export const LoadingSpinnerDark = () => {
    return (
        <div
            className="inline-block h-6 w-6 animate-spin rounded-full border-4 border-solid border-current border-e-transparent text-slate-800"
            role="status"
        ></div>
    )
}
