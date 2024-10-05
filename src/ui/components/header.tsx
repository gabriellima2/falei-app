import { View, type ViewProps } from 'react-native'
import { Typography } from '../atoms/typography'

type RootProps = ViewProps
type TitleProps = Parameters<typeof Typography.Title>[0]

function Root(props: RootProps) {
	return (
		<View
			className="mb-8 flex-row items-center justify-between gap-x-2"
			{...props}
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
