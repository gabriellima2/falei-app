import { useRouter } from "expo-router";

import { useToastContext } from "@/contexts/ToastContext";

import { makeTongueTwisterService } from "@/factories/services/make-tongue-twister-service";

import { createTongueTwisterExerciseMapper } from "../mappers/create-tongue-twister-exercise.mapper";
import { UNEXPECTED_ERROR } from "@/errors";

import type { CreateTongueTwisterFields } from "@/schemas";

const service = makeTongueTwisterService();

export function useCreateTongueTwisterExercise() {
	const { notify } = useToastContext();
	const router = useRouter();

	const handleCreate = async (
		userId: string,
		values: CreateTongueTwisterFields
	) => {
		try {
			await service.create(userId, createTongueTwisterExerciseMapper(values));
			notify("Trava-língua criado com sucesso", { type: "success" });
			router.push("/(tabs)/(exercises)");
		} catch (error) {
			const _error = (error as Error).message || UNEXPECTED_ERROR;
			notify(_error, { type: "alert" });
		}
	};

	return { handleCreate };
}
