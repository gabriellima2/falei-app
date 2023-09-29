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

import type {
	CreateExerciseInputDTO,
	CreateExerciseOutputDTO,
	UpdateExerciseInputDTO,
	UpdateExerciseOutputDTO,
	DeleteExerciseOutputDTO,
	GetAllExercisesOutputDTO,
	DeleteExerciseInputDTO,
} from "@/dtos/exercise-dtos";
import type { BaseExerciseEntity } from "@/entities";

const COLLECTION_NAME = "scheduled_exercises";
const DOCUMENT_ID = Constants.manifest?.extra?.schedulesDocumentId;

export class BaseScheduledExerciseRepositoryImpl<T extends BaseExerciseEntity>
	implements BaseScheduledExerciseRepository<T>
{
	constructor(private readonly subCollectionName: string) {}
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
	async getAll(): GetAllExercisesOutputDTO<T> {
		const docRef = doc(db, COLLECTION_NAME, DOCUMENT_ID);
		const subCollectionRef = collection(docRef, this.subCollectionName);
		const subCollectionSnap = await getDocs(subCollectionRef);
		let data: T[] = [];
		subCollectionSnap.forEach((doc) => {
			data = [...data, doc.data() as unknown as T];
		});
		return data;
	}
	async update(params: UpdateExerciseInputDTO<T>): UpdateExerciseOutputDTO {
		const docRef = doc(
			db,
			COLLECTION_NAME,
			DOCUMENT_ID,
			this.subCollectionName,
			params.id
		);
		await updateDoc(docRef, params);
	}
	async create(params: CreateExerciseInputDTO<T>): CreateExerciseOutputDTO<T> {
		const docRef = doc(db, COLLECTION_NAME, DOCUMENT_ID);
		const subCollectionRef = collection(docRef, this.subCollectionName);
		const createdExercise = await addDoc(subCollectionRef, params);
		return {
			...createdExercise,
		} as unknown as T;
	}
}
