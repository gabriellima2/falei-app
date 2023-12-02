import styled from "styled-components/native";

import { HorizontalList } from "@/components/commons";
import { BreathingExercise } from "./BreathingExercise";

import type { BreathingExerciseEntity } from "@/entities/breathing-entities";

export type BreathingExercisePreviewListProps = {
	items: BreathingExerciseEntity[];
};

export const BreathingExercisePreviewList = (
	props: BreathingExercisePreviewListProps
) => {
	const { items } = props;
	return (
		<HorizontalList<BreathingExerciseEntity>
			data={items}
			keyExtractor={(item) => item.id}
			renderItem={({ item }) => <Exercise {...item} testID="list__item" />}
		/>
	);
};

const Exercise = styled(BreathingExercise)`
	width: 191px;
`;
