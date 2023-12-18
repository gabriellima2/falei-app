import { screen } from "@testing-library/react-native";
import * as ReactQuery from "react-query";

import { Home } from "./Home";
import * as useHomeState from "./hooks/use-home-state";

import { breathingResponseMock } from "@/__mocks__/breathing-response-mock";
import { WithQueryClientProvider } from "@/__mocks__/with-query-client-provider";
import { renderWithThemeProvider } from "@/__mocks__/render-with-theme-provider";

import type { TestingLibraryEl } from "@/@types/testing-library-el";

const useHomeStateSpyOn = jest.spyOn(useHomeState, "useHomeState");
jest.spyOn(ReactQuery, "useQuery").mockImplementation(
	jest.fn().mockReturnValue({
		isLoading: false,
		error: null,
		data: breathingResponseMock,
	})
);

const defaultReturn: useHomeState.UseHomeStateReturn = {
	title: "any_title",
	weekAppointments: breathingResponseMock.appointments,
	incompleteExercises: [
		...breathingResponseMock.exercises,
		...breathingResponseMock.appointments,
	],
};

const renderComponent = () =>
	renderWithThemeProvider(
		<WithQueryClientProvider>
			<Home data={breathingResponseMock} />
		</WithQueryClientProvider>
	);

describe("<Home />", () => {
	const getExerciseList = () => screen.queryAllByTestId("list__item");

	function expectExerciseToHaveBeenPresent(el: TestingLibraryEl) {
		expect(el).toBeTruthy();
	}

	describe("Render", () => {
		it("should render correctly with all exercises", () => {
			useHomeStateSpyOn.mockReturnValue(defaultReturn);
			renderComponent();

			const appointmentEls = screen.getAllByText(
				defaultReturn.weekAppointments[0].title
			);
			const reminder = appointmentEls[0];
			const progress = appointmentEls[1];

			expectExerciseToHaveBeenPresent(reminder);
			expectExerciseToHaveBeenPresent(progress);
			expect(screen.getByText(defaultReturn.title)).toBeTruthy();
			expect(getExerciseList()).toHaveLength(
				breathingResponseMock.exercises.length
			);
		});
	});
});
