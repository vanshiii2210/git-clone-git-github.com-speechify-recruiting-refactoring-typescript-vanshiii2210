import { Low } from 'lowdb'
import { JSONFile } from 'lowdb/node'
import { User } from '../types/user'

type Schema = {
  users: User[]
}

const adapter = new JSONFile<Schema>('db.json')
const db = new Low(adapter, { users: [] })

export async function readDB(): Promise<User[]> {
  await db.read()
  return db.data!.users
}

export async function writeDB(users: User[]): Promise<void> {
  db.data!.users = users
  await db.write()
}
