import { RouteError } from '@src/common/route-errors';
import HttpStatusCodes from '@src/common/HttpStatusCodes';

import UserRepo from '@src/repos/UserRepo';
import type { User } from '@prisma/client';

// **** Variables **** //

export const USER_NOT_FOUND_ERR = 'User not found';

// **** Functions **** //

/**
 * Get all users.
 */
function getAll(): Promise<User[]> {
  return UserRepo.getAll();
}

function getOne(id: string): Promise<User | null> {
  return UserRepo.getOne(id);
}

/**
 * Add one user.
 */
function addOne(user: User): Promise<void> {
  return UserRepo.add(user);
}

/**
 * Update one user.
 */
async function updateOne(
  user: Pick<User, 'id'> & Partial<User>
): Promise<void> {
  const persists = await UserRepo.persists(user.id);
  if (!persists) {
    throw new RouteError(HttpStatusCodes.NOT_FOUND, USER_NOT_FOUND_ERR);
  }
  // Return user
  return UserRepo.update(user);
}

/**
 * Delete a user by their id.
 */
async function _delete(id: string): Promise<void> {
  const persists = await UserRepo.persists(id);
  if (!persists) {
    throw new RouteError(HttpStatusCodes.NOT_FOUND, USER_NOT_FOUND_ERR);
  }
  // Delete user
  return UserRepo.delete(id);
}

// **** Export default **** //

export default {
  getAll,
  getOne,
  addOne,
  updateOne,
  delete: _delete,
} as const;
