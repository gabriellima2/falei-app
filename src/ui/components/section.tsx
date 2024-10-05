import type { PropsWithChildren } from 'react'
import { View } from 'react-native'

import { Typography } from '../atoms/typography'

type SectionProps = PropsWithChildren & {
	title: string
	className?: string
}

export function Section(props: SectionProps) {
	const { title, children, ...rest } = props
	return (
		<View className="mb-8" {...rest}>
			<Typography.Subtitle className="mb-5">{title}</Typography.Subtitle>
			{children}
		</View>
	)
}
