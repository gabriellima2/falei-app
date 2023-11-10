import styled from "styled-components/native";

import { useHome } from "./hooks/use-home";
import {
	BreathingExercisePreviewList,
	ContainerWithDefaultSpaces,
	NotificationButton,
	BreathingExerciseAppointments,
	IncompleteExercises,
	ScrollContainer,
	Group,
	Header,
} from "@/components";
import { WithQuery, type WithQueryInjectProps } from "@/hocs/WithQuery";

import { makeExerciseRepositoryImpl } from "@/factories/repositories/make-exercise-repository-impl";

import { ExerciseCategoryEntity } from "@/entities/exercise-category.entity";
import type {
	BreathingExerciseEntity,
	BreathingAppointmentEntity,
} from "@/entities/breathing-entities";

async function getData() {
	return {
		appointments:
			await makeBreathingExerciseAppointmentRepositoryImpl().getAll(),
		exercises:
			await makeExerciseRepositoryImpl().getAll<BreathingExerciseEntity>({
				category: ExerciseCategoryEntity.Breathing,
			}),
	};
}

type HomeProps = WithQueryInjectProps<{
	appointments: BreathingAppointmentEntity[];
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
						<IncompleteExercises
							exercises={incompleteExercises ? incompleteExercises : []}
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
