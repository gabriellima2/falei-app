import { AppointmentEntity } from "@/entities/appointment.entity";
import type * as DTO from "@/dtos/appointment.dto";

export interface AppointmentRepository {
	create<T extends AppointmentEntity>(
		params: DTO.CreateAppointmentInputDTO<T>
	): DTO.CreateAppointmentOutputDTO<T>;
	update<T extends AppointmentEntity>(
		params: DTO.UpdateAppointmentInputDTO<T>
	): DTO.UpdateAppointmentOutputDTO;
	delete(params: DTO.DeleteAppointmentInputDTO): DTO.DeleteAppointmentOutputDTO;
	getAll<T extends AppointmentEntity>(
		params: DTO.GetAllAppointmentsInputDTO
	): DTO.GetAllAppointmentsOutputDTO<T>;
}
