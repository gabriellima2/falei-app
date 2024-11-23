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
		<ScrollView horizontal showsHorizontalScrollIndicator={false}>
			<Exercise className="mr-4" />
			<Exercise className="mr-4" />
			<Exercise className="mr-4" />
			<Exercise className="mr-4" />
			<Exercise className="mr-4" />
			<Exercise />
		</ScrollView>
	)
}


export const Skeleton = {
	Exercise,
	ExerciseList,
}
