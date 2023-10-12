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
import { BaseAppointmentRepository } from "../base-appointment.repository";
import { BaseExerciseRepository } from "../base-exercise.repository";

import type {
	CreateExerciseInputDTO,
	CreateExerciseOutputDTO,
	UpdateExerciseInputDTO,
	UpdateExerciseOutputDTO,
	DeleteExerciseOutputDTO,
	GetAllExercisesOutputDTO,
	DeleteExerciseInputDTO,
} from "@/dtos";
import type { BaseAppointmentEntity, BaseExerciseEntity } from "@/entities";

const COLLECTION_NAME = "appointments";
const DOCUMENT_ID = Constants.manifest?.extra?.appointmentsDocumentId;

export class BaseAppointmentRepositoryImpl<
	Entity extends BaseAppointmentEntity,
	RepositoryEntity extends BaseExerciseEntity
> implements BaseAppointmentRepository<Entity>
{
	constructor(
		private readonly repository: BaseExerciseRepository<RepositoryEntity>,
		private readonly subCollectionName: string
	) {}
	async delete(id: DeleteExerciseInputDTO): DeleteExerciseOutputDTO {
		const docRef = doc(
			db,
			COLLECTION_NAME,
			DOCUMENT_ID,
			this.subCollectionName,
			id
		);
		await deleteDoc(docRef);
	}
	async getAll(): GetAllExercisesOutputDTO<Entity> {
		const docRef = doc(db, COLLECTION_NAME, DOCUMENT_ID);
		const subCollectionRef = collection(docRef, this.subCollectionName);
		const subCollectionSnap = await getDocs(subCollectionRef);
		let appointments: Entity[] = [];
		subCollectionSnap.forEach((doc) => {
			appointments = [
				...appointments,
				{ ...(doc.data() as Entity), id: doc.id },
			];
		});
		const promises = appointments.map(async (appointment) => {
			const exercise = await this.repository.getById(appointment.exercise_id);
			return { ...exercise, ...appointment };
		});
		return await Promise.all(promises);
	}
	async update(
		params: UpdateExerciseInputDTO<Entity>
	): UpdateExerciseOutputDTO {
		const docRef = doc(
			db,
			COLLECTION_NAME,
			DOCUMENT_ID,
			this.subCollectionName,
			params.id
		);
		await updateDoc(docRef, params);
	}
	async create(
		params: CreateExerciseInputDTO<Entity>
	): CreateExerciseOutputDTO<Entity> {
		const docRef = doc(db, COLLECTION_NAME, DOCUMENT_ID);
		const subCollectionRef = collection(docRef, this.subCollectionName);
		const createdExercise = await addDoc(subCollectionRef, params);
		return {
			...createdExercise,
		} as unknown as Entity;
	}
}
