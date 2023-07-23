import { fireEvent, screen } from "@testing-library/react-native";

import {
	CarouselIndicator,
	type CarouselIndicatorProps,
} from "./CarouselIndicator";
import { renderWithThemeProvider } from "@/__mocks__/render-with-theme-provider";

const DATA_AMOUNT = 3;
const CURRENT_POSITION = 0;
const HANDLE_PRESS = jest.fn();

type Props = Omit<
	CarouselIndicatorProps,
	"dataAmount" | "currentPosition" | "handlePress"
>;

const renderComponent = (props: Props) =>
	renderWithThemeProvider(
		<CarouselIndicator
			{...props}
			currentPosition={CURRENT_POSITION}
			dataAmount={DATA_AMOUNT}
			handlePress={HANDLE_PRESS}
		/>
	);

const getIndicatorEl = () => screen.getByRole("button");

describe("<Indicator />", () => {
	describe("Render", () => {
		const FORMATTED_CURRENT_POSITION = CURRENT_POSITION + 1;

		it("should render correctly if isActive true", () => {
			renderComponent({ isActive: true });

			const indicatorElProps = getIndicatorEl().props;

			expect(indicatorElProps.accessibilityHint).toBeUndefined();
			expect(indicatorElProps.accessibilityState.selected).toBeTruthy();
			expect(indicatorElProps.accessibilityState.disabled).toBeTruthy();
			expect(indicatorElProps.accessibilityLabel).toBe(
				`${FORMATTED_CURRENT_POSITION} de ${DATA_AMOUNT}`
			);
		});
		it("should render correctly if isActive is false", () => {
			renderComponent({ isActive: false });

			const indicatorElProps = getIndicatorEl().props;

			expect(indicatorElProps.accessibilityHint).toBe(
				`Mudar para o item ${FORMATTED_CURRENT_POSITION}`
			);
			expect(indicatorElProps.accessibilityState.selected).toBeFalsy();
			expect(indicatorElProps.accessibilityState.disabled).toBeFalsy();
			expect(indicatorElProps.accessibilityLabel).toBe(
				`${FORMATTED_CURRENT_POSITION} de ${DATA_AMOUNT}`
			);
		});
	});
	describe("Interactions", () => {
		describe("Press", () => {
			function pressIndicator() {
				const indicatorEl = getIndicatorEl();
				fireEvent.press(indicatorEl);
			}

			it("should not call handlePress if isActive is true and when pressed", () => {
				renderComponent({ isActive: true });

				pressIndicator();

				expect(HANDLE_PRESS).not.toBeCalled();
			});
			it("should call handlePress if isActive is false and when pressed", () => {
				renderComponent({ isActive: false });

				pressIndicator();

				expect(HANDLE_PRESS).toBeCalledWith(CURRENT_POSITION);
			});
		});
	});
});
