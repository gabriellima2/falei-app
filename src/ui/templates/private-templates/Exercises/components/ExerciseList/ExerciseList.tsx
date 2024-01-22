import { FlatList } from "react-native";
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
const DEFAULT_ITEM_WIDTH = 165;
const NUM_COLUMNS = Math.floor(
	(dimensions.window.withMargin.width - DEFAULT_SPACING) / DEFAULT_ITEM_WIDTH
);

export const ExerciseList = (props: ExerciseListProps) => {
	const { exercises, category } = props;
	const ExerciseItem = exerciseItem[category];
	const title = categoriesPortuguese[category];
	return (
		<FlatList
			numColumns={NUM_COLUMNS}
			data={exercises}
			ListHeaderComponent={() => <Header title={title} />}
			renderItem={({ item, index }) => (
				<ExerciseContainer hasSpacing={index % 2 === 0} testID="exercise">
					<ExerciseItem {...(item as ExerciseEntity)} />
				</ExerciseContainer>
			)}
			contentContainerStyle={{ padding: DEFAULT_SPACING }}
			keyExtractor={({ id }) => id.toString()}
			ItemSeparatorComponent={() => <Separator />}
		/>
	);
};

const width =
	(dimensions.window.withMargin.width - DEFAULT_SPACING) / NUM_COLUMNS;

type ExerciseContainerProps = { hasSpacing?: boolean };

const ExerciseContainer = styled.View<ExerciseContainerProps>`
	${({ hasSpacing }) => css`
		width: ${width}px;
		margin-right: ${hasSpacing ? DEFAULT_SPACING : 0}px;
	`}
`;

const Separator = styled.View`
	height: ${DEFAULT_SPACING}px;
`;
