import styled from "styled-components/native";

import {
	BreathingExercisePreviewList,
	ContainerWithDefaultSpaces,
	ExerciseInProgress,
	NotificationButton,
	ExerciseReminder,
	ScrollContainer,
	Group,
	Header,
} from "@/components";

import type { BreathingExerciseEntity } from "@/entities";

const data: BreathingExerciseEntity[] = [
	{
		id: "1",
		title: "Respiração Constante",
		rounds: {
			duration_per_round_in_min: 18,
			rounds_completed: 0,
			rounds_total: 4,
		},
	},
	{
		id: "2",
		title: "Respiração Lenta",
		rounds: {
			duration_per_round_in_min: 20,
			rounds_completed: 0,
			rounds_total: 3,
		},
	},
	{
		id: "3",
		title: "Respiração Normal",
		rounds: {
			duration_per_round_in_min: 15,
			rounds_completed: 0,
			rounds_total: 5,
		},
	},
];

export function Home() {
	return (
		<ScrollContainer isBottomTabRendered>
			<Header
				title="Hello World"
				headerRight={() => <NotificationButton hasNewNotifications />}
			/>
			<Container horizontalSpacing>
				<Group title="Próximo lembrete">
					<ExerciseReminder
						title="Respiração Rápida"
						scheduled_at={{ days: ["Terça"], hour: "17:00" }}
						rounds={{
							duration_per_round_in_min: 18,
							rounds_total: 4,
							rounds_completed: 0,
						}}
					/>
				</Group>
				<Group title="Em progresso">
					<ExerciseInProgress
						name="Respiração Normal"
						currentProgress={5}
						href={{ pathname: "/" }}
					/>
				</Group>
				<Group
					title="Exercícios"
					rightLink={{ pathname: "/", text: "Ver Mais" }}
				>
					<BreathingExercisePreviewList items={data} />
				</Group>
			</Container>
		</ScrollContainer>
	);
}

const Container = styled(ContainerWithDefaultSpaces)`
	gap: 32px;
`;
