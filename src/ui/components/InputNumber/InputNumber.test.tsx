import { fireEvent, screen } from "@testing-library/react-native";

import { InputNumber, type InputNumberProps } from "./InputNumber";
import { renderWithThemeProvider } from "@/test-utils/render-with-theme-provider";

const defaultProps: InputNumberProps = {
	value: "0",
	onDecrement: jest.fn(),
	onIncrement: jest.fn(),
};

const renderComponent = (props = defaultProps) =>
	renderWithThemeProvider(<InputNumber {...props} />);

describe("<InputNumber />", () => {
	const getDecrementButtonEl = () => screen.getByLabelText("Diminuir");
	const getIncrementButtonEl = () => screen.getByLabelText("Aumentar");

	describe("Render", () => {
		it("should render correctly", () => {
			renderComponent();

			expect(screen.getByText("0")).toBeTruthy();
			expect(screen.getByText("-")).toBeTruthy();
			expect(screen.getByText("+")).toBeTruthy();
			expect(getDecrementButtonEl()).toBeTruthy();
			expect(getIncrementButtonEl()).toBeTruthy();
		});
	});
	describe("Interactions", () => {
		describe("Press", () => {
			it("should call the 'on-decrement' function when decrement button has pressed", () => {
				renderComponent();

				const button = getDecrementButtonEl();
				fireEvent.press(button);

				expect(defaultProps.onDecrement).toHaveBeenCalled();
				expect(defaultProps.onDecrement).toHaveBeenCalledTimes(1);
			});
			it("should call the 'on-increment' function when increment button has pressed", () => {
				renderComponent();

				const button = getIncrementButtonEl();
				fireEvent.press(button);

				expect(defaultProps.onIncrement).toHaveBeenCalled();
				expect(defaultProps.onIncrement).toHaveBeenCalledTimes(1);
			});
		});
	});
});
