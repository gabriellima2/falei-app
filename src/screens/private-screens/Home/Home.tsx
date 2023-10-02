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
	Typography,
} from "@/components";
import { WithQuery, WithQueryInjectProps } from "@/hocs/WithQuery";

import { useFilteredAppointments } from "@/hooks";
import {
	makeBreathingExerciseRepositoryImpl,
	makeScheduledBreathingExerciseRepositoryImpl,
} from "@/factories/repositories";

import type {
	BreathingExerciseEntity,
	ScheduledBreathingExerciseEntity,
} from "@/entities";

async function getData() {
	return {
		schedules: await makeScheduledBreathingExerciseRepositoryImpl().getAll(),
		exercises: await makeBreathingExerciseRepositoryImpl().getAll(),
	};
}

type HomeProps = WithQueryInjectProps<{
	schedules: ScheduledBreathingExerciseEntity[];
	exercises: BreathingExerciseEntity[];
}>;

export const Home = WithQuery(
	(props: HomeProps) => {
		const {
			data: { exercises, schedules },
		} = props;

		const filteredAppointments = useFilteredAppointments(schedules);
		const appointment = filteredAppointments[0];

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
						<Typography.Title>
							Não há lembretes para essa semana
						</Typography.Title>
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
	},
	{ name: "overview-data", fn: getData }
);

const Container = styled(ContainerWithDefaultSpaces)`
	gap: 32px;
`;
