'use server';

import prisma from '@/lib/prisma';

export const getAllRewards = async () => {
  try {
    // Fetch the PointTransactionTemplate where the type is REWARD
    const rewards = await prisma.pointTransactionTemplate.findMany({
      where: {
        type: 'REWARD',
      },
      include: {
        product: {
          select: {
            name: true,
            ProductImage: {
              select: {
                url: true,
              },
            },
            company: {
              select: {
                name: true,
              },
            },
          },
        },
      },
    });

    // Map the result to return the desired fields
    return rewards.map((reward) => ({
      id: reward.id,
      points: reward.points,
      description: reward.description,
      productName: reward.product.name,
      productImageUrl: reward.product.ProductImage?.url,
      companyName: reward.product.company.name,
    }));
  } catch (error) {
    console.error('Error fetching rewards:', error);
    return [];
  }
};
