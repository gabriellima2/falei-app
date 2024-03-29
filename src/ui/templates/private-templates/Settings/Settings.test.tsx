import { fireEvent, screen } from "@testing-library/react-native";

import { Settings } from "./Settings";

import * as AuthenticationStore from "@/store/authentication-store/authentication.store";
import { renderWithThemeProvider } from "@/test-utils/render-with-theme-provider";

jest.mock("@/lib/firebase-auth", () => ({
	firebaseAuth: {},
}));

const authenticationStoreSpy = jest.spyOn(
	AuthenticationStore,
	"useAuthenticationStore"
);

const renderComponent = () => renderWithThemeProvider(<Settings />);

describe("<Settings />", () => {
	const mocks = {
		signOut: jest.fn(),
	};

	const getLogoutButtonEl = () => screen.getByLabelText("Sair");

	describe("Render", () => {
		it("should render correctly", () => {
			renderComponent();

			expect(screen.getByText("Configurações")).toBeTruthy();
			expect(screen.getByText("Minha Conta")).toBeTruthy();
			expect(screen.getByText("Notificações")).toBeTruthy();
			expect(screen.getByText("Sobre")).toBeTruthy();
			expect(getLogoutButtonEl()).toBeTruthy();
			expect(screen.getByText("© Gabriel Lima")).toBeTruthy();
		});
	});
	describe("Interactions", () => {
		describe("Press", () => {
			describe("HandleLogout", () => {
				it("should call sign-out function when pressed on logout-button", () => {
					authenticationStoreSpy.mockReturnValue({ ...mocks });
					renderComponent();

					const button = getLogoutButtonEl();
					fireEvent.press(button);

					expect(mocks.signOut).toHaveBeenCalled();
				});
			});
		});
	});
});
