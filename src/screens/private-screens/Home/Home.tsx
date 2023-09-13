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
		duration_in_minutes: 18,
		repetitions: 4,
	},
	{
		id: "2",
		title: "Respiração Lenta",
		duration_in_minutes: 20,
		repetitions: 3,
	},
	{
		id: "3",
		title: "Respiração Normal",
		duration_in_minutes: 15,
		repetitions: 5,
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
						scheduled_at="Ter - 18:30"
						duration_in_minutes={18}
						repetitions={4}
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
