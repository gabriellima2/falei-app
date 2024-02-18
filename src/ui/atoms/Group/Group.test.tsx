import { Text } from "react-native";
import { screen } from "@testing-library/react-native";

import { Group, type GroupProps } from "./Group";
import { renderWithThemeProvider } from "@/test-utils/render-with-theme-provider";

const TITLE = "any_title";
const CONTENT_TEXT = "any_content";
const RIGHT_LINK_TEXT = "any_text";

const ContentComponent = () => <Text>{CONTENT_TEXT}</Text>;
const defaultProps: GroupProps = { title: TITLE, children: ContentComponent() };

const renderComponent = (props: GroupProps = defaultProps) =>
	renderWithThemeProvider(<Group {...props} />);

const getRightLink = () => screen.queryByText(RIGHT_LINK_TEXT);

describe("<Group />", () => {
	describe("Render", () => {
		function expectMainElsToBePresent() {
			expect(screen.getByText(TITLE)).toBeTruthy();
			expect(screen.getByText(CONTENT_TEXT)).toBeTruthy();
		}

		it("should render correctly with all props passed", () => {
			renderComponent({
				...defaultProps,
				rightLink: { text: RIGHT_LINK_TEXT, pathname: "any_path" },
			});

			expectMainElsToBePresent();
			expect(getRightLink()).toBeTruthy();
		});
		it("should render correctly with just the required props", () => {
			renderComponent();

			expectMainElsToBePresent();
			expect(getRightLink()).toBeFalsy();
		});
	});
});
