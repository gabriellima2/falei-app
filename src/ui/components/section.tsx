import type { PropsWithChildren } from 'react'
import { View } from 'react-native'

import { Typography } from '../atoms/typography'
import { cn } from '@/helpers/cn'

type SectionProps = PropsWithChildren & {
	title: string
	className?: string
	renderHeaderRight?: () => JSX.Element
}

export function Section(props: SectionProps) {
	const { title, renderHeaderRight, children, ...rest } = props
	const hasRenderHeaderRight = !!renderHeaderRight
	return (
		<View className="mb-8" {...rest}>
			<View
				className={cn('mb-5', {
					'justify-between flex-row items-center pr-4': !!renderHeaderRight,
				})}
			>
				<Typography.Subtitle className={cn({ 'mr-4': hasRenderHeaderRight })}>
					{title}
				</Typography.Subtitle>
				{renderHeaderRight?.()}
			</View>
			{children}
		</View>
	)
}
