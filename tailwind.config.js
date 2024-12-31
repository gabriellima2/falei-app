/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/app/**/*.{ts,tsx}', './src/ui/**/*.{ts,tsx}'],
	theme: {
		extend: {
			fontFamily: {
				heading: 'Roboto_500Medium',
				body: 'Roboto_400Regular',
			},
			colors: {
				common: {
					white: '#F6F7F7',
				},
				layout: {
					background: '#111212',
					foreground: '#1C1C1C',
					divider: '#F6F7F712',
					overlay: '#11121299',
				},
				entity: {
					goal: '#DD9EF3',
					'goal-background': '#231E25',
					'breathing-exercise': '#73CEF2',
					'breathing-exercise-background': '#141F24',
					poem: '#73F299',
					'poem-background': '#1A221C',
					'tongue-twister': '#73F299',
					'tongue-twister-background': '#1A221C',
				},
				base: {
					text: '#F6F7F7',
					'text-muted': '#B3B3B3',
					'text-foreground': '#111212',
					primary: '#DD9EF3',
					'primary-foreground': '#DD9EF312',
					success: '#73F299',
					'success-foreground': '#73F29912',
					info: '#73CEF2',
					'info-foreground': '#73CEF212',
					warning: '#F7B750',
					'warning-foreground': '#F7B75012',
					danger: '#e16161',
					'danger-foreground': '#e1616112',
				},
			},
		},
	},
	plugins: [],
}
