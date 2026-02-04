import { LRUCache } from '../lru-cache'
import { User } from '../types/user'

export const userCache = new LRUCache<string, User>(100)
