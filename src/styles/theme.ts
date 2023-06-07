export type Theme = typeof theme;

export const theme = {
	colors: {
		main: "#111212",
		brand: "#DD9EF3",
		overlay: "#333333",
		font: {
			primary: "#F6F7F7",
			secondary: "#A2A6A6",
		},
		utils: {
			blue: "#93C4FF",
			purple: "#C64BFF",
		},
		feedbacks: {
			alert: "#E16161",
		},
	},
	fontsFamily: {
		main: {
			bold: "Roboto_700Bold",
			medium: "Roboto_500Medium",
			regular: "Roboto_400Regular",
		},
	},
	fontSizes: {
		display: "24px",
		lg: "20px",
		regular: "16px",
		sm: "14px",
		xs: "12px",
	},
	spaces: {
		1: "8px",
		2: "12px",
		3: "16px",
		4: "32px",
		5: "64px",
	},
	rounded: {
		sm: "2px",
		regular: "16px",
		md: "32px",
	},
};
