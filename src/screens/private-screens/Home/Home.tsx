import styled from "styled-components/native";
import { useQuery } from "react-query";

import {
	BreathingExercisePreviewList,
	ContainerWithDefaultSpaces,
	ExerciseInProgress,
	NotificationButton,
	ExerciseReminder,
	ScrollContainer,
	Group,
	Header,
	LoadingIndicator,
	TextError,
	Typography,
} from "@/components";
import {
	makeBreathingExerciseRepositoryImpl,
	makeScheduledBreathingExerciseRepositoryImpl,
} from "@/factories/repositories";

async function getData() {
	return {
		schedules: await makeScheduledBreathingExerciseRepositoryImpl().getAll(),
		exercises: await makeBreathingExerciseRepositoryImpl().getAll(),
	};
}

export function Home() {
	const { data, error, isLoading } = useQuery("overview-data", getData);
	if (isLoading) return <LoadingIndicator />;
	if (error) return <TextError>{(error as Error).message}</TextError>;
	if ((!error || !isLoading) && !data)
		return <TextError>Erro inesperado</TextError>;

	const { exercises, schedules } = data;
	const appointment = schedules[0];

	return (
		<ScrollContainer isBottomTabRendered>
			<Header
				title="Hello World"
				headerRight={() => <NotificationButton hasNewNotifications />}
			/>
			<Container horizontalSpacing>
				{appointment ? (
					<Group title="Próximo lembrete">
						<ExerciseReminder
							title={appointment.title}
							scheduled_at={appointment.scheduled_at}
							rounds={appointment.rounds}
						/>
					</Group>
				) : (
					<Typography.Title>Não há lembretes para essa semana</Typography.Title>
				)}
				<Group title="Em progresso">
					<ExerciseInProgress
						name={exercises[0].title}
						currentProgress={Math.trunc(
							(exercises[0].rounds.rounds_completed /
								exercises[0].rounds.rounds_total) *
								100
						)}
						href={{ pathname: "/" }}
					/>
				</Group>
				<Group
					title="Exercícios"
					rightLink={{ pathname: "/", text: "Ver Mais" }}
				>
					<BreathingExercisePreviewList items={exercises} />
				</Group>
			</Container>
		</ScrollContainer>
	);
}

const Container = styled(ContainerWithDefaultSpaces)`
	gap: 32px;
`;
