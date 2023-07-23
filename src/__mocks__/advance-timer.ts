import { act } from "@testing-library/react-native";

export const advanceTimer = (ms: number) => {
	act(() => {
		jest.advanceTimersByTime(ms);
	});
};
