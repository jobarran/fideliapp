'use client';

import { Company } from '@/interfaces';
import Link from 'next/link';
import { cropText } from '../../utils/cropText';
import { CompanyLinkImage } from './CompanyLinkImage';
import { Avatar } from '..';
import { FiCreditCard, FiStar } from 'react-icons/fi';  // Import the star icon
import { useEffect, useState } from 'react';
import { calculateDistance } from '@/utils';
import { roundToStars } from '../../utils/roundToStars';

interface Props {
    company: Company;
    isInUserCards: boolean;
    userLocation: { lat: number; lng: number } | null;  // Add userLocation to calculate distance
}

export const CompanyGridItem = ({ company, isInUserCards, userLocation }: Props) => {

    const [distance, setDistance] = useState<number | null>(null);  // Store distance state
    const [isLoading, setIsLoading] = useState(true);  // Track loading state

    useEffect(() => {
        if (userLocation && company.lat && company.lng) {
            setIsLoading(true);
            const dist = calculateDistance(userLocation.lat, userLocation.lng, company.lat, company.lng);
            setDistance(dist);
            setIsLoading(false);
        }
    }, [userLocation, company]);

    return (
        <div className={`relative w-70 rounded-lg border border-slate-200 bg-white hover:bg-gray-100`}>
            <Link href={`/companies/${company.slug}`}>
                <div className="flex flex-col items-center justify-center h-28">
                    <div className="mt-2">
                        <div className="relative w-14 h-14 rounded-full overflow-hidden flex items-center justify-center">
                            {company.CompanyLogo?.url ? (
                                <CompanyLinkImage
                                    src={company.CompanyLogo?.url}
                                    width={0}
                                    height={0}
                                    alt={company.name}
                                    className="object-cover"
                                    priority
                                    style={{ width: '100%', height: '100%' }}
                                />
                            ) : (
                                <Avatar
                                    name={company.name}
                                    size={'14'}
                                    backgroundColor={company.backgroundColor}
                                    className={'border-4'}
                                />
                            )}
                        </div>
                        {isInUserCards && (
                            <div className="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-slate-800 border border-white rounded-full -top-2 -right-2">
                                <FiCreditCard />
                            </div>
                        )}
                    </div>
                    <div className="text-center mb-1 mt-1 text-xs">
                        {cropText(company.name, 14)}
                    </div>


                    <div className="w-full text-xs text-gray-600 flex justify-between px-2 py-1 border-t border-slate-200">
                        {/* Left: Rating */}
                        <div className="flex items-center">
                            <div className="flex items-center justify-center relative">
                                <FiStar className="text-slate-500 text-sm" />
                            </div>
                            <div className="flex items-center justify-center ml-1">
                                <span className="text-gray-800">{roundToStars(company.averageRating) || 0}</span>
                                <span className="text-gray-800 ml-1">{`(${company.totalRating || 0})`}</span>

                            </div>
                        </div>

                        {/* Right: Distance */}
                        <div className={`text-gray-400 ${isLoading ? 'animate-pulse' : ''}`}>
                            {isLoading ? (
                                <div className="flex flex-row space-x-1 items-center">
                                    <div className="h-3 w-10 bg-gray-200"></div>
                                    <span>m</span>
                                </div>
                            ) : (
                                <span>{distance} m</span>
                            )}
                        </div>
                    </div>



                </div>
            </Link>
        </div>
    );
};