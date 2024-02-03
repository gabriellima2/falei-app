import { Stack } from "expo-router";
import { CreateExercise } from "@/ui/templates/private-templates";

export default function Page() {
	return (
		<>
			<Stack.Screen />
			<CreateExercise />
		</>
	);
}
