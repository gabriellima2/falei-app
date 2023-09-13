import { HorizontalList } from "@/components/commons";
import { BreathingExercise } from "./BreathingExercise";

import type { BreathingExerciseEntity } from "@/entities";

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
			renderItem={({ item }) => (
				<BreathingExercise {...item} testID="list__item" />
			)}
		/>
	);
};
