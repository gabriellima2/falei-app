import { Stack } from "expo-router";
import { EmailSentToChangePassword } from "@/ui/templates";

export default function Page() {
	return (
		<>
			<Stack.Screen options={{ animation: "slide_from_right" }} />
			<EmailSentToChangePassword />
		</>
	);
}
