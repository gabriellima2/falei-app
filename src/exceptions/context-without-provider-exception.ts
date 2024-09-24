export class ContextWithoutProviderException extends Error {
	constructor(contextName: string, providerName: string) {
		super(`${contextName} must be used within ${providerName}`)
		this.name = 'ContextWithoutProviderException'
	}
}
