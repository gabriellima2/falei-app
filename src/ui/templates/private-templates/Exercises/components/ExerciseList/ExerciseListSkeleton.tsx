import { View } from "react-native";

import { Separator } from "./ExerciseList";
import { Skeletons } from "@/ui/atoms";

import { getTotalColumns } from "./helpers/get-total-columns";
import { getItemWidth } from "./helpers/get-item-width";

export const ExerciseListSkeleton = () => (
	<Skeletons.Group testID="loading">
		<Skeletons.List
			ItemSeparatorComponent={() => <Separator />}
			amount={8}
			numColumns={getTotalColumns()}
			renderItem={() => (
				<View style={{ marginRight: 16 }}>
					<Skeletons.Card width={getItemWidth()} />
				</View>
			)}
		/>
	</Skeletons.Group>
);
