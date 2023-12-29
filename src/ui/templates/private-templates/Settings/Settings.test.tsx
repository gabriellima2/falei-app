import { fireEvent, screen } from "@testing-library/react-native";

import { Settings } from "./Settings";
import * as SettingsState from "./hooks/use-settings-state";

import { renderWithThemeProvider } from "@/__mocks__/render-with-theme-provider";

jest.mock("@/lib/firebase-auth", () => ({
	firebaseAuth: {
		signOut: jest.fn(),
	},
}));

const useSettingsStateSpy = jest.spyOn(SettingsState, "useSettingsState");

const renderComponent = () => renderWithThemeProvider(<Settings />);

describe("<Settings />", () => {
	const getLogoutButtonEl = () => screen.getByLabelText("Sair");

	describe("Render", () => {
		it("should render correctly", () => {
			renderComponent();

			expect(getLogoutButtonEl()).toBeTruthy();
			expect(screen.getByText("Configurações")).toBeTruthy();
			expect(screen.getByText("© Gabriel Lima")).toBeTruthy();
		});
	});
	describe("Interactions", () => {
		describe("Press", () => {
			describe("HandleLogout", () => {
				it("should call 'handleLogout' function when pressed on LogoutButton", () => {
					const mockHandleLogout = jest.fn();
					useSettingsStateSpy.mockReturnValue({
						handleLogout: mockHandleLogout,
					});
					renderComponent();

					const button = getLogoutButtonEl();
					fireEvent.press(button);

					expect(mockHandleLogout).toHaveBeenCalled();
				});
			});
		});
	});
});
