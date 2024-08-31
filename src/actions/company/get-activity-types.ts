'use server';

import prisma from '@/lib/prisma';

export const getActivityTypes = async () => {
  try {
    const activityTypes = await prisma.activityType.findMany({
      select: {
        id: true,
        name: true,
      },
      orderBy: {
        name: 'asc',
      },
    });
    return activityTypes;
  } catch (error) {
    console.error('Error fetching activity types:', error);
    return [];
  }
};
