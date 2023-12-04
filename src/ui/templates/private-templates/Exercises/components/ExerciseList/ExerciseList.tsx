import { FlatList } from "react-native";
import styled, { css } from "styled-components/native";

import { BreathingExercise, ReadExercise } from "@/ui/components";
import { Header } from "./components/Header";

import { categoriesPortuguese } from "@/constants/categories-portuguese";
import { dimensions } from "@/constants/dimensions";

import { ExerciseCategoryEntity } from "@/entities/exercise-category.entity";
import type { BreathingExerciseEntity } from "@/entities/breathing-entities";
import type { ReadExerciseEntity } from "@/entities/read-entities";
import type { ExerciseEntity } from "@/entities/exercise.entity";

type ExerciseListProps = {
	exercises: ExerciseEntity[];
	category: ExerciseCategoryEntity;
};

const exerciseItem = {
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

const NUM_COLUMNS = 2;
const DEFAULT_SPACING = 16;

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
				<ExerciseContainer hasSpacing={index % 2 === 0}>
					<ExerciseItem {...item} />
				</ExerciseContainer>
			)}
			contentContainerStyle={{ padding: DEFAULT_SPACING }}
			keyExtractor={({ id }) => id.toString()}
			ItemSeparatorComponent={() => <Separator />}
		/>
	);
};

const width =
	(dimensions.screen.withMargin.width - DEFAULT_SPACING) / NUM_COLUMNS;

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
