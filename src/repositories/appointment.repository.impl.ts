import {
	addDoc,
	collection,
	deleteDoc,
	doc,
	getDocs,
	updateDoc,
} from "firebase/firestore";
import Constants from "expo-constants";

import { db } from "@/config/firebase";

import type { AppointmentRepository } from "./appointment.repository";
import type { AppointmentEntity } from "@/entities/appointment.entity";
import type { ExerciseRepository } from "./exercise.repository";
import type * as DTO from "@/dtos/appointment.dto";

export class AppointmentRepositoryImpl<T extends AppointmentEntity>
	implements AppointmentRepository
{
	private readonly collection: string;
	private readonly document: string;
	constructor(private readonly repository: ExerciseRepository) {
		this.collection = "appointments";
		this.document = Constants.manifest?.extra?.appointmentsDocumentId;
	}
	async delete(
		params: DTO.DeleteAppointmentInputDTO
	): DTO.DeleteAppointmentOutputDTO {
		const { id, category } = params;
		const docRef = doc(db, this.collection, this.document, category, id);
		await deleteDoc(docRef);
	}
	async create<T extends AppointmentEntity>(
		params: DTO.CreateAppointmentInputDTO<T>
	): DTO.CreateAppointmentOutputDTO<T> {
		const { category, ...appointment } = params;
		const docRef = doc(db, this.collection, this.document);
		const subCollectionRef = collection(docRef, category);
		const createdExercise = await addDoc(subCollectionRef, appointment);
		return {
			...createdExercise,
		} as unknown as T;
	}
	async update(
		params: DTO.UpdateAppointmentInputDTO<T>
	): DTO.UpdateAppointmentOutputDTO {
		const { id, category } = params;
		const docRef = doc(db, this.collection, this.document, category, id);
		await updateDoc(docRef, params);
	}
	async getAll<T extends AppointmentEntity>(
		params: DTO.GetAllAppointmentsInputDTO
	): DTO.GetAllAppointmentsOutputDTO<T> {
		const { category } = params;
		const docRef = doc(db, this.collection, this.document);
		const subCollectionRef = collection(docRef, category);
		const subCollectionSnap = await getDocs(subCollectionRef);
		let appointments: T[] = [];
		subCollectionSnap.forEach((doc) => {
			appointments = [
				...appointments,
				{ ...(doc.data() as T), id: doc.id, category },
			];
		});
		const promises = appointments.map(async (appointment) => {
			const exercise = await this.repository.getById({
				id: appointment.exerciseID,
				category,
			});
			return { ...exercise, ...appointment };
		});
		return await Promise.all(promises);
	}
}
