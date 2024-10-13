'use client';

interface Props {
    slug: string,
    bgColor: string,
    textColor: string,
    hoverColor: string
    icon: any
    action: () => void
}

export const ActionButton = ({ slug, icon, bgColor, textColor, hoverColor, action }: Props) => {

    return (
        <button
            onClick={action}
            className={`${bgColor} ${textColor} text-sm py-2 px-2 rounded-lg ${hoverColor}`}
        >
            <p> {slug} </p>
        </button>
    );
};

