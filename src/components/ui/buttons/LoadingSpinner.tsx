import React from 'react'

export const LoadingSpinner = () => {
    return (
        <div
            className="inline-block h-6 w-6 animate-spin rounded-full border-4 border-solid border-current border-e-transparent text-white"
            role="status"
        ></div>
    )
}
