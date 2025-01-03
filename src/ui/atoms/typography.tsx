import { Text, type TextProps } from 'react-native'

function Title(props: TextProps) {
	const { className, ...rest } = props
	return <Text className="font-heading text-lg text-base-text" {...rest} />
}

function Subtitle(props: TextProps) {
	const { className, ...rest } = props
	return <Text className="font-heading text-base-text text-base" {...rest} />
}

function Paragraph(props: TextProps) {
	const { className, ...rest } = props
	return <Text className="font-body text-base-text text-sm" {...rest} />
}

function Bold(props: TextProps) {
	const { className, ...rest } = props
	return <Text className="font-heading text-base-text text-sm" {...rest} />
}

function Label(props: TextProps) {
	const { className, ...rest } = props
	return <Text className="font-heading text-base-text text-sm" {...rest} />
}

function Small(props: TextProps) {
	const { className, ...rest } = props
	return <Text className="font-body text-base-text text-xs" {...rest} />
}

export const Typography = {
	Title,
	Subtitle,
	Paragraph,
	Label,
	Small,
	Bold,
}
