import { Stack } from "expo-router";
import { CreatePoemExercise } from "@/ui/templates/private-templates";

export default function Page() {
	return (
		<>
			<Stack.Screen />
			<CreatePoemExercise />
		</>
	);
}
