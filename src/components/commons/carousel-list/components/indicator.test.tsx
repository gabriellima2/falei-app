import { fireEvent, screen } from "@testing-library/react-native";

import { Indicator, type IndicatorProps } from "./indicator";
import { renderWithThemeProvider } from "@/__mocks__/render-with-theme-provider";

const DATA_AMOUNT = 3;
const CURRENT_POSITION = 1;
const HANDLE_PRESS = jest.fn();

type Props = Omit<
	IndicatorProps,
	"dataAmount" | "currentPosition" | "handlePress"
>;

const renderComponent = (props: Props) =>
	renderWithThemeProvider(
		<Indicator
			{...props}
			currentPosition={CURRENT_POSITION}
			dataAmount={DATA_AMOUNT}
			handlePress={HANDLE_PRESS}
		/>
	);

describe("<Indicator />", () => {
	describe("Render", () => {
		it("should render correctly if isActive true", () => {
			renderComponent({ isActive: true });

			const indicatorProps = screen.getByRole("button").props;

			expect(indicatorProps.accessibilityHint).toBeUndefined();
			expect(indicatorProps.accessibilityState.selected).toBeTruthy();
			expect(indicatorProps.accessibilityState.disabled).toBeTruthy();
			expect(indicatorProps.accessibilityLabel).toBe(
				`${CURRENT_POSITION} de ${DATA_AMOUNT}`
			);
		});
		it("should render correctly if isActive is false", () => {
			renderComponent({ isActive: false });

			const indicatorProps = screen.getByRole("button").props;

			expect(indicatorProps.accessibilityHint).toBe(
				`Mudar para o item ${CURRENT_POSITION}`
			);
			expect(indicatorProps.accessibilityState.selected).toBeFalsy();
			expect(indicatorProps.accessibilityState.disabled).toBeFalsy();
			expect(indicatorProps.accessibilityLabel).toBe(
				`${CURRENT_POSITION} de ${DATA_AMOUNT}`
			);
		});
	});
	describe("Interactions", () => {
		describe("Press", () => {
			it("should not call handlePress if isActive is true and when pressed", () => {
				renderComponent({ isActive: true });

				const indicator = screen.getByRole("button");
				fireEvent.press(indicator);

				expect(HANDLE_PRESS).not.toBeCalled();
			});
			it("should call handlePress if isActive is false and when pressed", () => {
				renderComponent({ isActive: false });

				const indicator = screen.getByRole("button");
				fireEvent.press(indicator);

				expect(HANDLE_PRESS).toBeCalledWith(CURRENT_POSITION);
			});
		});
	});
});
