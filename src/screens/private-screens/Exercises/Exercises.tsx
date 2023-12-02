import { LoadingIndicator, TextError, Header } from "@/components";
import { ExerciseList, FilterByCategory } from "./components";

import { useExercises } from "./hooks/use-exercises";
import { ExerciseCategoryEntity } from "@/entities/exercise-category.entity";
import styled, { css } from "styled-components/native";

export const Exercises = () => {
	const { exercises, category, error, isLoading, handleCategoryChange } =
		useExercises();
	return (
		<>
			<Header title="Exercícios" />
			<Content>
				<FilterByCategory
					initialValue={ExerciseCategoryEntity.Breathing}
					onChange={([category]) =>
						handleCategoryChange(category as ExerciseCategoryEntity)
					}
				/>
				{isLoading && <LoadingIndicator />}
				{error && <TextError>{(error as Error).message}</TextError>}
				{!error && exercises && (
					<ExerciseList exercises={exercises} category={category} />
				)}
			</Content>
		</>
	);
};

const Content = styled.View`
	${({ theme }) => css`
		gap: ${theme.spaces[5]};
	`}
`;
