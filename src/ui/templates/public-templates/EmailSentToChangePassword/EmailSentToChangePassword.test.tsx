import { Linking } from "react-native";
import { fireEvent, screen } from "@testing-library/react-native";

import { EmailSentToChangePassword } from "./EmailSentToChangePassword";

import { renderWithThemeProvider } from "@/test-utils/render-with-theme-provider";
import { mockPush } from "jest-setup";

const renderComponent = () =>
	renderWithThemeProvider(<EmailSentToChangePassword />);

describe("<EmailSentToChangePassword />", () => {
	const getCheckEmailLaterButton = () =>
		screen.getByLabelText("Adiar verificação de e-mail");
	const getCheckEmailButton = () =>
		screen.getByLabelText("Verificar endereço de e-mail");

	describe("Render", () => {
		it("should render correctly", () => {
			renderComponent();

			expect(screen.getByText("Verifique o seu e-mail")).toBeTruthy();
			expect(getCheckEmailLaterButton()).toBeTruthy();
			expect(getCheckEmailButton()).toBeTruthy();
		});
	});
	describe("Interactions", () => {
		describe("Press", () => {
			it("should call the open-url function when check-email is pressed", () => {
				const openURL = jest.spyOn(Linking, "openURL");
				renderComponent();

				const button = getCheckEmailButton();
				fireEvent.press(button);

				expect(openURL).toHaveBeenCalled();
				expect(openURL).toHaveBeenCalledWith("mailto:");
			});
			it("should call the push function when check-email-later is pressed", () => {
				renderComponent();

				const button = getCheckEmailLaterButton();
				fireEvent.press(button);

				expect(mockPush).toHaveBeenCalled();
			});
		});
	});
});
