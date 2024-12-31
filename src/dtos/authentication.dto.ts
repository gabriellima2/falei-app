import type { UserEntity } from '@/entities/user.entity'

export type UserDTO = Omit<UserEntity, 'password'>
