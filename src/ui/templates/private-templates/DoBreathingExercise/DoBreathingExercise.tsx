import { useLocalSearchParams } from "expo-router";
import styled from "styled-components/native";

import { DoBreathingExerciseContainer } from "./components/DoBreathingExerciseContainer";
import { DoBreathingExerciseProvider } from "./contexts/DoBreathingExerciseContext";
import { ContainerWithDefaultSpaces, Header } from "@/ui/atoms";

export function DoBreathingExercise() {
	const { id } = useLocalSearchParams<ViewRouteParams>();
	if (!id) return null;
	return (
		<DoBreathingExerciseProvider exerciseId={id}>
			<Header withBack />
			<Container horizontalSpacing bottomSpacing>
				<DoBreathingExerciseContainer />
			</Container>
		</DoBreathingExerciseProvider>
	);
}

const Container = styled(ContainerWithDefaultSpaces)`
	flex: 1;
	align-items: center;
	justify-content: space-between;
`;
