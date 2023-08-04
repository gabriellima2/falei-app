import { act } from "@testing-library/react-native";

export function runTimers() {
	act(() => {
		jest.runAllTimers();
	});
}
