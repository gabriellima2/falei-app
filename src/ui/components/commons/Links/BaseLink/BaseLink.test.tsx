import { Text } from "react-native";
import { fireEvent, screen } from "@testing-library/react-native";
import { mockPush } from "jest-setup";

import { BaseLink, type BaseLinkProps } from "./BaseLink";
import { renderWithThemeProvider } from "@/__mocks__/render-with-theme-provider";

type Href<TParams extends object = object> = Pick<
	BaseLinkProps<TParams>,
	"href"
>["href"];

const TEXT = "any_text";
const PATHNAME = "any_pathname";

const renderComponent = <TParams extends {}>(props: BaseLinkProps<TParams>) =>
	renderWithThemeProvider(
		<BaseLink {...props}>
			<Text>{TEXT}</Text>
		</BaseLink>
	);

const getLinkEl = () => screen.getByText(TEXT);

describe("<BaseLink />", () => {
	describe("Render", () => {
		it("should render correctly", () => {
			renderComponent({ href: { pathname: PATHNAME } });

			expect(getLinkEl()).toBeTruthy();
		});
	});
	describe("Interactions", () => {
		describe("Press", () => {
			it("should call the navigate function with pathname info when clicked", () => {
				const href: Href = { pathname: PATHNAME };
				renderComponent({ href });

				const link = getLinkEl();
				fireEvent.press(link);

				expect(mockPush).toHaveBeenCalledWith(href);
			});
			it("should call the navigate function with pathname and params info when clicked", () => {
				type Id = { id: string };
				const href: Href<Id> = { pathname: PATHNAME, params: { id: "any_id" } };
				renderComponent<Id>({ href });

				const link = getLinkEl();
				fireEvent.press(link);

				expect(mockPush).toHaveBeenCalledWith(href);
			});
		});
	});
});
