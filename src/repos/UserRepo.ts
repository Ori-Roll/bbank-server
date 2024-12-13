import type { User } from '@prisma/client';
import { getRandomInt } from '@src/util/misc';
import { db } from '@src/libs/db';
import { prismaDisconnect } from '@src/libs/dissconnect';

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
async function add(user: User): Promise<void> {
  // const _db = await orm.open_db();
  // user.id = getRandomInt();
  // _db.users.push(user);
  // return orm.save_db(_db);
}

/**
 * Update a user.
 */
async function update(user: Pick<User, 'id'> & Partial<User>): Promise<void> {
  // const _db = await orm.open_db();
  // for (let i = 0; i < _db.users.length; i++) {
  //   if (_db.users[i].id === user.id) {
  //     const _dbUser = _db.users[i];
  //     _db.users[i] = {s
  //       ..._dbUser,
  //       name: user.name,
  //       email: user.email,
  //     };
  //     return orm.save_db(_db);
  //   }
  // }
}

/**
 * Delete one user.
 */
async function delete_(id: string): Promise<void> {
  // const _db = await orm.open_db();
  // for (let i = 0; i < _db.users.length; i++) {
  //   if (_db.users[i].id === id) {
  //     _db.users.splice(i, 1);
  //     return orm.save_db(_db);
  //   }
  // }
}

// **** Export default **** //

export default {
  getOne,
  persists,
  getAll,
  add,
  update,
  delete: delete_,
} as const;
