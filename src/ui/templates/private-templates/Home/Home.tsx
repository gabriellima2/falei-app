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

import { makeAppointmentRepositoryImpl } from "@/factories/repositories/make-appointment-repository-impl";
import { makeExerciseRepositoryImpl } from "@/factories/repositories/make-exercise-repository-impl";

import { ExerciseCategoryEntity } from "@/entities/exercise-category.entity";
import type {
	BreathingExerciseEntity,
	BreathingAppointmentEntity,
} from "@/entities/breathing-entities";

async function getData() {
	return {
		appointments:
			await makeAppointmentRepositoryImpl<BreathingAppointmentEntity>().getAll({
				category: ExerciseCategoryEntity.Breathing,
			}),
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
		const { title, filteredAppointments, incompleteExercises } = useHomeState({
			exercises,
			appointments,
		});
		const hasIncompleteExercises = !!incompleteExercises.length;
		return (
			<ScrollContainer isBottomTabRendered>
				<Header
					title={title}
					headerRight={() => <NotificationButton hasNewNotifications />}
				/>
				<Container horizontalSpacing>
					<Group title="Lembretes da semana">
						<BreathingAppointments appointments={filteredAppointments} />
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
						<BreathingExercisesPreview items={exercises} />
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
