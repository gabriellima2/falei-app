export class RepositoryException extends Error {
	constructor(message: string) {
		super(message)
		this.name = 'RepositoryException'
	}
}
