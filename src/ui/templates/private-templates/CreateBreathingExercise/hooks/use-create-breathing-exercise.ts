import { useRouter } from "expo-router";

import { useToastContext } from "@/contexts/ToastContext";

import { makeBreathingService } from "@/factories/services/make-breathing-service";

import { createBreathingExerciseMapper } from "../mappers/create-breathing-exercise.mapper";
import { reminderValidation } from "@/validations";
import { UNEXPECTED_ERROR } from "@/errors";

import type { CreateBreathingExerciseFields } from "@/schemas";

const service = makeBreathingService();

export function useCreateBreathingExercise() {
	const { notify } = useToastContext();
	const router = useRouter();

	const handleCreate = async (
		userId: string,
		hasReminder: boolean,
		values: CreateBreathingExerciseFields
	) => {
		const result = reminderValidation(values, { hasReminder });
		if (result) return notify(result, { type: "alert" });
		try {
			await service.create(userId, createBreathingExerciseMapper(values));
			notify("Exercício criado com sucesso", { type: "success" });
			router.push("/(tabs)/(exercises)");
		} catch (error) {
			const _error = (error as Error).message || UNEXPECTED_ERROR;
			notify(_error, { type: "alert" });
		}
	};

	return { handleCreate };
}
