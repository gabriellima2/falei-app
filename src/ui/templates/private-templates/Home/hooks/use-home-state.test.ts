import { renderHook } from "@testing-library/react-hooks";

import { useHomeState } from "./use-home-state";

import * as useFindIncompleteBreathingExercises from "@/hooks/use-find-incomplete-breathing-exercises";
import * as useWeekAppointments from "@/hooks/use-week-appointments";

import { breathingResponseMock } from "@/test-utils/breathing-response-mock";

jest.mock("@/hooks/use-week-appointments", () => ({
	__esModule: true,
	...jest.requireActual("@/hooks/use-week-appointments"),
}));

jest.mock("@/hooks/use-find-incomplete-breathing-exercises", () => ({
	__esModule: true,
	...jest.requireActual("@/hooks/use-find-incomplete-breathing-exercises"),
}));

const useWeekAppointmentsSpyOn = jest.spyOn(
	useWeekAppointments,
	"useWeekAppointments"
);
const useFindIncompleteBreathingExercisesSpyOn = jest.spyOn(
	useFindIncompleteBreathingExercises,
	"useFindIncompleteBreathingExercises"
);

const executeHook = () => renderHook(() => useHomeState(breathingResponseMock));

describe("UseHome", () => {
	describe("Return Values", () => {
		it("should return the initial values correctly", () => {
			useWeekAppointmentsSpyOn.mockReturnValue([]);
			useFindIncompleteBreathingExercisesSpyOn.mockReturnValueOnce([]);

			const { result } = executeHook();
			const {
				current: { title, weekAppointments, incompleteExercises },
			} = result;

			expect(typeof title).toBe("string");
			expect(typeof weekAppointments).toBe("object");
			expect(typeof incompleteExercises).toBe("object");
		});
		it("should return correctly with values", () => {
			useWeekAppointmentsSpyOn.mockReturnValue(
				breathingResponseMock.appointments
			);
			useFindIncompleteBreathingExercisesSpyOn.mockReturnValueOnce(
				breathingResponseMock.exercises
			);

			const { result } = executeHook();

			expect(result.current.title).toBeTruthy();
			expect(result.current.incompleteExercises).toMatchObject(
				breathingResponseMock.exercises
			);
			expect(result.current.weekAppointments).toMatchObject(
				breathingResponseMock.appointments
			);
		});
		it("should return correctly when hooks return empty values", () => {
			useWeekAppointmentsSpyOn.mockReturnValue([]);
			useFindIncompleteBreathingExercisesSpyOn.mockReturnValueOnce([]);

			const { result } = executeHook();

			expect(result.current.title).toBe(
				"Torne um exercício parte de sua rotina"
			);
			expect(result.current.weekAppointments).toMatchObject([]);
			expect(result.current.incompleteExercises).toMatchObject([]);
		});
	});
});
