import { Typography } from '../atoms/typography'

type ParagraphsProps = {
	paragraphs: string[]
}

export function Paragraphs(props: ParagraphsProps) {
	const { paragraphs } = props
	return (
		<>
			{paragraphs.map((sentence, index) => (
				<Typography.Paragraph key={index} className="text-base">
					{sentence.trim()}
				</Typography.Paragraph>
			))}
		</>
	)
}
