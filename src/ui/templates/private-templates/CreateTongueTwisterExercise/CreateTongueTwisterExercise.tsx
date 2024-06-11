import { Redirect } from "expo-router";

import { useCreateTongueTwisterExerciseForm } from "./hooks/use-create-tongue-twister-exercise-form";
import { useAuthenticationStore } from "@/store/authentication-store";

import { ScrollContainer, Header, Form } from "@/ui/atoms";
import { Field } from "@/ui/components";

import { useCreateTongueTwisterExercise } from "./hooks/use-create-tongue-twister-exercise";

export const CreateTongueTwisterExercise = () => {
	const { user } = useAuthenticationStore();
	const { handleCreate } = useCreateTongueTwisterExercise();
	const { isSubmitting, handleSubmit, errors, setValue } =
		useCreateTongueTwisterExerciseForm();
	if (!user) return <Redirect href="/(auth)/login" />;
	return (
		<ScrollContainer>
			<Header title="Trava-língua" />
			<Form.Root>
				<Form.Content>
					<Field
						labelText="Conteúdo"
						labelId="content"
						placeholder="Digite o trava-língua..."
						multiline
						onChangeText={(v) => setValue("content", v)}
						errorMessage={errors.content?.message}
					/>
					<Field
						labelText="Autor"
						labelId="author"
						placeholder="Ex: Fernando Pessoa"
						onChangeText={(v) => setValue("author", v)}
						errorMessage={errors.author?.message}
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
