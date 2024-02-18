import { act, fireEvent, screen } from "@testing-library/react-native";

import {
	ToastProvider,
	type ToastConfig,
	type ToastTypes,
} from "@/contexts/ToastContext";

import { renderWithThemeProvider } from "@/test-utils/render-with-theme-provider";
import { FakeIconComponent } from "@/test-utils/fake-icon-component";
import { ShowToastButton } from "./_mocks_/mock-components";
import { runTimers } from "@/test-utils/run-timers";

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

describe("<Toast />", () => {
	beforeAll(() => {
		jest.useFakeTimers();
	});

	type ExpectDefaultIconToBePresentParams = { type: ToastTypes };

	function expectToastToBePresent() {
		expect(screen.getByText(TOAST_MESSAGE)).toBeTruthy();
	}

	function expectToastIsNotPresent() {
		expect(screen.queryByText(TOAST_MESSAGE)).toBeFalsy();
	}

	function expectDefaultIconToBePresent(
		params: ExpectDefaultIconToBePresentParams
	) {
		const { type } = params;
		if (type !== "default") {
			const typeFormmated = capitalizeFirstLetter(type);
			expect(screen.getByLabelText(`${typeFormmated} Icon`)).toBeTruthy();
		}
	}

	describe("Render", () => {
		const CUSTOM_TIME = 1500;
		const TOAST_TYPES: ToastTypes[] = [
			"default",
			"alert",
			"warning",
			"success",
		];

		test.each(TOAST_TYPES)(
			"should render correctly with %s type and default options",
			(type) => {
				renderComponent({ ...DEFAULT_PROPS, options: { type } });

				showToast();

				expectToastToBePresent();
				expectDefaultIconToBePresent({ type });
				runTimers();
				expectToastIsNotPresent();
			}
		);
		test.each(TOAST_TYPES)(
			"should render correctly with %s type and custom options",
			(type) => {
				renderComponent({
					...DEFAULT_PROPS,
					options: {
						type,
						Icon: () => <FakeIconComponent icon={FAKE_ICON} />,
						time: CUSTOM_TIME,
					},
				});

				showToast();

				expectToastToBePresent();
				expect(screen.getByText(FAKE_ICON)).toBeTruthy();
				runTimers();
				expectToastIsNotPresent();
			}
		);
	});
	describe("Interactions", () => {
		describe("Press", () => {
			describe("Close Button", () => {
				it("should close the toast when close button is clicked", () => {
					renderComponent();

					showToast();
					const closeButton = screen.getByHintText("Fecha a mensagem");

					expectToastToBePresent();
					act(() => {
						fireEvent.press(closeButton);
					});
					expectToastIsNotPresent();
				});
			});
		});
	});
});
