export class TongueTwisterNotFoundException extends Error {
	constructor() {
		super('Trava-língua não encontrado. Por favor, verifique e tente novamente')
		this.name = 'TongueTwisterNotFoundException'
	}
}
