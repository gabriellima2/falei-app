import { Typography } from '@/ui/atoms/typography'

type DefaultProps = Omit<Parameters<typeof Typography.Paragraph>[0], 'children'> & {
	message: string | undefined
}

export function Default(props: DefaultProps) {
	const { message, ...rest } = props
	return (
		<Typography.Paragraph className="text-base-danger mt-2" {...rest}>
			{message}
		</Typography.Paragraph>
	)
}
