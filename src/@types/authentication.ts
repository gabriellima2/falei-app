import type { UserAuthRequestDTO } from '@/dtos'

export type Authentication<T> = (credentials: UserAuthRequestDTO) => Promise<T>
