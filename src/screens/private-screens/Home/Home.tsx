import styled from "styled-components/native";

import { useHome } from "./hooks/use-home";
import {
	BreathingExercisePreviewList,
	ContainerWithDefaultSpaces,
	ExerciseInProgress,
	NotificationButton,
	ExerciseReminder,
	ScrollContainer,
	Group,
	Header,
	Typography,
} from "@/components";
import { WithQuery, WithQueryInjectProps } from "@/hocs/WithQuery";

import {
	makeBreathingExerciseRepositoryImpl,
	makeBreathingExerciseAppointmentRepositoryImpl,
} from "@/factories/repositories";

import type {
	BreathingExerciseEntity,
	BreathingExerciseAppointmentEntity,
} from "@/entities";

async function getData() {
	return {
		appointments:
			await makeBreathingExerciseAppointmentRepositoryImpl().getAll(),
		exercises: await makeBreathingExerciseRepositoryImpl().getAll(),
	};
}

type HomeProps = WithQueryInjectProps<{
	appointments: BreathingExerciseAppointmentEntity[];
	exercises: BreathingExerciseEntity[];
}>;

export const Home = WithQuery(
	(props: HomeProps) => {
		const {
			data: { exercises, appointments },
		} = props;
		const { title, appointment, incomplete } = useHome({
			exercises,
			appointments,
		});

		const incompleteExercises = incomplete.appointments || incomplete.exercises;

		return (
			<ScrollContainer isBottomTabRendered>
				<Header
					title={title}
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
						<Typography.Title>
							Não há lembretes para essa semana
						</Typography.Title>
					)}
					{incompleteExercises ? (
						<Group title="Em progresso">
							<ExerciseInProgress
								key={incompleteExercises[0].id}
								name={incompleteExercises[0].title}
								currentProgress={Math.trunc(
									(incompleteExercises[0].rounds.rounds_completed /
										incompleteExercises[0].rounds.rounds_total) *
										100
								)}
								href={{ pathname: "/" }}
							/>
						</Group>
					) : (
						<Typography.Title>Nenhum exercício em progresso</Typography.Title>
					)}
					<Group
						title="Exercícios"
						rightLink={{ pathname: "/", text: "Ver Mais" }}
					>
						<BreathingExercisePreviewList items={exercises} />
					</Group>
				</Container>
			</ScrollContainer>
		);
	},
	{ name: "overview-data", fn: getData }
);

const Container = styled(ContainerWithDefaultSpaces)`
	gap: 32px;
`;
