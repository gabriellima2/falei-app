import { screen } from "@testing-library/react-native";
import * as ReactQuery from "react-query";

import { Home } from "./Home";

import { mock } from "./hooks/use-home.test";
import * as useHome from "./hooks/use-home";

import { WithQueryClientProvider } from "@/__mocks__/with-query-client-provider";
import { renderWithThemeProvider } from "@/__mocks__/render-with-theme-provider";
import type { TestingLibraryEl } from "@/@types/testing-library-el";

const useHomeSpyOn = jest.spyOn(useHome, "useHome");
jest
	.spyOn(ReactQuery, "useQuery")
	.mockImplementation(
		jest.fn().mockReturnValue({ isLoading: false, error: null, data: mock })
	);

const defaultReturn: useHome.UseHomeReturn = {
	title: "any_title",
	filteredAppointments: mock.appointments,
	incomplete: mock,
};

const renderComponent = () =>
	renderWithThemeProvider(
		<WithQueryClientProvider>
			<Home data={mock} />
		</WithQueryClientProvider>
	);

describe("<Home />", () => {
	const getExerciseList = () => screen.queryAllByTestId("list__item");

	describe("Render", () => {
		function expectMessageToBePresent(message: string) {
			expect(screen.getByText(message)).toBeTruthy();
		}
		function expectExerciseToBePresent(el: TestingLibraryEl) {
			expect(el).toBeTruthy();
		}
		function expectExerciseListToBePresent() {
			expect(getExerciseList()).toHaveLength(mock.exercises.length);
		}

		it("should render correctly with all exercises", () => {
			useHomeSpyOn.mockReturnValue(defaultReturn);
			renderComponent();

			const appointmentEls = screen.getAllByText(
				defaultReturn.filteredAppointments[0].title
			);
			const reminder = appointmentEls[0];
			const progress = appointmentEls[1];

			expectMessageToBePresent(defaultReturn.title);
			expectExerciseToBePresent(reminder);
			expectExerciseToBePresent(progress);
			expectExerciseListToBePresent();
		});
	});
});
