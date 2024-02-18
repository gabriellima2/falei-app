import { screen } from "@testing-library/react-native";

export function hasTextElement(text: string) {
	return screen.queryByText(text);
}
