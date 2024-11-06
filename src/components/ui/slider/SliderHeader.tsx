import Link from 'next/link'

interface Props {
    label:string,
    seeAllLabel:string,
    href: string
}

export const SliderHeader = ({ label, href, seeAllLabel }: Props) => {
    return (
        <div className="flex justify-between items-center">
            <p className="text-base md:text-lg font-semibold text-gray-900">{label}</p>
            <Link
                className="cursor-pointer"
                href={href}>
                <p className="text-sm text-gray-900">{seeAllLabel}</p>
            </Link>
        </div>)
}
