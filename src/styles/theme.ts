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
			white: "#F6F7F7",
			darkGray: "#1D1D1D",
		},
		feedbacks: {
			alert: "#E16161",
			warning: "#f78e00",
			success: "#16af00",
		},
	},
	fontFamily: {
		main: {
			bold: "Roboto_700Bold",
			medium: "Roboto_500Medium",
			regular: "Roboto_400Regular",
		},
	},
	fontSizes: {
		display: "24px",
		lg: "20px",
		medium: "18px",
		regular: "16px",
		sm: "14px",
		xs: "12px",
	},
	spaces: {
		1: "8px",
		2: "12px",
		3: "16px",
		4: "20px",
		5: "32px",
		6: "64px",
	},
	rounded: {
		sm: "2px",
		regular: "16px",
		md: "28px",
	},
};
