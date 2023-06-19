import { fireEvent, screen } from "@testing-library/react-native";
import { BaseLink, type BaseLinkProps } from "./BaseLink";
import { mockNavigate } from "jest-setup";
import { renderWithThemeProvider } from "@/__mocks__/render-with-theme-provider";

const TEXT = "any_text";
const TO_PATHNAME = "any_pathname";

const renderComponent = (props: BaseLinkProps<{ any_pathname: "" }>) =>
	renderWithThemeProvider(<BaseLink {...props}>{TEXT}</BaseLink>);

describe("<BaseLink />", () => {
	describe("Render", () => {
		renderComponent({ to: { name: TO_PATHNAME } });

		expect(screen.getByText(TEXT)).toBeTruthy();
	});
	describe("Interactions", () => {
		describe("Press", () => {
			it("should call the navigate function when clicked", () => {
				renderComponent({ to: { name: TO_PATHNAME } });

				const link = screen.getByText(TEXT);
				fireEvent.press(link);

				expect(mockNavigate).toHaveBeenCalledWith(TO_PATHNAME);
			});
		});
	});
});
