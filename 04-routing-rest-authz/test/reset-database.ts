import { readFileSync, existsSync, unlinkSync } from 'fs';
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

sqlite3.verbose();

const dbFile = 'donutshop.db';
const sqlScript = 'test-data.sql';

export async function resetDb(): Promise<void> {
  if (existsSync(dbFile)) {
    unlinkSync(dbFile);
  }

  const db = await open({
    filename: dbFile,
    driver: sqlite3.Database,
  });

  const statements = readFileSync(sqlScript, 'utf-8')
    .split(';')
    .map((s) => s.trim())
    .filter((s) => !!s);

  let success = 0;
  for (const s of statements) {
    await db.run(s);
    success++;
  }
  console.log(
    'Executed',
    success,
    'statements from',
    sqlScript,
    'in',
    dbFile
  );
}

resetDb();
