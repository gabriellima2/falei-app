import { screen } from "@testing-library/react-native";

import {
	BreathingExercisesPreview,
	type BreathingExercisesPreviewProps,
} from "./BreathingExercisesPreview";

import { renderWithThemeProvider } from "@/test-utils/render-with-theme-provider";
import type { BreathingExerciseEntity } from "@/entities/breathing-entities";

const renderComponent = (props: BreathingExercisesPreviewProps) =>
	renderWithThemeProvider(<BreathingExercisesPreview {...props} />);

describe("<BreathingExercisesPreview />", () => {
	describe("Render", () => {
		it("should render correctly with filled list", () => {
			const FILLED_LIST: BreathingExerciseEntity[] = [
				{
					id: "0",
					title: "any_title",
					rounds: { total: 10 },
					steps: { inhale: 5, hold: 3, exhale: 5 },
				} as BreathingExerciseEntity,
				{
					id: "1",
					title: "any_another_title",
					rounds: { total: 10 },
					steps: { inhale: 5, hold: 3, exhale: 5 },
				} as BreathingExerciseEntity,
			];
			renderComponent({ items: FILLED_LIST });

			const renderedItems = screen.getAllByTestId("list__item");

			expect(renderedItems).toHaveLength(FILLED_LIST.length);
		});
		it("should render correctly with empty list", () => {
			const EMPTY_ITEMS: BreathingExerciseEntity[] = [];
			renderComponent({ items: EMPTY_ITEMS });

			expect(screen.queryByTestId("list__item")).toBeFalsy();
		});
	});
});
