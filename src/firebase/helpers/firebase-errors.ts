export function getFirebaseErrorByCode(errorCode: string) {
	const separatorIndex = errorCode.indexOf('/')
	const type = errorCode.slice(0, separatorIndex)
	const cause = errorCode.slice(separatorIndex + 1)
	return { type, cause }
}
