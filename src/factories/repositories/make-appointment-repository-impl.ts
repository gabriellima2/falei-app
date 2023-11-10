import { AppointmentRepositoryImpl } from "@/repositories/appointment.repository.impl";
import { ExerciseRepositoryImpl } from "@/repositories/exercise.repository.impl";

import type { AppointmentEntity } from "@/entities/appointment.entity";

export const makeAppointmentRepositoryImpl = <T extends AppointmentEntity>() =>
	new AppointmentRepositoryImpl<T>(new ExerciseRepositoryImpl());
