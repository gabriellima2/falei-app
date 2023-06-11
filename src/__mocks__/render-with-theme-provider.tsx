import { render } from "@testing-library/react-native";
import { WithThemeProvider } from "./with-theme-provider";

export const renderWithThemeProvider = (component: JSX.Element) =>
	render(<WithThemeProvider>{component}</WithThemeProvider>);
