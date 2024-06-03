import { Redirect, useRouter } from "expo-router";

import { usePoemForm } from "@/hooks/use-poem-form";
import { useToastContext } from "@/contexts/ToastContext";
import { useAuthenticationStore } from "@/store/authentication-store";

import { ScrollContainer, Header } from "@/ui/atoms";
import { PoemForm } from "@/ui/components";

import { createPoemSchema, type CreatePoemFields } from "@/schemas";
import { UNEXPECTED_ERROR } from "@/errors";

import { makePoemService } from "@/factories/services/make-poem-service";

const service = makePoemService();

export const CreatePoemExercise = () => {
	const { isSubmitting, handleSubmit } = usePoemForm({
		schema: createPoemSchema,
	});
	const { user } = useAuthenticationStore();
	const { notify } = useToastContext();
	const router = useRouter();

	if (!user) return <Redirect href="/(auth)/login" />;

	const onSubmit = async (values: CreatePoemFields) => {
		try {
			await service.create(user.id, values);
			notify("Poema criado com sucesso", { type: "success" });
			router.push("/(tabs)/(exercises)");
		} catch (error) {
			const _error = (error as Error).message || UNEXPECTED_ERROR;
			notify(_error, { type: "alert" });
		}
	};

	return (
		<ScrollContainer>
			<Header title="Poema" />
			<PoemForm.Root>
				<PoemForm.Content></PoemForm.Content>
				<PoemForm.Footer>
					<PoemForm.CancelButton />
					<PoemForm.SubmitButton
						isSubmitting={isSubmitting}
						onPress={handleSubmit(onSubmit)}
					/>
				</PoemForm.Footer>
			</PoemForm.Root>
		</ScrollContainer>
	);
};
