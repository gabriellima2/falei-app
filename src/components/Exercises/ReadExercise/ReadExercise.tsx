import { Book } from "lucide-react-native";

import { BaseExercise } from "../BaseExercise";
import type { ReadExerciseEntity } from "@/entities/read-entities";

type ReadExerciseProps = Pick<ReadExerciseEntity, "content" | "id">;

export const ReadExercise = (props: ReadExerciseProps) => {
	const { id, content } = props;
	return (
		<BaseExercise
			title={content}
			id={id}
			icon={(props) => <Book {...props} />}
			href={{ pathname: "/read", params: { id } }}
			accessibilityHint="Abrirá uma tela para a leitura completa"
		/>
	);
};
