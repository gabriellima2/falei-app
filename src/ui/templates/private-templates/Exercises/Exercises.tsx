import styled, { css } from "styled-components/native";

import { useExercisesState } from "./hooks/use-exercises-state";

import {
	ExerciseListSkeleton,
	CreateExerciseButton,
	FilterByCategory,
	ExerciseList,
	Skeleton,
} from "./components";
import { TextError, Header } from "@/ui/atoms";
import { WithQuery } from "@/hocs";

import { makeBreathingService } from "@/factories/services/make-breathing-service";
import { ExerciseCategoryEntity } from "@/entities/exercise-category.entity";

import type {
	BreathingExerciseEntity,
	BreathingAppointmentEntity,
} from "@/entities/breathing-entities";
import type { WithQueryInjectProps } from "@/hocs/WithQuery";

import { exerciseCategories } from "./constants/exercise-categories";

export type ExercisesProps = WithQueryInjectProps<{
	appointments: BreathingAppointmentEntity[];
	exercises: BreathingExerciseEntity[];
}>;

const INITIAL_CATEGORY = ExerciseCategoryEntity.Incomplete;

export const Exercises = WithQuery(
	(props: ExercisesProps) => {
		const { exercises, category, error, isLoading, handleCategoryChange } =
			useExercisesState({
				...props.data,
				initialCategory: INITIAL_CATEGORY,
			});
		return (
			<>
				<Header
					title="Exercícios"
					headerRight={() => <CreateExerciseButton />}
				/>
				<Content>
					<FilterByCategory
						categories={exerciseCategories}
						values={[category]}
						onChange={([category]) =>
							handleCategoryChange(category as ExerciseCategoryEntity)
						}
					/>
					{isLoading && <ExerciseListSkeleton />}
					{!!error && !isLoading && (
						<TextError>{(error as Error).message}</TextError>
					)}
					{!error && !isLoading && exercises && (
						<ExerciseList exercises={exercises} category={category} />
					)}
				</Content>
			</>
		);
	},
	{
		name: "breathing-exercises",
		fn: () => makeBreathingService().getAll(),
	},
	() => <Skeleton />
);

const Content = styled.View`
	${({ theme }) => css`
		gap: ${theme.spaces[5]};
	`}
`;
