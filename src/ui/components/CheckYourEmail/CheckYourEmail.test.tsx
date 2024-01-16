import { Text } from "react-native";
import { screen } from "@testing-library/react-native";

import { CheckYourEmail, type CheckYourEmailProps } from "./CheckYourEmail";
import { renderWithThemeProvider } from "@/__mocks__/render-with-theme-provider";

const defaultProps: CheckYourEmailProps = {
	renderActions: () => <Text>any_action</Text>,
};

const renderComponent = (props = defaultProps) =>
	renderWithThemeProvider(<CheckYourEmail {...props} />);

describe("<CheckYourEmail", () => {
	const description = "any_description";

	describe("Render", () => {
		it("should render correctly when all props is passed", () => {
			renderComponent({ ...defaultProps, description });

			expect(
				screen.getByLabelText("Imagem de um e-mail sendo enviado")
			).toBeTruthy();
			expect(screen.getByText("Verifique o seu e-mail")).toBeTruthy();
			expect(screen.getByText("any_action")).toBeTruthy();
			expect(screen.getByText(description)).toBeTruthy();
		});
		it("should render correctly when 'description' props is not passed", () => {
			renderComponent();

			expect(
				screen.getByLabelText("Imagem de um e-mail sendo enviado")
			).toBeTruthy();
			expect(screen.getByText("Verifique o seu e-mail")).toBeTruthy();
			expect(screen.getByText("any_action")).toBeTruthy();
			expect(screen.queryByText(description)).toBeFalsy();
		});
	});
});
