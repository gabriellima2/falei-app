import { Stack } from "expo-router";
import { SelectExerciseType } from "@/ui/templates/private-templates";

export default function Page() {
	return (
		<>
			<Stack.Screen />
			<SelectExerciseType />
		</>
	);
}
