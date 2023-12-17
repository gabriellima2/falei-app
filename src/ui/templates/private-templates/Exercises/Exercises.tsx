import styled, { css } from "styled-components/native";

import { useExercisesState } from "./hooks/use-exercises-state";

import { LoadingIndicator, TextError, Header } from "@/ui/atoms";
import { ExerciseList, FilterByCategory } from "./components";
import { WithQuery } from "@/hocs";

import { makeBreathingExerciseService } from "@/factories/services/make-breathing-exercise-service";
import { ExerciseCategoryEntity } from "@/entities/exercise-category.entity";

import type {
	BreathingExerciseEntity,
	BreathingAppointmentEntity,
} from "@/entities/breathing-entities";
import type { WithQueryInjectProps } from "@/hocs/WithQuery";

type ExercisesProps = WithQueryInjectProps<{
	appointments: BreathingAppointmentEntity[];
	exercises: BreathingExerciseEntity[];
}>;

export const Exercises = WithQuery(
	(props: ExercisesProps) => {
		const {
			exercises,
			incompleteExercises,
			category,
			error,
			isLoading,
			handleCategoryChange,
		} = useExercisesState(props.data);

		const hasActiveIncompleteExercisesCategory =
			category === ExerciseCategoryEntity.Incomplete && !!incompleteExercises;

		return (
			<>
				<Header title="Exercícios" />
				<Content>
					<FilterByCategory
						initialValue={ExerciseCategoryEntity.Incomplete}
						onChange={([category]) =>
							handleCategoryChange(category as ExerciseCategoryEntity)
						}
					/>
					{isLoading && <LoadingIndicator />}
					{!!error && !isLoading && (
						<TextError>{(error as Error).message}</TextError>
					)}
					{!error && !isLoading && exercises && (
						<ExerciseList
							exercises={
								hasActiveIncompleteExercisesCategory
									? incompleteExercises
									: exercises
							}
							category={category}
						/>
					)}
				</Content>
			</>
		);
	},
	{
		name: "all",
		fn: () => makeBreathingExerciseService().getAll(),
	}
);

const Content = styled.View`
	${({ theme }) => css`
		gap: ${theme.spaces[5]};
	`}
`;
