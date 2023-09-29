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
import { BaseScheduledExerciseRepository } from "../base-scheduled-exercise.repository";
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
import type {
	BaseExerciseEntity,
	BaseScheduledExerciseEntity,
} from "@/entities";

const COLLECTION_NAME = "scheduled_exercises";
const DOCUMENT_ID = Constants.manifest?.extra?.schedulesDocumentId;

export class BaseScheduledExerciseRepositoryImpl<
	Entity extends BaseScheduledExerciseEntity,
	RepositoryEntity extends BaseExerciseEntity
> implements BaseScheduledExerciseRepository<Entity>
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
		let schedules: Entity[] = [];
		subCollectionSnap.forEach((doc) => {
			schedules = [...schedules, { ...(doc.data() as Entity), id: doc.id }];
		});
		const promises = schedules.map(async (schedule) => {
			const exercise = await this.repository.getById(schedule.exercise_id);
			return { ...exercise, ...schedule };
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
