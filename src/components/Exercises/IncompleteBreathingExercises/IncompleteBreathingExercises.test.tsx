import { screen } from "@testing-library/react-native";

import {
	IncompleteBreathingExercises,
	type IncompleteBreathingExercisesProps,
} from "./IncompleteBreathingExercises";

import { renderWithThemeProvider } from "@/__mocks__/render-with-theme-provider";
import type { BreathingExerciseEntity } from "@/entities";

const defaultProps: IncompleteBreathingExercisesProps = {
	exercises: [
		{
			id: "any_id",
			title: "any_title",
			rounds: { rounds_total: 3, rounds_completed: 0 },
		} as BreathingExerciseEntity,
	],
	href: { pathname: "/any_pathname" },
};

const renderComponent = (props = defaultProps) =>
	renderWithThemeProvider(<IncompleteBreathingExercises {...props} />);

const getMessage = () =>
	screen.queryByLabelText(/Não há exercícios em progresso/);
const getAllExercises = () => screen.queryAllByLabelText(/Continuar exercício/);

describe("<IncompleteBreathingExercises", () => {
	describe("Render", () => {
		it("should render exercise list", () => {
			renderComponent();

			expect(getAllExercises()).toHaveLength(defaultProps.exercises.length);
			expect(getMessage()).toBeFalsy();
		});
		it("should render message when exercises is empty", () => {
			renderComponent({ ...defaultProps, exercises: [] });

			expect(getAllExercises()).toHaveLength(0);
			expect(getMessage()).toBeTruthy();
		});
	});
});
