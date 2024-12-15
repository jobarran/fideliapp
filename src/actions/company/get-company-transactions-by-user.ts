'use server';

import prisma from '@/lib/prisma';

export const getCompanyTransactionsByUser = async (userId: string) => {
  try {
    // Fetch the company and related data for the user
    const companyWithTransactions = await prisma.company.findFirst({
      where: {
        userId: userId,
      },
      include: {
        Cards: {
          include: {
            History: {
              orderBy: {
                date: 'desc',
              },
            },
          },
        },
        user: {
          select: {
            name: true,
            lastName: true,
          },
        }
      },

    });

    if (!companyWithTransactions) return null;

    // Flatten the result to return only transactions
    const transactions = companyWithTransactions.Cards.flatMap((card) =>
      card.History.map((transaction) => ({
        ...transaction,
        cardId: card.id,
        companyId: companyWithTransactions.id,
        clientName: companyWithTransactions.user.name,
        clientLastName: companyWithTransactions.user.lastName,
      }))
    );

    return transactions; // Return the transactions
  } catch (error) {
    console.log(error);
    throw new Error('Error retrieving transactions');
  }
};
