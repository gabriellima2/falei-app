import { act, fireEvent, screen } from "@testing-library/react-native";

import {
	ToastProvider,
	type ToastConfig,
	type ToastTypes,
} from "@/contexts/ToastContext";
import { theme } from "@/styles/theme";

import { advanceTimer } from "@/__mocks__/advance-timer";
import { ShowToastButton } from "./_mocks_/mock-components";
import { FakeIconComponent } from "@/__mocks__/fake-icon-component";
import { renderWithThemeProvider } from "@/__mocks__/render-with-theme-provider";

import { capitalizeFirstLetter } from "@/helpers/capitalize-first-letter";

const FAKE_ICON = "any_icon";
const TOAST_MESSAGE = "any_message";
const DEFAULT_PROPS: ToastConfig = { message: TOAST_MESSAGE };

const renderComponent = (props: ToastConfig = DEFAULT_PROPS) =>
	renderWithThemeProvider(
		<ToastProvider>
			<ShowToastButton {...props} />
		</ToastProvider>
	);

const showToast = () => {
	act(() => {
		fireEvent.press(screen.getByText("Show"));
	});
};

const getIndicatorColorByType = (type: ToastTypes) => {
	return type === "default" ? "transparent" : theme.colors.feedbacks[type];
};

describe("<Toast />", () => {
	beforeEach(() => {
		jest.useFakeTimers();
	});
	afterEach(() => {
		jest.clearAllTimers();
	});

	type ExpectToastToBePresentParams = { indicatorColor: string };

	function expectToastToBePresent(params: ExpectToastToBePresentParams) {
		const { indicatorColor } = params;
		const indicatorStyle = screen.getByTestId("toast-indicator").props.style[0];
		expect(indicatorStyle.backgroundColor).toBe(indicatorColor);
		expect(screen.getByText(TOAST_MESSAGE)).toBeTruthy();
	}

	function expectToastIsNotPresent() {
		expect(screen.queryByText(TOAST_MESSAGE)).toBeFalsy();
	}

	describe("Render", () => {
		const CUSTOM_TIME = 3000;
		const DEFAULT_TIME = 2000;
		const TOAST_TYPES: ToastTypes[] = [
			"default",
			"alert",
			"warning",
			"success",
		];

		test.each(TOAST_TYPES)(
			"should render correctly with %s type and default options",
			(type) => {
				const indicatorColor = getIndicatorColorByType(type);
				renderComponent({ ...DEFAULT_PROPS, options: { type } });

				showToast();

				expectToastToBePresent({ indicatorColor });
				if (type !== "default") {
					const typeFormmated = capitalizeFirstLetter(type);
					expect(screen.getByLabelText(`${typeFormmated} Icon`)).toBeTruthy();
				}
				advanceTimer(DEFAULT_TIME);
				expectToastIsNotPresent();
			}
		);
		test.each(TOAST_TYPES)(
			"should render correctly with %s type and custom options",
			(type) => {
				const indicatorColor = getIndicatorColorByType(type);
				renderComponent({
					...DEFAULT_PROPS,
					options: {
						type,
						Icon: () => <FakeIconComponent icon={FAKE_ICON} />,
						time: CUSTOM_TIME,
					},
				});

				showToast();

				expectToastToBePresent({ indicatorColor });
				expect(screen.getByText(FAKE_ICON)).toBeTruthy();
				advanceTimer(CUSTOM_TIME);
				expectToastIsNotPresent();
			}
		);
	});
});
