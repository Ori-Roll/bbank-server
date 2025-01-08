import type { User } from '@prisma/client';
import { db } from '@src/config/db';
import { prismaDisconnect } from '@src/config/dissconnect';

// **** Functions **** //

/**
 * See if a user with the given id exists.
 */
async function persists(id: string): Promise<boolean> {
  const user = await db.user.findUnique({
    where: { id },
  });
  if (!!user) {
    return true;
  }
  return false;
}

/**
 * Get one user.
 */
async function getOne(id: string): Promise<User | null> {
  const user = await db.user.findUnique({
    where: { id },
    include: {
      accounts: {
        include: {
          current: true,
          periodics: {},
        },
      },
    },
  });
  // TODO: return no user found if user is null
  prismaDisconnect();
  return user;
}

/**
 * Get all users.
 */
async function getAll(): Promise<User[]> {
  const allUsers = await db.user.findMany({
    include: {
      accounts: {
        include: {
          current: true,
          periodics: {},
        },
      },
    },
  });
  if (!allUsers) return [];
  prismaDisconnect();
  return allUsers;
}

/**
 * Add one user.
 */
async function addNewUser(user: User): Promise<User> {
  const newUser = await db.user.create({
    data: {
      ...user,
      // TODO: The account is mandatory, but the user should be able to create an account later
    },
  });
  prismaDisconnect();
  return newUser;
}

/**
 * Update a user.
 */
async function updateUser(id: string, user: Partial<User>): Promise<User> {
  const updatedUser = await db.user.update({
    where: { id },
    data: user,
  });
  prismaDisconnect();
  return updatedUser;
}

/**
 * Delete one user.
 */
async function deleteUser(id: string): Promise<void> {
  await db.user.delete({
    where: { id },
  });
  prismaDisconnect();
}

// **** Export default **** //

export default {
  getOne,
  persists,
  getAll,
  addNewUser,
  updateUser,
  delete: deleteUser,
} as const;
