import { View, type ViewProps } from 'react-native'
import { Controller, type ControllerProps, type FieldPath, type FieldValues } from 'react-hook-form'

import { Inputs } from './inputs'
import { Labels } from './labels'
import { Errors } from './errors'

type RenderParams = {
	nativeID: string
	// biome-ignore lint/suspicious/noExplicitAny:
	value: any
	// biome-ignore lint/suspicious/noExplicitAny:
	onChangeText: (...event: any[]) => unknown
}

type RootProps<
	TFieldValues extends FieldValues = FieldValues,
	TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = Omit<ControllerProps<TFieldValues, TName>, 'render'> & {
	render: (params: RenderParams) => JSX.Element
}

function Root<
	TFieldValues extends FieldValues = FieldValues,
	TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>(props: RootProps<TFieldValues, TName>) {
	const { render, ...rest } = props
	return (
		<Controller
			{...rest}
			render={({ field }) =>
				render({
					value: field.value,
					onChangeText: field.onChange,
					nativeID: field.name,
				})
			}
		/>
	)
}

function Content(props: ViewProps) {
	return <View {...props} />
}

export const Field = {
	Root,
	Content,
	Labels,
	Inputs,
	Errors,
}
