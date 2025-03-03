'use server';

import prisma from '@/lib/prisma';
import { revalidatePath } from "next/cache";

type CreateReviewInput = {
  companyId: string;
  rating: number;
  comment?: string;
  pointTransactionId: string; // No longer optional
};

export async function createTransactionReview(data: CreateReviewInput): Promise<void> {
  const { companyId, rating, comment, pointTransactionId } = data;

  // Validation
  if (rating < 1 || rating > 5) {
    throw new Error("Rating must be between 1 and 5.");
  }
  if (!companyId) {
    throw new Error("Company ID is required.");
  }
  if (!pointTransactionId) {
    throw new Error("Point transaction ID is required.");
  }

  // Check if the point transaction exists and isn't already associated with a review
  const pointTransaction = await prisma.pointTransaction.findUnique({
    where: { id: pointTransactionId },
    include: { companyReview: true },
  });

  if (!pointTransaction) {
    throw new Error("Point transaction not found.");
  }

  if (pointTransaction.companyReview) {
    throw new Error("This point transaction already has an associated review.");
  }

  // Create the review
  await prisma.companyReview.create({
    data: {
      companyId,
      rating,
      comment,
      pointTransactionId,
    },
  });

  // Retrieve all reviews for the company including the new one
  const allReviews = await prisma.companyReview.findMany({
    where: { companyId },
    select: { rating: true },
  });

  // Calculate the average rating
  const averageRating =
    allReviews.reduce((sum, review) => sum + review.rating, 0) / allReviews.length;
  const totalRating = allReviews.length

  // Update the company's averageRating
  await prisma.company.update({
    where: { id: companyId },
    data: { averageRating, totalRating },
  });

  // Optionally revalidate the path where the reviews are displayed
  revalidatePath(`/user`);
}
