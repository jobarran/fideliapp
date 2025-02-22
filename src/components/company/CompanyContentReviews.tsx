import { CompanyReview } from '@/interfaces/review.interface';
import React, { useState } from 'react';
import { FaStar } from 'react-icons/fa6';
import { CompanyContentReviewsDetail } from './CompanyContentReviewsDetail';

interface Props {
    reviews: CompanyReview[] | null;
}

export const CompanyContentReviews = ({ reviews }: Props) => {
    if (!reviews || reviews.length === 0) {
        return (
            <div className="py-4 text-center text-gray-500">
                No reviews available
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {reviews.map((review) => (
                <div
                    key={review.id}
                    className="border border-gray-200 rounded-md p-5 bg-white"
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
                                    className={`${
                                        i < review.rating ? 'text-slate-800' : 'text-slate-200'
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
            ))}
        </div>
    );
};