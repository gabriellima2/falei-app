import { Book } from "lucide-react-native";
import styled from "styled-components/native";

import { BaseExerciseButton } from "../BaseExercise";

import { useViewReadExerciseContext } from "@/contexts/ViewReadExerciseContext";

import type { ReadExerciseEntity } from "@/entities/read-entities";
import type { ReadExerciseCategory } from "@/@types/exercise-type-categories";

export const START_READ_EXERCISE_PATHNAME = "/read";

export type ReadExerciseProps = Pick<ReadExerciseEntity, "content" | "id"> & {
	category: ReadExerciseCategory;
};

export const ReadExercise = (props: ReadExerciseProps) => {
	const { id, category, content } = props;
	const { handleExpand } = useViewReadExerciseContext();
	return (
		<Exercise
			title={content}
			id={id}
			icon={(props) => <Book {...props} />}
			onPress={() => handleExpand(id, category)}
			accessibilityHint="Abrirá uma tela para a leitura completa"
		/>
	);
};

const Exercise = styled(BaseExerciseButton)`
	height: 243px;
`;
