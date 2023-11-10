import { AppointmentEntity } from "@/entities/appointment.entity";
import type * as DTO from "@/dtos/appointment.dto";

export interface AppointmentRepository<T extends AppointmentEntity> {
	create(
		params: DTO.CreateAppointmentInputDTO<T>
	): DTO.CreateAppointmentOutputDTO<T>;
	update(
		params: DTO.UpdateAppointmentInputDTO<T>
	): DTO.UpdateAppointmentOutputDTO;
	delete(params: DTO.DeleteAppointmentInputDTO): DTO.DeleteAppointmentOutputDTO;
	getAll(
		params: DTO.GetAllAppointmentsInputDTO
	): DTO.GetAllAppointmentsOutputDTO<T>;
}
