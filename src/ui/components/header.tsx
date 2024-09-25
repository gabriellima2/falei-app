import { View, type ViewProps } from 'react-native'

import { Typography } from '../atoms/typography'
import { cn } from '@/helpers/cn'

type RootProps = ViewProps
type TitleProps = Parameters<typeof Typography.Title>[0]

function Root(props: RootProps) {
	const { className, ...rest } = props
	return (
		<View
			className={cn(
				'mb-8 flex-row items-center justify-between gap-x-2',
				className,
			)}
			{...rest}
		/>
	)
}

function Title(props: TitleProps) {
	return <Typography.Title {...props} />
}

export const Header = {
	Root,
	Title,
}
