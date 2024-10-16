import { Typography } from './typography'

type EmptyMessageProps = {
	text?: string
}

export function EmptyMessage(props: EmptyMessageProps) {
	const { text = 'Nenhum resultado encontrado 😔' } = props
	return (
		<Typography.Paragraph>{text}</Typography.Paragraph>
	)
}
