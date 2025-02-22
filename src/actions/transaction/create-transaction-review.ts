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
  console.log(data)
  const { companyId, rating, comment, pointTransactionId } = data;

  // Validation
  if (rating < 1 || rating > 5) {
    throw new Error("Rating must be between 1 and 5.");
  }
  if (!companyId) {
    throw new Error("Company ID is required.");
  }
  if (!pointTransactionId) {
    throw new Error("Point transaction ID is required."); // Ensure pointTransactionId is provided
  }

  // Check if the point transaction exists and isn't already associated with a review
  const pointTransaction = await prisma.pointTransaction.findUnique({
    where: { id: pointTransactionId },
    include: { companyReview: true }, // Include companyReview to check for existing review
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

  // Optionally revalidate the path where the reviews are displayed
  revalidatePath(`/user`);
}
