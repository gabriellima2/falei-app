/* eslint-disable @typescript-eslint/no-non-null-assertion */

import { Skeleton } from "./components/Skeleton";
import { BottomSheet } from "../BottomSheet";
import { Typography } from "../../atoms";

import { useViewReadExerciseContext } from "@/contexts/ViewReadExerciseContext";
import { useGetReadExerciseById } from "./hooks/use-get-read-exercise-by-id";

import * as S from "./styles";

export function ViewReadExerciseBottomSheet() {
	const { ref, exerciseId, readExerciseCategory, handleClose } =
		useViewReadExerciseContext();
	const hasParameters = !!exerciseId && !!readExerciseCategory;
	const { data, isLoading } = useGetReadExerciseById(
		exerciseId!,
		readExerciseCategory!,
		{ enabled: hasParameters }
	);
	return (
		<BottomSheet
			ref={ref}
			index={hasParameters ? 0 : -1}
			onChange={(position) => {
				if (position === -1) return handleClose();
			}}
		>
			{isLoading && <Skeleton />}
			{data && (
				<S.Container>
					<Typography.Paragraph>{data.content}</Typography.Paragraph>
					<S.Footer>
						<Typography.Title>
							{data.credits.workName || "Sem título"}
						</Typography.Title>
						<Typography.Small>
							{data.credits.author || "Desconhecido"}
						</Typography.Small>
					</S.Footer>
				</S.Container>
			)}
		</BottomSheet>
	);
}
