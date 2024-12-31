import { View, type ViewProps } from 'react-native'

import { Typography } from '../atoms/typography'
import { cn } from '@/helpers/cn'

type RootProps = ViewProps & {
	spacing?: boolean
}
type TitleProps = Parameters<typeof Typography.Title>[0]

function Root(props: RootProps) {
	const { spacing, ...rest } = props
	return (
		<View
			className={cn('mb-8 flex-row items-center justify-between', {
				'px-4': spacing,
			})}
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
