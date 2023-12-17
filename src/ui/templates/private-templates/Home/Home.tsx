import styled from "styled-components/native";

import { useHomeState } from "./hooks/use-home-state";

import {
	BreathingExercisesPreview,
	IncompleteExercises,
	NotificationButton,
	BreathingAppointments,
} from "./components";
import {
	Group,
	Header,
	ScrollContainer,
	ContainerWithDefaultSpaces,
} from "@/ui/atoms";
import { WithQuery, type WithQueryInjectProps } from "@/hocs/WithQuery";

import { makeBreathingExerciseService } from "@/factories/services/make-breathing-exercise-service";

import type {
	BreathingExerciseEntity,
	BreathingAppointmentEntity,
} from "@/entities/breathing-entities";

type HomeProps = WithQueryInjectProps<{
	appointments: BreathingAppointmentEntity[];
	exercises: BreathingExerciseEntity[];
}>;

export const Home = WithQuery(
	(props: HomeProps) => {
		const { data } = props;
		const { title, weekAppointments, incompleteExercises } = useHomeState(data);
		const hasIncompleteExercises = !!incompleteExercises.length;
		return (
			<ScrollContainer isBottomTabRendered>
				<Header
					title={title}
					headerRight={() => <NotificationButton hasNewNotifications />}
				/>
				<Container horizontalSpacing>
					<Group title="Lembretes da semana">
						<BreathingAppointments appointments={weekAppointments} />
					</Group>
					<Group
						title="Em progresso"
						rightLink={
							hasIncompleteExercises
								? { pathname: "/", text: "Ver Mais" }
								: undefined
						}
					>
						<IncompleteExercises
							exercises={hasIncompleteExercises ? incompleteExercises : []}
							href={{ pathname: "/" }}
						/>
					</Group>
					<Group
						title="Exercícios"
						rightLink={{ pathname: "/", text: "Ver Mais" }}
					>
						<BreathingExercisesPreview items={data.exercises} />
					</Group>
				</Container>
			</ScrollContainer>
		);
	},
	{
		name: "overview-data",
		fn: () => makeBreathingExerciseService().getAll(),
	}
);

const Container = styled(ContainerWithDefaultSpaces)`
	gap: 32px;
`;
