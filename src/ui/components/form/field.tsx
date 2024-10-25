import { View, type ViewProps } from 'react-native'

import { Inputs } from './inputs'
import { Labels } from './labels'

function Root(props: ViewProps) {
	return <View {...props} />
}

export const Field = {
	Root,
	Labels,
	Inputs
}
