import { View, type ViewProps } from 'react-native'

import { Inputs } from './inputs'
import { Labels } from './labels'
import { Errors } from './errors'

function Root(props: ViewProps) {
	return <View {...props} />
}

export const Field = {
	Root,
	Labels,
	Inputs,
	Errors,
}
