import { Stack } from "expo-router";
import { SendEmail } from "@/ui/templates";

export default function Page() {
	return (
		<>
			<Stack.Screen options={{ animation: "fade_from_bottom" }} />
			<SendEmail />
		</>
	);
}
