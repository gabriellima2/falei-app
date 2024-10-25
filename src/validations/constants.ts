export const VALIDATION_RULES = {
	MIN_LENGTH_PASSWORD: 8,
	MAX_LENGTH_PASSWORD: 45,
}

export const VALIDATION_MESSAGES = {
	REQUIRED: 'O campo é obrigatório',
	MIN_LENGTH_PASSWORD: `A senha deve conter no minímo ${VALIDATION_RULES.MIN_LENGTH_PASSWORD} caracteres`,
	MAX_LENGTH_PASSWORD: `A senha deve conter no máximo ${VALIDATION_RULES.MAX_LENGTH_PASSWORD} caracteres`,
}
