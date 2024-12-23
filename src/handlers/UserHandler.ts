import { RouteError } from '@src/common/route-errors';
import HttpStatusCodes from '@src/common/HttpStatusCodes';

import UserData from '@src/dataAccess/UserData';
import type { User } from '@prisma/client';

// **** Variables **** //

export const USER_NOT_FOUND_ERR = 'User not found';

// **** Functions **** //

/**
 * Get all users.
 */
function getAll(): Promise<User[]> {
  return UserData.getAll();
}

function getOne(id: string): Promise<User | null> {
  return UserData.getOne(id);
}

/**
 * Add one user.
 */
function addOne(user: User): Promise<User> {
  return UserData.addNewUser(user);
}

/**
 * Update one user.
 */
async function updateOne(id: string, user: Partial<User>): Promise<User> {
  const persists = await UserData.persists(id);
  if (!persists) {
    throw new RouteError(HttpStatusCodes.NOT_FOUND, USER_NOT_FOUND_ERR);
  }
  // Return user
  return UserData.updateUser(id, user);
}

/**
 * Delete a user by their id.
 */
async function _delete(id: string): Promise<void> {
  const persists = await UserData.persists(id);
  if (!persists) {
    throw new RouteError(HttpStatusCodes.NOT_FOUND, USER_NOT_FOUND_ERR);
  }
  // Delete user
  return UserData.delete(id);
}

// **** Export default **** //

export default {
  getAll,
  getOne,
  addOne,
  updateOne,
  delete: _delete,
} as const;
