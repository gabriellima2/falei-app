export class PoemNotFoundException extends Error {
	constructor() {
		super('Poema não encontrado. Por favor, verifique e tente novamente')
		this.name = 'PoemNotFoundException'
	}
}
