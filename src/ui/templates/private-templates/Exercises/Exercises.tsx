import styled, { css } from "styled-components/native";

import { useExercisesState } from "./hooks/use-exercises-state";

import { LoadingIndicator, TextError, Header } from "@/ui/atoms";
import { ExerciseList, FilterByCategory } from "./components";

import { ExerciseCategoryEntity } from "@/entities/exercise-category.entity";
import { WithQuery } from "@/hocs";
import { BreathingExerciseService } from "@/services/breathing-exercise.service";
import { makeExerciseRepositoryImpl } from "@/factories/repositories/make-exercise-repository-impl";
import { makeAppointmentRepositoryImpl } from "@/factories/repositories/make-appointment-repository-impl";
import { WithQueryInjectProps } from "@/hocs/WithQuery";
import {
	BreathingAppointmentEntity,
	BreathingExerciseEntity,
} from "@/entities/breathing-entities";

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
		fn: () =>
			new BreathingExerciseService({
				exercise: makeExerciseRepositoryImpl(),
				appointment: makeAppointmentRepositoryImpl(),
			}).getAll(),
	}
);

const Content = styled.View`
	${({ theme }) => css`
		gap: ${theme.spaces[5]};
	`}
`;
