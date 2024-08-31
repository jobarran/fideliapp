import React from 'react'

interface Props {
    text: string
    height: string
}
export const FullWidthLoading = ({ text, height }: Props) => {

    return (

        <div className={`w-full flex flex-col items-center justify-center h-${height} space-y-2`}>
            <p className="text-gray-600">{text}</p>
        </div>

    )
}
