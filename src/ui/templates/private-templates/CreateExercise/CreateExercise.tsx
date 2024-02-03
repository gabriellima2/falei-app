import { ScrollContainer, Header } from "@/ui/atoms";
import { BreathingForm } from "@/ui/components";

export const CreateExercise = () => {
	return (
		<ScrollContainer>
			<Header title="Exercício de Respiração" />
			<BreathingForm.Root>
				<BreathingForm.Content>
					<BreathingForm.TitleField />
					<BreathingForm.RoundsField />
					<BreathingForm.Timer
						inhale={{ value: "1" }}
						hold={{ value: "1" }}
						exhale={{ value: "1" }}
					/>
					<BreathingForm.Schedule
						defaultEnabled
						days={["sunday"]}
						hour={new Date()}
						onDayChange={(days) => console.log(days)}
						onHourChange={(hour) => console.log(hour)}
					/>
				</BreathingForm.Content>
				<BreathingForm.Footer>
					<BreathingForm.CancelButton />
					<BreathingForm.SubmitButton />
				</BreathingForm.Footer>
			</BreathingForm.Root>
		</ScrollContainer>
	);
};
