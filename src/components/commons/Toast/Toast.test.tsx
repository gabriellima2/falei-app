import { TouchableOpacity, Text } from "react-native";
import { act, fireEvent, screen, waitFor } from "@testing-library/react-native";

import { theme } from "@/styles/theme";
import { renderWithThemeProvider } from "@/__mocks__/render-with-theme-provider";
import {
	ToastProvider,
	useToastContext,
	type ToastConfig,
} from "@/contexts/ToastContext";

const FAKE_ICON_TEXT = "any_icon";
const TOAST_MESSAGE = "any_message";

const FakeIcon = () => <Text>{FAKE_ICON_TEXT}</Text>;
const ShowToastButton = (props: ToastConfig) => {
	const { notify } = useToastContext();
	return (
		<TouchableOpacity onPress={() => notify(props.message, props.options)}>
			<Text>Show</Text>
		</TouchableOpacity>
	);
};

const defaultProps: ToastConfig = { message: TOAST_MESSAGE };
const renderComponent = (props: ToastConfig = defaultProps) =>
	renderWithThemeProvider(
		<ToastProvider>
			<ShowToastButton {...props} />
		</ToastProvider>
	);

describe("<Toast />", () => {
	beforeEach(() => {
		jest.useFakeTimers();
	});
	afterEach(() => {
		jest.clearAllTimers();
	});
	const getShowToastButtonEl = () => screen.getByText("Show");
	const getToastIndicatorColor = () =>
		screen.getByTestId("toast-indicator").props.style.backgroundColor;

	describe("Render", () => {
		describe("Default", () => {
			const defaultColor = "transparent";

			it("should render correctly", async () => {
				renderComponent();

				act(() => {
					fireEvent.press(getShowToastButtonEl());
				});

				waitFor(() => {
					expect(getToastIndicatorColor()).toBe(defaultColor);
					expect(screen.getByText(TOAST_MESSAGE)).toBeTruthy();
					jest.runAllTimers();
					expect(screen.queryByText(TOAST_MESSAGE)).toBeFalsy();
				});
			});
			it("should render correctly with icon", async () => {
				renderComponent({
					...defaultProps,
					options: { type: "default", Icon: FakeIcon },
				});

				act(() => {
					fireEvent.press(getShowToastButtonEl());
				});

				waitFor(() => {
					expect(getToastIndicatorColor()).toBe(defaultColor);
					expect(screen.getByText(TOAST_MESSAGE)).toBeTruthy();
					expect(screen.getByText(FAKE_ICON_TEXT)).toBeTruthy();
					jest.runAllTimers();
					expect(screen.queryByText(TOAST_MESSAGE)).toBeFalsy();
				});
			});
		});
		describe("Warning", () => {
			const warningColor = theme.colors.feedbacks.warning;

			it("should render with warning type and default options", async () => {
				renderComponent({ ...defaultProps, options: { type: "warning" } });

				act(() => {
					fireEvent.press(getShowToastButtonEl());
				});

				waitFor(() => {
					expect(getToastIndicatorColor()).toBe(warningColor);
					expect(screen.getByText(TOAST_MESSAGE)).toBeTruthy();
					expect(screen.getByLabelText(/Icone de aviso/)).toBeTruthy();
					jest.runAllTimers();
					expect(screen.queryByText(TOAST_MESSAGE)).toBeFalsy();
				});
			});
			it("should render with warning type and correct icon", async () => {
				renderComponent({
					...defaultProps,
					options: { type: "warning", Icon: FakeIcon },
				});

				act(() => {
					fireEvent.press(getShowToastButtonEl());
				});

				waitFor(() => {
					expect(getToastIndicatorColor()).toBe(warningColor);
					expect(screen.getByText(TOAST_MESSAGE)).toBeTruthy();
					expect(screen.getByText(FAKE_ICON_TEXT)).toBeTruthy();
					jest.runAllTimers();
					expect(screen.queryByText(TOAST_MESSAGE)).toBeFalsy();
				});
			});
		});
		describe("Alert", () => {
			const alertColor = theme.colors.feedbacks.alert;

			it("should render with alert type and default options", async () => {
				renderComponent({ ...defaultProps, options: { type: "alert" } });

				act(() => {
					fireEvent.press(getShowToastButtonEl());
				});

				waitFor(() => {
					expect(getToastIndicatorColor()).toBe(alertColor);
					expect(screen.getByText(TOAST_MESSAGE)).toBeTruthy();
					expect(screen.getByLabelText(/Icone de alerto/)).toBeTruthy();
					jest.runAllTimers();
					expect(screen.queryByText(TOAST_MESSAGE)).toBeFalsy();
				});
			});
			it("should render with alert type and correct icon", async () => {
				renderComponent({
					...defaultProps,
					options: { type: "alert", Icon: FakeIcon },
				});

				act(() => {
					fireEvent.press(getShowToastButtonEl());
				});

				waitFor(() => {
					expect(getToastIndicatorColor()).toBe(alertColor);
					expect(screen.getByText(TOAST_MESSAGE)).toBeTruthy();
					expect(screen.getByText(FAKE_ICON_TEXT)).toBeTruthy();
					jest.runAllTimers();
					expect(screen.queryByText(TOAST_MESSAGE)).toBeFalsy();
				});
			});
		});
		describe("Success", () => {
			const successColor = theme.colors.feedbacks.success;

			it("should render with success type and default options", async () => {
				renderComponent({ ...defaultProps, options: { type: "success" } });

				act(() => {
					fireEvent.press(getShowToastButtonEl());
				});

				waitFor(() => {
					expect(getToastIndicatorColor()).toBe(successColor);
					expect(screen.getByText(TOAST_MESSAGE)).toBeTruthy();
					expect(screen.getByLabelText(/Icone de successo/)).toBeTruthy();
					jest.runAllTimers();
					expect(screen.queryByText(TOAST_MESSAGE)).toBeFalsy();
				});
			});
			it("should render with success type and correct icon", async () => {
				renderComponent({
					...defaultProps,
					options: { type: "success", Icon: FakeIcon },
				});

				act(() => {
					fireEvent.press(getShowToastButtonEl());
				});

				waitFor(() => {
					expect(getToastIndicatorColor()).toBe(successColor);
					expect(screen.getByText(TOAST_MESSAGE)).toBeTruthy();
					expect(screen.getByText(FAKE_ICON_TEXT)).toBeTruthy();
					jest.runAllTimers();
					expect(screen.queryByText(TOAST_MESSAGE)).toBeFalsy();
				});
			});
		});
	});
});
