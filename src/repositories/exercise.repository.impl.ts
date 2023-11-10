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

import type { ExerciseRepository } from "./exercise.repository";
import type { ExerciseEntity } from "@/entities/exercise.entity";
import type * as DTO from "@/dtos/exercise.dto";

export class ExerciseRepositoryImpl implements ExerciseRepository {
	private readonly collection;
	private readonly document;
	constructor() {
		this.collection = "exercises";
		this.document = Constants.manifest?.extra?.exercisesDocumentId;
	}
	async delete(
		params: DTO.DeleteExerciseInputDTO
	): DTO.DeleteExerciseOutputDTO {
		const { id, category } = params;
		const docRef = doc(db, this.collection, this.document, category, id);
		await deleteDoc(docRef);
	}
	async getById<T extends ExerciseEntity>(
		params: DTO.GetExerciseByIdInputDTO
	): DTO.GetExerciseByIdOutputDTO<T> {
		const { id, category } = params;
		const docRef = doc(db, this.collection, this.document, category, id);
		const docSnap = await getDoc(docRef);
		if (!docSnap.exists()) return;
		return { ...(docSnap.data() as T), id: docSnap.id };
	}
	async create<T extends ExerciseEntity>(
		params: DTO.CreateExerciseInputDTO<T>
	): DTO.CreateExerciseOutputDTO<T> {
		const { category, ...rest } = params;
		const docRef = doc(db, this.collection, this.document);
		const subCollectionRef = collection(docRef, category);
		const createdExercise = await addDoc(subCollectionRef, rest);
		return {
			...createdExercise,
		} as unknown as T;
	}
	async update<T extends ExerciseEntity>(
		params: DTO.UpdateExerciseInputDTO<T>
	): DTO.UpdateExerciseOutputDTO {
		const { id, category } = params;
		const docRef = doc(db, this.collection, this.document, category, id);
		await updateDoc(docRef, params);
	}
	async getAll<T extends ExerciseEntity>(
		params: DTO.GetAllExercisesInputDTO
	): DTO.GetAllExercisesOutputDTO<T> {
		const { category } = params;
		const docRef = doc(db, this.collection, this.document);
		const subCollectionRef = collection(docRef, category);
		const q = query(subCollectionRef, orderBy("last_progress_at", "desc"));
		const querySnapshot = await getDocs(q);
		let data: T[] = [];
		querySnapshot.forEach((doc) => {
			data = [...data, { ...(doc.data() as T), id: doc.id, category }];
		});
		return data;
	}
}
