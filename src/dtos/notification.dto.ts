import { NotificationEntity } from '@/entities/notification.entity'

export type ScheduleNotificationInputDTO = Omit<NotificationEntity, 'id'>
export type ScheduleNotificationOutputDTO = Promise<NotificationEntity[]>
