"use client";

import React from 'react';
import { CompaniesAllLoadingCard } from './CompaniesAllLoadingCard';

export const CompaniesAllLoading = () => {
    return (
        <div className="flex flex-row gap-2 flex-nowrap overflow-hidden">
            {/* Card 1: Always visible */}
            <div className="flex flex-row gap-2">
                <CompaniesAllLoadingCard />
                <CompaniesAllLoadingCard />
                <CompaniesAllLoadingCard />
                <CompaniesAllLoadingCard />
                <CompaniesAllLoadingCard />
            </div>
            {/* Card 2: Visible from md (≥768px) and up */}
            <div className="hidden sm:flex sm:flex-row sm:gap-2">
                <CompaniesAllLoadingCard />
                <CompaniesAllLoadingCard />
            </div>
            {/* Card 2: Visible from md (≥768px) and up */}
            <div className="hidden md:flex md:flex-row md:gap-2">
                <CompaniesAllLoadingCard />
                <CompaniesAllLoadingCard />
            </div>
        </div>
    );
};
