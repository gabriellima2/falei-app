import styled from "styled-components/native";

import { ExerciseInProgress, ExerciseReminder, Group } from "@/components";
import { ProtectScreen } from "@/hocs";

function Page() {
	return (
		<Container>
			<Group title="Próximo lembrete">
				<ExerciseReminder
					name="Respiração Rápida"
					durationInMin={18}
					repetitions={4}
					scheduledAt="Ter - 18:30"
				/>
			</Group>
			<Group title="Em progresso">
				<ExerciseInProgress
					name="Respiração Normal"
					currentProgress={5}
					href={{ pathname: "/" }}
				/>
			</Group>
		</Container>
	);
}

export default ProtectScreen(Page);

const Container = styled.View`
	gap: 32px;
`;
