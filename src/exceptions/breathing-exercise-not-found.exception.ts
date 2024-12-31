export class BreathingExerciseNotFoundException extends Error {
	constructor() {
		super(
			'Exercício de respiração não encontrado. Por favor, verifique e tente novamente',
		)
		this.name = 'BreathingExerciseNotFoundException'
	}
}
