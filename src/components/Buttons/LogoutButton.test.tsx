import { fireEvent, screen } from "@testing-library/react-native";

import { LogoutButton } from "./LogoutButton";
import { renderWithThemeProvider } from "@/__mocks__/render-with-theme-provider";

const onLogoutMock = jest.fn();
const renderComponent = () =>
	renderWithThemeProvider(<LogoutButton onLogout={onLogoutMock} />);

const getButtonEl = () => screen.getByText("Sair");

describe("<LogoutButton />", () => {
	describe("Render", () => {
		it("should render correctly", () => {
			renderComponent();

			expect(getButtonEl()).toBeTruthy();
			expect(screen.getByLabelText("Sair")).toBeTruthy();
		});
	});
	describe("Interactions", () => {
		describe("Press", () => {
			it("should call the callback function when pressed", () => {
				renderComponent();

				const button = getButtonEl();
				fireEvent.press(button);

				expect(onLogoutMock).toHaveBeenCalled();
				expect(onLogoutMock).toHaveBeenCalledTimes(1);
			});
		});
	});
});
