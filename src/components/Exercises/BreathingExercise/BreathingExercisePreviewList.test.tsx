import { screen } from "@testing-library/react-native";

import {
	BreathingExercisePreviewList,
	type BreathingExercisePreviewListProps,
} from "./BreathingExercisePreviewList";

import { renderWithThemeProvider } from "@/__mocks__/render-with-theme-provider";
import type { BreathingExerciseEntity } from "@/entities";

const renderComponent = (props: BreathingExercisePreviewListProps) =>
	renderWithThemeProvider(<BreathingExercisePreviewList {...props} />);

describe("<BreathingExercisePreviewList />", () => {
	describe("Render", () => {
		it("should render correctly with filled list", () => {
			const FILLED_LIST: BreathingExerciseEntity[] = [
				{ id: "0", title: "any_title" } as BreathingExerciseEntity,
				{ id: "1", title: "any_another_title" } as BreathingExerciseEntity,
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