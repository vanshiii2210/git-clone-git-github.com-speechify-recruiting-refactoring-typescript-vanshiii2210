import { readDB, writeDB } from '../db/database'
import { userCache } from '../cache/user.cache'
import { User } from '../types/user'

export class UserRepository {
  async getAll(): Promise<User[]> {
    const cachedUsers = userCache.values()
    if (cachedUsers.length > 0) {
      return cachedUsers
    }

    const users = await readDB()
    users.forEach(user => userCache.set(user.id, user))
    return users
  }

  async getById(id: string): Promise<User | undefined> {
    const cached = userCache.get(id)
    if (cached) return cached

    const users = await readDB()
    const user = users.find(u => u.id === id)
    if (user) userCache.set(id, user)

    return user
  }

  async save(user: User): Promise<void> {
    const users = await readDB()
    const index = users.findIndex(u => u.id === user.id)

    if (index >= 0) {
      users[index] = user
    } else {
      users.push(user)
    }

    await writeDB(users)
    
    userCache.set(user.id, user)
  }
}
