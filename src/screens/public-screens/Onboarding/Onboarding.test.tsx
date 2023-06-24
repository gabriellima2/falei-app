import { fireEvent, screen } from "@testing-library/react-native";

import { Onboarding } from "./Onboarding";

import { renderWithThemeProvider } from "@/__mocks__/render-with-theme-provider";
import { onboardingItems } from "./assets";

const CAROUSEL_TESTID = "carousel";
const NEXT_TEXT = "Próximo";
const CONTINUE_TEXT = "Continuar";
const NEXT_BUTTON_HINT = "Move para o próximo item";
const CONTINUE_BUTTON_HINT = "Redireciona para a tela de autenticação";
const BACK_BUTTON_HINT = "Move para o item anterior";

const itemsAmount = onboardingItems.length - 1;

const renderComponent = () => renderWithThemeProvider(<Onboarding />);
const press = (element: JSX.Element) => fireEvent.press(element);

describe("<Onboarding", () => {
	const getBackButtonEl = () => screen.getByHintText(BACK_BUTTON_HINT);
	const getNextButtonEl = () => screen.getByHintText(NEXT_BUTTON_HINT);
	const getContinueButtonEl = () => screen.getByHintText(CONTINUE_BUTTON_HINT);
	const getCarouselProps = () => screen.getByTestId(CAROUSEL_TESTID).props;

	describe("Render", () => {
		it("should render correctly", () => {
			renderComponent();

			expect(screen.getByTestId(CAROUSEL_TESTID)).toBeTruthy();
			expect(screen.getAllByRole("button")[itemsAmount]).toBeTruthy();
			expect(screen.getByText(NEXT_TEXT)).toBeTruthy();
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
					press(button);

					expect(getCarouselProps().accessibilityValue.now).toBe(1);
				});
				it("should move to last item when next-button is clicked repeatedly", () => {
					renderComponent();

					const button = getNextButtonEl();
					[...new Array(itemsAmount)].forEach(() => press(button));

					expect(getCarouselProps().accessibilityValue.now).toBe(itemsAmount);
					expect(screen.getByText(CONTINUE_TEXT)).toBeTruthy();
					expect(getContinueButtonEl()).toBeTruthy();
				});
			});
			describe("Back", () => {
				it("should not go back when showing first item and back-button is disabled", () => {
					renderComponent();

					const button = getBackButtonEl();
					expect(button.props.accessibilityState.disabled).toBeTruthy();
					press(button);

					expect(
						getBackButtonEl().props.accessibilityState.disabled
					).toBeTruthy();
				});
				it("should move to previous item when back-button is clicked", () => {
					renderComponent();

					press(getNextButtonEl());
					const button = getBackButtonEl();
					expect(button.props.accessibilityState.disabled).toBeFalsy();
					press(button);

					expect(
						getBackButtonEl().props.accessibilityState.disabled
					).toBeTruthy();
				});
			});
		});
	});
});
