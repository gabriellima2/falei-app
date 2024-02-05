import { fireEvent, screen } from "@testing-library/react-native";

import { TimePicker, type TimePickerProps } from "./TimePicker";
import * as UseTimePicker from "./hooks/use-time-picker";

import { renderWithThemeProvider } from "@/__mocks__/render-with-theme-provider";

const useTimePickerSpy = jest.spyOn(UseTimePicker, "useTimePicker");
const useTimePickerDefaultReturn: ReturnType<
	(typeof UseTimePicker)["useTimePicker"]
> = {
	isShowPicker: false,
	showPicker: jest.fn(),
	handleTimeChange: jest.fn(),
};
const defaultProps: TimePickerProps = {
	value: new Date(),
	onChange: jest.fn(),
};

const renderComponent = (props = defaultProps) =>
	renderWithThemeProvider(<TimePicker {...props} />);

describe("<TimePicker />", () => {
	const getDefineReminderTimeButton = () =>
		screen.getByLabelText("Definir horário do lembrete");

	describe("Render", () => {
		it("should render correctly without date-time-picker component", () => {
			renderComponent();

			const { value } = defaultProps;
			const time = value.toLocaleTimeString().replace(/(.*)\D\d+/, "$1");

			expect(screen.getByText(time)).toBeTruthy();
			expect(getDefineReminderTimeButton()).toBeTruthy();
			expect(screen.queryByTestId("date-time-picker")).toBeFalsy();
		});
		it("should render correctly with date-time-picker component", () => {
			useTimePickerSpy.mockReturnValue({
				...useTimePickerDefaultReturn,
				isShowPicker: true,
			});
			renderComponent();

			const { value } = defaultProps;
			const time = value.toLocaleTimeString().replace(/(.*)\D\d+/, "$1");

			expect(screen.getByText(time)).toBeTruthy();
			expect(getDefineReminderTimeButton()).toBeTruthy();
			expect(screen.queryByTestId("date-time-picker")).toBeTruthy();
		});
	});
	describe("Interactions", () => {
		describe("Press", () => {
			it("should call the show-picker function when define-reminder-button is pressed", () => {
				renderComponent();

				const button = getDefineReminderTimeButton();
				fireEvent.press(button);

				expect(useTimePickerDefaultReturn.showPicker).toHaveBeenCalled();
			});
		});
	});
});
