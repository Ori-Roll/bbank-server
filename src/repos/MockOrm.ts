import jsonfile from 'jsonfile';

import type { User } from '@prisma/client';

// **** Variables **** //

const DB_FILE_NAME = 'database.json';

// **** Types **** //

interface IDb {
  users: User[];
}

// **** Functions **** //

/**
 * Fetch the json from the file.
 */
function openDb(): Promise<IDb> {
  return jsonfile.readFile(__dirname + '/' + DB_FILE_NAME) as Promise<IDb>;
}

/**
 * Update the file.
 */
function saveDb(db: IDb): Promise<void> {
  return jsonfile.writeFile(__dirname + '/' + DB_FILE_NAME, db);
}

// **** Export default **** //

export default {
  openDb,
  saveDb,
} as const;
