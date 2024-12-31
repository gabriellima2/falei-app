import { Typography } from '@/ui/atoms/typography'

export function Default(props: Parameters<typeof Typography.Label>[0]) {
	return <Typography.Label {...props} className='mb-2' />
}
