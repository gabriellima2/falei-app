import { Redirect, useRouter } from "expo-router";

import { usePoemForm } from "./hooks/use-poem-form";
import { useToastContext } from "@/contexts/ToastContext";
import { useAuthenticationStore } from "@/store/authentication-store";

import { ScrollContainer, Header, Form } from "@/ui/atoms";

import { UNEXPECTED_ERROR } from "@/errors";
import type { CreatePoemFields } from "@/schemas";

import { makePoemService } from "@/factories/services/make-poem-service";
import { Field } from "@/ui/components";

import { createPoemFormMapper } from "./mappers/create-poem-form.mapper";

const service = makePoemService();

export const CreatePoemExercise = () => {
	const { isSubmitting, handleSubmit, errors, setValue } = usePoemForm();
	const { user } = useAuthenticationStore();
	const { notify } = useToastContext();
	const router = useRouter();

	if (!user) return <Redirect href="/(auth)/login" />;

	const onSubmit = async (values: CreatePoemFields) => {
		try {
			await service.create(user.id, createPoemFormMapper(values));
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
			<Form.Root>
				<Form.Content>
					<Field
						labelText="Título"
						labelId="title"
						placeholder="Ex: Autopsicografia"
						onChangeText={(v) => setValue("credits.workName", v)}
						errorMessage={errors.credits?.workName?.message}
					/>
					<Field
						labelText="Poema"
						labelId="content"
						placeholder="Digite o poema..."
						multiline
						onChangeText={(v) => setValue("content", v)}
						errorMessage={errors.content?.message}
					/>
					<Field
						labelText="Autor"
						labelId="author"
						placeholder="Ex: Fernando Pessoa"
						onChangeText={(v) => setValue("credits.author", v)}
						errorMessage={errors.credits?.author?.message}
					/>
				</Form.Content>
				<Form.Footer>
					<Form.Buttons.Cancel />
					<Form.Buttons.Submit
						isSubmitting={isSubmitting}
						onPress={handleSubmit(onSubmit)}
					/>
				</Form.Footer>
			</Form.Root>
		</ScrollContainer>
	);
};
