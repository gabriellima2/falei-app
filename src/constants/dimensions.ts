import { Dimensions } from 'react-native'

const screen = Dimensions.get('screen')
const window = Dimensions.get('window')

export const margin = {
	vertical: {
		value: 16,
		total: 32,
	},
}

export const dimensions = {
	window: {
		width: window.width,
		height: window.height,
		withMargin: {
			width: window.width - margin.vertical.total,
		},
	},
	screen: {
		width: screen.width,
		height: screen.height,
		withMargin: {
			width: screen.width - margin.vertical.total,
		},
	},
}
