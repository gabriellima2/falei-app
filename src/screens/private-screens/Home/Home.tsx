import styled from "styled-components/native";

import { useHome } from "./hooks/use-home";
import {
	BreathingExercisePreviewList,
	ContainerWithDefaultSpaces,
	NotificationButton,
	BreathingExerciseAppointments,
	ScrollContainer,
	Group,
	Header,
} from "@/components";
import { WithQuery, type WithQueryInjectProps } from "@/hocs/WithQuery";

import {
	makeBreathingExerciseRepositoryImpl,
	makeBreathingExerciseAppointmentRepositoryImpl,
} from "@/factories/repositories";

import type {
	BreathingExerciseEntity,
	BreathingExerciseAppointmentEntity,
} from "@/entities";
import { IncompleteBreathingExercises } from "@/components/Exercises/IncompleteBreathingExercises/IncompleteBreathingExercises";

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
		const { title, filteredAppointments, incomplete } = useHome({
			exercises,
			appointments,
		});

		const incompleteExercises = incomplete.appointments || incomplete.exercises;
		const hasMoreThanOneIncompleteExercise =
			incompleteExercises && incompleteExercises.length > 1;

		return (
			<ScrollContainer isBottomTabRendered>
				<Header
					title={title}
					headerRight={() => <NotificationButton hasNewNotifications />}
				/>
				<Container horizontalSpacing>
					<Group title="Lembretes da semana">
						<BreathingExerciseAppointments
							appointments={filteredAppointments}
						/>
					</Group>
					<Group
						title="Em progresso"
						rightLink={
							hasMoreThanOneIncompleteExercise
								? { pathname: "/", text: "Ver Mais" }
								: undefined
						}
					>
						<IncompleteBreathingExercises
							exercises={incompleteExercises ? [incompleteExercises[0]] : []}
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
