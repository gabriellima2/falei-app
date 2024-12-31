import { ScrollView, View, type ViewProps } from "react-native"

function Exercise(props: ViewProps) {
	return (
		<View
			className="w-[164px] h-[227px] rounded-xl bg-layout-foreground"
			{...props}
		/>
	)
}

function ExerciseList() {
	return (
		<>
			<Exercise className="mr-4" />
			<Exercise className="mr-4" />
			<Exercise className="mr-4" />
			<Exercise className="mr-4" />
			<Exercise className="mr-4" />
			<Exercise />
		</>
	)
}

function ExerciseVerticalList() {
	return (
		<>
			<Exercise className="mb-4 w-full h-[140px]" />
			<Exercise className="mb-4 w-full h-[140px]" />
			<Exercise className="mb-4 w-full h-[140px]" />
			<Exercise className="mb-4 w-full h-[140px]" />
			<Exercise className="mb-4 w-full h-[140px]" />
			<Exercise className="mb-4 w-full h-[140px]" />
			<Exercise className="w-full h-[140px]" />
		</>
	)
}

function Title(props: ViewProps) {
	const { className, ...rest } = props
	return <View className="bg-layout-foreground w-[240px] h-[22px] rounded"{...rest} />
}

function Subtitle(props: ViewProps) {
	const { className, ...rest } = props
	return <View className="bg-layout-foreground w-[220px] h-[19px] rounded"{...rest} />
}

function Paragraph(props: ViewProps) {
	const { className, ...rest } = props
	return <View className="bg-layout-foreground w-[200px] h-[16px] mt-2 rounded"{...rest} />
}

function Small(props: ViewProps) {
	const { className, ...rest } = props
	return <View className="bg-layout-foreground w-[140px] h-[13px] rounded"{...rest} />
}

function ReadPoem() {
	return (
		<View>
			<Title className="bg-layout-divider" />
			<Small className="mt-1 bg-layout-divider" />
			<View className="mt-4">
				<Paragraph className="bg-layout-divider" />
				<Paragraph className="w-[210px] bg-layout-divider" />
				<Paragraph className="w-[200px] bg-layout-divider" />
				<Paragraph className="w-[140px] bg-layout-divider" />
			</View>
			<View className="mt-4">
				<Paragraph className="w-[210px] bg-layout-divider" />
				<Paragraph className="w-[200px] bg-layout-divider" />
				<Paragraph className="w-[140px] bg-layout-divider" />
			</View>
			<View className="mt-4">
				<Paragraph />
				<Paragraph className="w-[210px] bg-layout-divider" />
				<Paragraph className="w-[200px] bg-layout-divider" />
				<Paragraph className="w-[140px] bg-layout-divider" />
			</View>
		</View>
	)
}

function ReadTongueTwister() {
	return (
		<View>
			<View>
				<Paragraph className="bg-layout-divider" />
				<Paragraph className="w-[250px] bg-layout-divider" />
				<Paragraph className="w-[230px] bg-layout-divider" />
			</View>
			<Small className="mt-4 bg-layout-divider" />
		</View>
	)
}

export const Skeleton = {
	Exercise,
	ExerciseList,
	ExerciseVerticalList,
	Title,
	Subtitle,
	Paragraph,
	Small,
	ReadPoem,
	ReadTongueTwister,
}
