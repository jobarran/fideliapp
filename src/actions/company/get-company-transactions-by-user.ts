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
            user: { select: { name: true, lastName: true, id: true } },
            History: {
              include: {
                transactionProducts: true, // Include associated products
              },
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

    const transactions = companyWithTransactions.Cards.flatMap((card) =>
      card.History.map((transaction) => ({
        ...transaction,
        cardId: card.id,
        companyId: companyWithTransactions.id,
        clientName: companyWithTransactions.user.name,
        clientLastName: companyWithTransactions.user.lastName,
        userName: card.user.name || '',
        userLastName: card.user.lastName || '',
        userId: card.user.id || '',
        transactionProducts: transaction.transactionProducts || [], // Ensure products is included
        description: transaction.description || '',
        date: transaction.date.toISOString(), // Convert Date to string
      }))
    );


    return transactions; // Return the transactions
  } catch (error) {
    console.log(error);
    throw new Error('Error retrieving transactions');
  }
};
