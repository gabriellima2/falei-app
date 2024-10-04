import { Typography } from './typography'
import { cn } from '@/helpers/cn'

type AuthorNameProps = {
	name: string | null | undefined
	className?: string
}

export function AuthorName(props: AuthorNameProps) {
	const { name, className } = props
	return (
		<Typography.Paragraph
			className={cn(className, 'text-base-text-muted')}
		>
			Autor: {name || 'Não informado'}
		</Typography.Paragraph>
	)
}
