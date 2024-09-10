export class BreathingExerciseFoundException extends Error {
	constructor() {
		super('Exercício de respiração não encontrado')
		this.name = 'BreathingExerciseFoundException'
	}
}
