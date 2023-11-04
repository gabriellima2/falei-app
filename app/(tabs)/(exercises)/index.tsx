import { View } from "react-native";
import { FilterByExercise, Header } from "@/components";

export default function Page() {
	return (
		<View>
			<Header title="Exercícios" />
			<FilterByExercise
				onChange={(v) => console.log(v)}
				exercises={[
					{ name: "Respiração", value: "breathing" },
					{ name: "Trava-línguas", value: "read" },
					{ name: "Poemas", value: "poems" },
				]}
			/>
		</View>
	);
}
