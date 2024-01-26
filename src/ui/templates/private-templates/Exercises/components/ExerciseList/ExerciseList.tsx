import { useCallback } from "react";
import { FlatList, type ListRenderItemInfo } from "react-native";
import styled, { css } from "styled-components/native";

import {
	ReadExercise,
	BreathingExercise,
	IncompleteExercise,
} from "@/ui/components";
import { Header } from "./components/Header";

import { categoriesPortuguese } from "@/constants/categories-portuguese";
import { dimensions } from "@/constants/dimensions";

import { ExerciseCategoryEntity } from "@/entities/exercise-category.entity";
import type { BreathingExerciseEntity } from "@/entities/breathing-entities";
import type { ReadExerciseEntity } from "@/entities/read-entities";
import type { ExerciseEntity } from "@/entities/exercise.entity";

export type ExerciseListProps = {
	exercises: Omit<ExerciseEntity, "category">[];
	category: ExerciseCategoryEntity;
};

const exerciseItem = {
	[ExerciseCategoryEntity.Incomplete]: (props: ExerciseEntity) => (
		<IncompleteExercise {...(props as BreathingExerciseEntity)} />
	),
	[ExerciseCategoryEntity.Breathing]: (props: ExerciseEntity) => (
		<BreathingExercise {...(props as BreathingExerciseEntity)} />
	),
	[ExerciseCategoryEntity.TongueTwister]: (props: ExerciseEntity) => (
		<ReadExercise {...(props as ReadExerciseEntity)} />
	),
	[ExerciseCategoryEntity.Poem]: (props: ExerciseEntity) => (
		<ReadExercise {...(props as ReadExerciseEntity)} />
	),
};

const DEFAULT_SPACING = 16;
const NUM_COLUMNS = Math.round(
	(dimensions.window.withMargin.width - DEFAULT_SPACING) / 180
);

export const ExerciseList = (props: ExerciseListProps) => {
	const { exercises, category } = props;
	const ExerciseItem = exerciseItem[category];
	const title = categoriesPortuguese[category];

	const render = useCallback(
		(params: ListRenderItemInfo<Omit<ExerciseEntity, "category">>) => {
			const { index, item } = params;
			const itIsNotInTheLastColumn = (index + 1) % NUM_COLUMNS === 0;
			return (
				<ExerciseContainer
					hasMiddleSpacing={itIsNotInTheLastColumn}
					testID="exercise"
				>
					<ExerciseItem {...(item as ExerciseEntity)} />
				</ExerciseContainer>
			);
		},
		[category]
	);

	return (
		<FlatList
			numColumns={NUM_COLUMNS > 3 ? 3 : NUM_COLUMNS}
			data={exercises}
			ListHeaderComponent={() => <Header title={title} />}
			renderItem={render}
			contentContainerStyle={{ padding: DEFAULT_SPACING }}
			keyExtractor={({ id }) => id.toString()}
			ItemSeparatorComponent={() => <Separator />}
		/>
	);
};

type ExerciseContainerProps = { hasMiddleSpacing?: boolean };

const ExerciseContainer = styled.View<ExerciseContainerProps>`
	${({ hasMiddleSpacing }) => css`
		flex: 1;
		max-width: ${(dimensions.window.withMargin.width - DEFAULT_SPACING) /
		NUM_COLUMNS}px;
		margin-right: ${hasMiddleSpacing ? 0 : DEFAULT_SPACING}px;
	`}
`;

const Separator = styled.View`
	height: ${DEFAULT_SPACING}px;
`;
