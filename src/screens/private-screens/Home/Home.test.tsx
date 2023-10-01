import { screen } from "@testing-library/react-native";
import * as ReactQuery from "react-query";

import { Home } from "./Home";
import { renderWithThemeProvider } from "@/__mocks__/render-with-theme-provider";
import { DAYS_OF_THE_WEEK } from "@/constants/days-of-the-week";

const querySpyOn = jest.spyOn(ReactQuery, "useQuery");

const date = new Date();
const time = {
	day: date.getDay(),
	hours: date.getHours().toString().padStart(2, "0"),
	minutes: date.getMinutes().toString().padStart(2, "0"),
};
const currentHour = `${time.hours}:${time.minutes}`;

const mockData = {
	schedules: [
		{
			id: "1",
			title: "any_title_schedule_1",
			scheduled_at: { days: [DAYS_OF_THE_WEEK[time.day]], hour: currentHour },
			rounds: {},
		},
		{
			id: "2",
			title: "any_title_schedule_2",
			scheduled_at: { days: [DAYS_OF_THE_WEEK[2]], hour: "18:00" },
			rounds: {},
		},
		{
			id: "3",
			title: "any_title_schedule_3",
			scheduled_at: { days: [DAYS_OF_THE_WEEK[5]], hour: "14:00" },
			rounds: {},
		},
	],
	exercises: [
		{
			id: "1",
			title: "any_title_exercise",
			rounds: {
				rounds_completed: 1,
				rounds_total: 3,
				duration_per_round_in_min: 10,
			},
		},
	],
};

const renderComponent = () => renderWithThemeProvider(<Home />);
const getLoading = () => screen.queryByLabelText("Carregando...");
const getDefaultError = () => screen.queryByText("any_error");
const getExerciseList = () => screen.queryAllByTestId("list__item");

describe("<Home />", () => {
	function mockResponse(params: {
		data: unknown;
		error: Error | null;
		isLoading: boolean;
	}) {
		querySpyOn.mockImplementation(jest.fn().mockReturnValue(params));
	}

	describe("Render", () => {
		it("should render loading", () => {
			mockResponse({ data: null, error: null, isLoading: true });
			renderComponent();

			expect(getLoading()).toBeTruthy();
			expect(getDefaultError()).toBeFalsy();
			expect(getExerciseList()).toMatchObject([]);
		});
		describe("Success", () => {
			function expectExerciseInProgressToBePresent() {
				const progressEl = screen.getByTestId("current-progress");
				const exercise = mockData.exercises[0];

				expect(screen.getAllByText(exercise.title)[0]).toBeTruthy();
				expect(progressEl.props.width).toBe("33%");
			}
			function expectAppointmentToBePresent(
				appointment: (typeof mockData.schedules)[0]
			) {
				expect(screen.getByText(appointment.title)).toBeTruthy();
			}
			function expectExerciseListToBePresent() {
				expect(getExerciseList()).toHaveLength(mockData.exercises.length);
			}

			it("should render correctly", () => {
				querySpyOn.mockImplementation(
					jest.fn().mockReturnValue({
						data: mockData,
						error: null,
						isLoading: false,
					})
				);
				renderComponent();

				expect(getLoading()).toBeFalsy();
				expect(getDefaultError()).toBeFalsy();
				expectAppointmentToBePresent(mockData.schedules[0]);
				expectExerciseInProgressToBePresent();
				expectExerciseListToBePresent();
			});
		});
		describe("Errors", () => {
			function expectErrorToBePresent(error: string) {
				expect(getLoading()).toBeFalsy();
				expect(getExerciseList()).toMatchObject([]);
				expect(screen.getByText(error)).toBeTruthy();
			}
			it("should render response error", () => {
				mockResponse({
					data: null,
					error: new Error("any_error"),
					isLoading: false,
				});
				renderComponent();

				expectErrorToBePresent("any_error");
			});
			it("should render unexpected/unknown response error", () => {
				mockResponse({ data: null, error: null, isLoading: false });
				renderComponent();

				expectErrorToBePresent("Erro inesperado");
			});
		});
	});
});
