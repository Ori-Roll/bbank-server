import { Transaction } from '@prisma/client';
import { db } from '@src/config/db';

// const addTransaction = async (
//   data: Omit<Transaction, 'id'>
// ): Promise<Transaction> => {
//   return await db.transaction.create({
//     data: {
//       ...data,
//       ...(data.periodicId
//         ? {
//             connect: {
//               periodic: data.periodicId,
//             },
//           }
//         : {}),
//       ...(data.accountId
//         ? {
//             connect: {
//               account: data.accountId,
//             },
//           }
//         : {}),
//     },
//   });
// };

const updateTransaction = async (
  id: string,
  data: Partial<Transaction>
): Promise<Transaction> => {
  return await db.transaction.update({
    where: { id },
    data,
  });
};

export default {
  // addTransaction,
  updateTransaction,
};
