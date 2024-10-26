import { Link, type LinkProps } from 'expo-router'

type DefaultProps<T extends string | object> = Omit<LinkProps<T>, 'href'> & {
	href: string
}

export const Default = <T extends string | object>(props: DefaultProps<T>) => {
	const { href, ...rest } = props
	// biome-ignore lint/suspicious/noExplicitAny:
	return <Link href={{ pathname: href as any }} {...rest} />
}
