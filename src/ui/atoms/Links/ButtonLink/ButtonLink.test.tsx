import { fireEvent, screen } from "@testing-library/react-native";
import { mockPush } from "jest-setup";

import { ButtonLink } from "./ButtonLink";
import { renderWithThemeProvider } from "@/test-utils/render-with-theme-provider";

type Href = Pick<Parameters<typeof ButtonLink>[0], "href">["href"];

const TEXT = "any_text";
const PATHNAME = "any_pathname";

const renderComponent = (props: Parameters<typeof ButtonLink>[0]) =>
	renderWithThemeProvider(<ButtonLink {...props}>{TEXT}</ButtonLink>);

const getLinkEl = () => screen.getByText(TEXT);

describe("<ButtonLink />", () => {
	const href: Href = { pathname: PATHNAME, params: { id: "any_id" } };

	describe("Render", () => {
		it("should render correctly", () => {
			renderComponent({ href: { pathname: PATHNAME } });

			expect(getLinkEl()).toBeTruthy();
		});
	});
	describe("Interactions", () => {
		describe("Press", () => {
			afterEach(() => {
				jest.resetAllMocks();
			});

			const cases = [{ pathname: href.pathname }, href];
			test.each(cases)(
				"should call the push function with correctly params when pressed",
				(href) => {
					renderComponent({ href });

					const link = getLinkEl();
					fireEvent.press(link);

					expect(mockPush).toHaveBeenCalledWith(href);
				}
			);
		});
	});
});
