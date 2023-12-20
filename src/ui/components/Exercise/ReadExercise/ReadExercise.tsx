import { Book } from "lucide-react-native";
import styled from "styled-components/native";

import { BaseExercise } from "../BaseExercise";
import type { ReadExerciseEntity } from "@/entities/read-entities";

export const START_READ_EXERCISE_PATHNAME = "/read";

export type ReadExerciseProps = Pick<ReadExerciseEntity, "content" | "id">;

export const ReadExercise = (props: ReadExerciseProps) => {
	const { id, content } = props;
	return (
		<Exercise
			title={content}
			id={id}
			icon={(props) => <Book {...props} />}
			href={{ pathname: START_READ_EXERCISE_PATHNAME, params: { id } }}
			accessibilityHint="Abrirá uma tela para a leitura completa"
		/>
	);
};

const Exercise = styled(BaseExercise)`
	height: 243px;
`;
