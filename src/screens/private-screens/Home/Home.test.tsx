import { screen } from "@testing-library/react-native";
import * as ReactQuery from "react-query";

import { Home } from "./Home";

import { WithQueryClientProvider } from "@/__mocks__/with-query-client-provider";
import { renderWithThemeProvider } from "@/__mocks__/render-with-theme-provider";
import { mock } from "./hooks/use-home.test";
import * as useHome from "./hooks/use-home";

import type { BreathingExerciseAppointmentEntity } from "@/entities";
import type { TestingLibraryEl } from "@/@types/testing-library-el";

const useHomeSpyOn = jest.spyOn(useHome, "useHome");
jest
	.spyOn(ReactQuery, "useQuery")
	.mockImplementation(
		jest.fn().mockReturnValue({ isLoading: false, error: null, data: mock })
	);

const defaultReturn: useHome.UseHomeReturn = {
	title: "any_title",
	appointment: mock.appointments[0],
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

		it("should render correctly with all exercises filled", () => {
			useHomeSpyOn.mockReturnValue(defaultReturn);
			renderComponent();

			const appointmentEls = screen.getAllByText(
				defaultReturn.appointment.title
			);
			const reminder = appointmentEls[0];
			const progress = appointmentEls[1];

			expectMessageToBePresent(defaultReturn.title);
			expectExerciseToBePresent(reminder);
			expectExerciseToBePresent(progress);
			expectExerciseListToBePresent();
		});
		it("should render correctly with empty messages", () => {
			const emptyAppointmetsMessage = "Não há lembretes para essa semana";
			const emptyProgressMessage = "Nenhum exercício em progresso";
			useHomeSpyOn.mockReturnValue({
				...defaultReturn,
				appointment: undefined as unknown as BreathingExerciseAppointmentEntity,
				incomplete: { appointments: undefined, exercises: undefined },
			});
			renderComponent();

			expectMessageToBePresent(defaultReturn.title);
			expectMessageToBePresent(emptyAppointmetsMessage);
			expectMessageToBePresent(emptyProgressMessage);
			expectExerciseListToBePresent();
		});
	});
});
