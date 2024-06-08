import { Redirect } from "expo-router";

import { useCreatePoemExerciseForm } from "./hooks/use-create-poem-exercise-form";
import { useAuthenticationStore } from "@/store/authentication-store";

import { ScrollContainer, Header, Form } from "@/ui/atoms";
import { Field } from "@/ui/components";

import { useCreatePoemExercise } from "./hooks/use-create-poem-exercise";

export const CreatePoemExercise = () => {
	const { user } = useAuthenticationStore();
	const { handleCreate } = useCreatePoemExercise();
	const { isSubmitting, handleSubmit, errors, setValue } =
		useCreatePoemExerciseForm();
	if (!user) return <Redirect href="/(auth)/login" />;
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
						onPress={handleSubmit((values) => handleCreate(user.id, values))}
					/>
				</Form.Footer>
			</Form.Root>
		</ScrollContainer>
	);
};
