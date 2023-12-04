import { fireEvent, screen } from "@testing-library/react-native";

import { Onboarding } from "./Onboarding";

import { renderWithThemeProvider } from "@/__mocks__/render-with-theme-provider";
import { defaultItems } from "./constants/default-items";

const renderComponent = () => renderWithThemeProvider(<Onboarding />);

describe("<Onboarding", () => {
	const ITEMS_AMOUNT = defaultItems.length - 1;

	const getContinueButtonEl = () => screen.getByLabelText("Continuar");
	const getBackButtonEl = () => screen.getByLabelText("Voltar");
	const getNextButtonEl = () => screen.getByLabelText("Próximo");
	const getCarousel = () => screen.getByTestId("carousel");

	describe("Render", () => {
		it("should render correctly", () => {
			renderComponent();

			expect(getCarousel()).toBeTruthy();
			expect(screen.getAllByRole("button")[ITEMS_AMOUNT]).toBeTruthy();
			expect(getBackButtonEl()).toBeTruthy();
			expect(getNextButtonEl()).toBeTruthy();
		});
	});
	describe("Interactions", () => {
		describe("Press", () => {
			describe("Next", () => {
				it("should move to next item when next-button is clicked", () => {
					renderComponent();

					const button = getNextButtonEl();
					fireEvent.press(button);

					expect(getCarousel().props.accessibilityValue.now).toBe(1);
				});
				it("should move to last item when next-button is clicked repeatedly", () => {
					renderComponent();

					const button = getNextButtonEl();
					[...new Array(ITEMS_AMOUNT)].forEach(() => fireEvent.press(button));

					expect(getCarousel().props.accessibilityValue.now).toBe(ITEMS_AMOUNT);
					expect(getContinueButtonEl()).toBeTruthy();
				});
			});
			describe("Back", () => {
				it("should not go back when showing first item and back-button is disabled", () => {
					renderComponent();

					const button = getBackButtonEl();
					expect(button.props.accessibilityState.disabled).toBeTruthy();
					fireEvent.press(button);

					expect(
						getBackButtonEl().props.accessibilityState.disabled
					).toBeTruthy();
				});
				it("should move to previous item when back-button is clicked", () => {
					renderComponent();

					fireEvent.press(getNextButtonEl());
					const button = getBackButtonEl();
					expect(button.props.accessibilityState.disabled).toBeFalsy();
					fireEvent.press(button);

					expect(
						getBackButtonEl().props.accessibilityState.disabled
					).toBeTruthy();
				});
			});
		});
	});
});
