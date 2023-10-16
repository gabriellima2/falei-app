import {
	addDoc,
	collection,
	deleteDoc,
	doc,
	getDoc,
	getDocs,
	orderBy,
	query,
	updateDoc,
} from "firebase/firestore";
import Constants from "expo-constants";

import { db } from "@/config/firebase";
import { BaseExerciseRepository } from "../base-exercise.repository";

import type {
	GetExerciseByIdInputDTO,
	GetExerciseByIdOutputDTO,
	GetAllExercisesOutputDTO,
	DeleteExerciseInputDTO,
	DeleteExerciseOutputDTO,
	CreateExerciseInputDTO,
	CreateExerciseOutputDTO,
	UpdateExerciseInputDTO,
	UpdateExerciseOutputDTO,
} from "@/dtos";
import type { BaseExerciseEntity } from "@/entities";

const COLLECTION_NAME = "exercises";
const DOCUMENT_ID = Constants.manifest?.extra?.exercisesDocumentId;

export class BaseExerciseRepositoryImpl<T extends BaseExerciseEntity>
	implements BaseExerciseRepository<T>
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
	async getById(id: GetExerciseByIdInputDTO): GetExerciseByIdOutputDTO<T> {
		const docRef = doc(
			db,
			COLLECTION_NAME,
			DOCUMENT_ID,
			this.subCollectionName,
			id
		);
		const docSnap = await getDoc(docRef);
		if (!docSnap.exists()) return;
		return { ...(docSnap.data() as T), id: docSnap.id };
	}
	async getAll(): GetAllExercisesOutputDTO<T> {
		const docRef = doc(db, COLLECTION_NAME, DOCUMENT_ID);
		const subCollectionRef = collection(docRef, this.subCollectionName);
		const q = query(subCollectionRef, orderBy("last_progress_at", "desc"));
		const querySnapshot = await getDocs(q);
		let data: T[] = [];
		querySnapshot.forEach((doc) => {
			data = [...data, { ...(doc.data() as T), id: doc.id }];
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