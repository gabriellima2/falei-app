import { screen } from "@testing-library/react-native";

import { OnboardingItem, type OnboardingItemProps } from "./OnboardingItem";
import { renderWithThemeProvider } from "@/__mocks__/render-with-theme-provider";

const ONBOARDING_ITEM_TITLE = "any_title";
const ONBOARDING_ITEM_DESCRIPTION = "any_description";
const ONBOARDING_ITEM_IMG: OnboardingItemProps["img"] = {
	alt: "any_alt",
	src: "any_src",
};

const renderComponent = () =>
	renderWithThemeProvider(
		<OnboardingItem
			img={ONBOARDING_ITEM_IMG}
			title={ONBOARDING_ITEM_TITLE}
			description={ONBOARDING_ITEM_DESCRIPTION}
		/>
	);

describe("<Onboarding />", () => {
	describe("Render", () => {
		it("should render correctly", () => {
			renderComponent();

			expect(screen.getByLabelText(ONBOARDING_ITEM_IMG.alt)).toBeTruthy();
			expect(screen.getByText(ONBOARDING_ITEM_TITLE)).toBeTruthy();
			expect(screen.getByText(ONBOARDING_ITEM_DESCRIPTION)).toBeTruthy();
		});
	});
});
