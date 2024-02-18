import { Text } from "react-native";
import * as ReactQuery from "react-query";
import { screen } from "@testing-library/react-native";

import { WithQuery } from "./WithQuery";

import { renderWithThemeProvider } from "@/test-utils/render-with-theme-provider";
import { WithQueryClientProvider } from "@/test-utils/with-query-client-provider";

type Data = { name: string };

const querySpyOn = jest.spyOn(ReactQuery, "useQuery");
const mockData: Data = { name: "any_name" };

const renderComponent = () => {
	const Component = WithQuery<{}, Data>(
		(props) => <Text>{props.data.name}</Text>,
		{
			name: "any_name",
			fn: jest.fn(),
		}
	);
	renderWithThemeProvider(
		<WithQueryClientProvider>
			<Component />
		</WithQueryClientProvider>
	);
};

const getLoading = () => screen.queryByLabelText("Carregando...");
const getDefaultError = () => screen.queryByText("any_error");
const getContent = () => screen.queryByText(mockData.name);

describe("<WithQuery />", () => {
	function mockResponse(params: {
		data: unknown;
		error: Error | null;
		isLoading: boolean;
	}) {
		querySpyOn.mockImplementation(jest.fn().mockReturnValue(params));
	}

	describe("Render", () => {
		it("should render loading", () => {
			mockResponse({ data: null, error: null, isLoading: true });
			renderComponent();

			expect(getLoading()).toBeTruthy();
			expect(getDefaultError()).toBeFalsy();
			expect(getContent()).toBeFalsy();
		});
		describe("Success", () => {
			it("should render correctly with inject data", () => {
				mockResponse({ data: mockData, error: null, isLoading: false });
				renderComponent();

				expect(getLoading()).toBeFalsy();
				expect(getDefaultError()).toBeFalsy();
				expect(getContent()).toBeTruthy();
			});
		});
		describe("Errors", () => {
			function expectErrorToBePresent(error: string) {
				expect(getLoading()).toBeFalsy();
				expect(getContent()).toBeFalsy();
				expect(screen.getByText(error)).toBeTruthy();
			}

			it("should render response error", () => {
				mockResponse({
					data: null,
					error: new Error("any_error"),
					isLoading: false,
				});
				renderComponent();

				expectErrorToBePresent("any_error");
			});
			it("should render unexpected/unknown response error", () => {
				mockResponse({ data: null, error: null, isLoading: false });
				renderComponent();

				expectErrorToBePresent("Erro inesperado");
			});
		});
	});
});
