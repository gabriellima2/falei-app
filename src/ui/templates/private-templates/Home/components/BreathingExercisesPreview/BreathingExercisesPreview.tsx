import styled from "styled-components/native";

import { BreathingExercise } from "@/ui/components";
import { HorizontalList } from "@/ui/atoms";

import type { BreathingExerciseEntity } from "@/entities/breathing-entities";

export type BreathingExercisesPreviewProps = {
	items: BreathingExerciseEntity[];
};

export const BreathingExercisesPreview = (
	props: BreathingExercisesPreviewProps
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
