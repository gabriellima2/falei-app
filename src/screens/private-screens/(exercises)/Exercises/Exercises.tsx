import { FilterByExercise, Header } from "@/components";

export const Exercises = () => {
	return (
		<>
			<Header title="Exercícios" />
			<FilterByExercise
				onChange={(v) => console.log(v)}
				exercises={[
					{ name: "Respiração", value: "breathing" },
					{ name: "Trava-línguas", value: "read" },
					{ name: "Poemas", value: "poems" },
				]}
			/>
		</>
	);
};
