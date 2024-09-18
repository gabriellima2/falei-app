export class GoalNotFoundException extends Error {
	constructor() {
		super('Meta não encontrada. Por favor, verifique e tente novamente')
		this.name = 'GoalNotFoundException'
	}
}
