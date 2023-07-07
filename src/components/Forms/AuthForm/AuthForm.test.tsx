import { screen } from "@testing-library/react-native";

import { AuthForm, type AuthFormProps } from "./AuthForm";
import { renderWithThemeProvider } from "@/__mocks__/render-with-theme-provider";

const FORM_EMAIL_LABEL = "Email";
const FORM_PASSWORD_LABEL = "Senha";
const FORM_EMAIL_PLACEHOLDER = "Ex: seuemail@gmail.com";
const FORM_PASSWORD_PLACEHOLDER = "8+ Caracteres";

const defaultProps: AuthFormProps = {
	title: "any_title",
	button: { text: "any_button_text" },
};

const renderComponent = () =>
	renderWithThemeProvider(<AuthForm {...defaultProps} />);

describe("<AuthForm />", () => {
	describe("Render", () => {
		it("should render correctly", () => {
			renderComponent();
			const { title, button } = defaultProps;

			expect(screen.getByText(title));
			expect(screen.getByText(button.text));
			expect(screen.getByText(FORM_EMAIL_LABEL));
			expect(screen.getByText(FORM_PASSWORD_LABEL));
			expect(screen.getByPlaceholderText(FORM_EMAIL_PLACEHOLDER));
			expect(screen.getByPlaceholderText(FORM_PASSWORD_PLACEHOLDER));
		});
	});
});
