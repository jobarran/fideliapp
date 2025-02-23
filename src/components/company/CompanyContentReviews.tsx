'use client';

import { CompanyReview } from '@/interfaces/review.interface';
import React, { useState } from 'react';
import { FaStar } from 'react-icons/fa6';
import { CompanyContentReviewsDetail } from './CompanyContentReviewsDetail';

interface Props {
    reviews: CompanyReview[] | null;
}

export const CompanyContentReviews = ({ reviews }: Props) => {
    const [filter, setFilter] = useState<number | null>(null);

    const filteredReviews = filter
        ? reviews?.filter((review) => review.rating === filter)
        : reviews;

    const handleFilter = (rating: number | null) => {
        setFilter(rating === filter ? null : rating);
    };

    if (!reviews || reviews.length === 0) {
        return (
            <div className="py-4 text-center text-gray-500">
                Todavía la empresa no tiene comentarios
            </div>
        );
    }

    return (
        <div className="space-y-4">
            {/* Filter Bar */}
            <div className="border rounded-md p-2">
                <div className="flex justify-between items-center p-2">
                    {/* Show All Option */}
                    <button
                        onClick={() => handleFilter(null)}
                        className="focus:outline-none"
                    >
                        <div className="flex flex-col items-center">
                            <div className="hidden sm:flex items-center space-x-1">
                                <FaStar className={`text-lg transition-colors ${filter === null ? 'text-slate-800' : 'text-slate-300'}`} />
                            </div>
                            <span className="hidden sm:flex mt-2 text-xs text-gray-500 ${filter === null ? 'text-slate-800' : 'text-gray-500'}">Mostrar todo</span>
                            <div className="sm:hidden flex items-center space-x-1">
                                <span className={`text-lg font-semibold ${filter === null ? 'text-slate-800' : 'text-slate-300'}`}>Todo</span>
                                <FaStar className={`text-lg ${filter === null ? 'text-slate-800' : 'text-slate-300'}`} />
                            </div>
                        </div>
                    </button>

                    {Array.from({ length: 5 }, (_, i) => i + 1).map((rating) => (
                        <button
                            key={rating}
                            onClick={() => handleFilter(rating)}
                            className="focus:outline-none"
                        >
                            <div className="flex flex-col items-center">
                                <div className="sm:flex items-center space-x-1 hidden">
                                    {Array.from({ length: 5 }, (_, starIndex) => (
                                        <FaStar
                                            key={starIndex}
                                            className={`text-lg transition-colors ${starIndex < rating
                                                ? rating === filter
                                                    ? 'text-slate-800'
                                                    : 'text-slate-300'
                                                : 'text-slate-100'
                                                }`}
                                        />
                                    ))}
                                </div>
                                <div className="sm:hidden flex items-center space-x-1">
                                    <span className={`text-lg font-semibold ${rating === filter ? 'text-slate-800' : 'text-slate-300'}`}>{rating}</span>
                                    <FaStar className={`text-lg ${rating === filter ? 'text-slate-800' : 'text-slate-300'}`} />
                                </div>
                                <span className={`hidden sm:flex mt-2 text-xs ${rating === filter ? 'text-slate-800' : 'text-slate-500'}`}>{rating} estrella{rating > 1 ? 's' : ''}</span>
                            </div>
                        </button>
                    ))}
                </div>
            </div>

            {/* Reviews List */}
            {filteredReviews?.length ? (
                filteredReviews.map((review) => (
                    <div
                        key={review.id}
                        className="border border-gray-200 rounded-md p-4 bg-white"
                    >
                        {/* User Info and Rating */}
                        <div className="flex justify-between items-start">
                            <div>
                                <h3 className="text-base font-semibold text-gray-800">
                                    {review.user.name} {review.user.lastName}
                                </h3>
                                <p className="text-xs text-gray-500">
                                    {new Date(review.createdAt).toLocaleDateString()}
                                </p>
                            </div>
                            <div className="flex items-center space-x-1">
                                {Array.from({ length: 5 }, (_, i) => (
                                    <FaStar
                                        key={i}
                                        className={`${i < review.rating
                                            ? 'text-slate-800'
                                            : 'text-slate-200'
                                            } text-lg`}
                                    />
                                ))}
                            </div>
                        </div>

                        {/* Comment */}
                        <p className="mt-2 text-sm text-gray-600 italic">
                            "{review.comment || 'No tiene comentarios'}"
                        </p>

                        {/* Point Transaction Details */}
                        <CompanyContentReviewsDetail pointTransaction={review.pointTransaction} />
                    </div>
                ))
            ) : (
                <div className="py-4 text-center text-gray-500">
                    No hay comentarios con esta cantidad de estrellas.
                </div>
            )}
        </div>
    );
};
