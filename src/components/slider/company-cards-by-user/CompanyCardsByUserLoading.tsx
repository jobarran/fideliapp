"use client";

import React from 'react';
import { CompanyCardsByUserLoadingCard } from './CompanyCardsByUserLoadingCard';

export const CompanyCardsByUserLoading = () => {
    return (
        <div className="flex flex-row gap-2 flex-nowrap overflow-hidden">
            {/* Card 1: Always visible */}
            <div className="flex-none">
                <CompanyCardsByUserLoadingCard />
            </div>
            {/* Card 1: Always visible */}
            <div className="flex-none">
                <CompanyCardsByUserLoadingCard />
            </div>
            {/* Card 1: Always visible */}
            <div className="flex-none">
                <CompanyCardsByUserLoadingCard />
            </div>
            {/* Card 2: Visible from md (≥768px) and up */}
            <div className="hidden md:block flex-none">
                <CompanyCardsByUserLoadingCard />
            </div>

            {/* Card 3: Visible from lg (≥1024px) and up */}
            <div className="hidden lg:block flex-none">
                <CompanyCardsByUserLoadingCard />
            </div>

            {/* Card 4: Visible from xl (≥1280px) and up */}
            <div className="hidden xl:block flex-none">
                <CompanyCardsByUserLoadingCard />
            </div>
        </div>
    );
};
