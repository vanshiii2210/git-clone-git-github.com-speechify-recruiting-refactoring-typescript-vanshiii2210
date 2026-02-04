import { UserRepository } from '../repositories/user.repository'
import { User } from '../types/user'

export class UserService {
  constructor(private readonly repo = new UserRepository()) {}

  getUsers(): Promise<User[]> {
    return this.repo.getAll()
  }

  getUser(id: string): Promise<User | undefined> {
    return this.repo.getById(id)
  }

  updateFirstname(id: string, firstname: string): Promise<void> {
    return this.repo.getById(id).then(user => {
      if (!user) {
        throw new Error('User not found')
      }

      const updatedUser: User = {
        ...user,
        firstname
      }

      return this.repo.save(updatedUser)
    })
  }
}
