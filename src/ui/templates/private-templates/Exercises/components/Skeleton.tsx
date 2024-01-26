import { ContainerWithDefaultSpaces, Skeletons } from "@/ui/atoms";
import { ExerciseListSkeleton } from "./ExerciseList";

export const Skeleton = () => {
	return (
		<ContainerWithDefaultSpaces horizontalSpacing topSpacing>
			<Skeletons.Container>
				<Skeletons.Header titleLines={1} />
				<Skeletons.Container>
					<Skeletons.List
						horizontal
						amount={4}
						renderItem={() => <Skeletons.Card width={96} height={28} />}
					/>
					<ExerciseListSkeleton />
				</Skeletons.Container>
			</Skeletons.Container>
		</ContainerWithDefaultSpaces>
	);
};
