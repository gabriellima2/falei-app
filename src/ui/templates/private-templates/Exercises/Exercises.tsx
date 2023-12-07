import styled, { css } from "styled-components/native";

import { useExercisesState } from "./hooks/use-exercises-state";

import { LoadingIndicator, TextError, Header } from "@/ui/atoms";
import { ExerciseList, FilterByCategory } from "./components";

import { ExerciseCategoryEntity } from "@/entities/exercise-category.entity";

export const Exercises = () => {
	const { exercises, category, error, isLoading, handleCategoryChange } =
		useExercisesState();
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
				{!!error && <TextError>{(error as Error).message}</TextError>}
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
