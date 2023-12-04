import { screen } from "@testing-library/react-native";

import {
	BreathingExercisePreviewList,
	type BreathingExercisePreviewListProps,
} from "./BreathingExercisePreviewList";

import { renderWithThemeProvider } from "@/__mocks__/render-with-theme-provider";
import type { BreathingExerciseEntity } from "@/entities/breathing-entities";

const renderComponent = (props: BreathingExercisePreviewListProps) =>
	renderWithThemeProvider(<BreathingExercisePreviewList {...props} />);

describe("<BreathingExercisePreviewList />", () => {
	describe("Render", () => {
		it("should render correctly with filled list", () => {
			const FILLED_LIST: BreathingExerciseEntity[] = [
				{
					id: "0",
					title: "any_title",
					rounds: { duration_per_round_in_min: 10, rounds_total: 10 },
				} as BreathingExerciseEntity,
				{
					id: "1",
					title: "any_another_title",
					rounds: { duration_per_round_in_min: 10, rounds_total: 10 },
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
