import { screen } from "@testing-library/react-native";

import { BaseExercise, type BaseExerciseProps } from "./BaseExercise";
import { Typography } from "@/components/commons";

import { renderWithThemeProvider } from "@/__mocks__/render-with-theme-provider";
import { FakeIconComponent } from "@/__mocks__/fake-icon-component";

const ICON_TEXT = "any_icon";
const CHILDREN_CONTENT = "any_content";

const defaultProps: BaseExerciseProps<{}> = {
	id: "any_id",
	title: "any_title",
	href: { pathname: "any" },
	icon: () => <FakeIconComponent icon={ICON_TEXT} />,
};
const renderComponent = (props: BaseExerciseProps<{}> = defaultProps) =>
	renderWithThemeProvider(<BaseExercise {...props} />);

const getChildrenContent = () => screen.queryByText(CHILDREN_CONTENT);

describe("<BaseExercise />", () => {
	describe("Render", () => {
		function expectTheRequiredPropsToBePresent() {
			expect(screen.getByText(ICON_TEXT)).toBeTruthy();
			expect(screen.getByText(defaultProps.title)).toBeTruthy();
		}

		it("should render correctly without children props", () => {
			renderComponent();

			expectTheRequiredPropsToBePresent();
			expect(getChildrenContent()).toBeFalsy();
		});
		it("should render correctly with children props", () => {
			renderComponent({
				...defaultProps,
				children: <Typography.Title>{CHILDREN_CONTENT}</Typography.Title>,
			});

			expectTheRequiredPropsToBePresent();
			expect(getChildrenContent()).toBeTruthy();
		});
	});
});
