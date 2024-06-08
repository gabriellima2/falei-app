import { useRouter } from "expo-router";

import { useToastContext } from "@/contexts/ToastContext";

import { makePoemService } from "@/factories/services/make-poem-service";

import { createPoemExerciseMapper } from "../mappers/create-poem-exercise.mapper";
import { UNEXPECTED_ERROR } from "@/errors";

import type { CreatePoemFields } from "@/schemas";

const service = makePoemService();

export function useCreatePoemExercise() {
	const { notify } = useToastContext();
	const router = useRouter();

	const handleCreate = async (userId: string, values: CreatePoemFields) => {
		try {
			await service.create(userId, createPoemExerciseMapper(values));
			notify("Poema criado com sucesso", { type: "success" });
			router.push("/(tabs)/(exercises)");
		} catch (error) {
			const _error = (error as Error).message || UNEXPECTED_ERROR;
			notify(_error, { type: "alert" });
		}
	};

	return { handleCreate };
}
