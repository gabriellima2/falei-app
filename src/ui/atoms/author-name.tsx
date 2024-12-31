import { Typography } from './typography'

type AuthorNameProps = Omit<Parameters<typeof Typography.Paragraph>[0], 'children'> & {
	name: string | null | undefined
}

export function AuthorName(props: AuthorNameProps) {
	const { name, className, ...rest } = props
	return (
		<Typography.Paragraph className="text-base-text-muted" {...rest}>
			Autor: {name || 'Não informado'}
		</Typography.Paragraph>
	)
}
