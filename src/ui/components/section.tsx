import type { PropsWithChildren } from 'react'
import { View } from 'react-native'

import { Typography } from '../atoms/typography'
import { cn } from '@/helpers/cn'

type SectionProps = PropsWithChildren & {
	title: string
	className?: string
}

export function Section(props: SectionProps) {
	const { title, className, children } = props
	return (
		<View className={cn('mb-8', className)}>
			<Typography.Subtitle className="mb-5">{title}</Typography.Subtitle>
			{children}
		</View>
	)
}
