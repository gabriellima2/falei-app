export const VALIDATION_RULES = {
	MIN_LENGTH_PASSWORD: 8,
	MAX_LENGTH_PASSWORD: 45,
	MAX_LENGTH_EMAIL: 255,
}

export const VALIDATION_MESSAGES = {
	REQUIRED: 'O campo é obrigatório.',
	MIN_LENGTH_PASSWORD: `A senha deve conter no minímo ${VALIDATION_RULES.MIN_LENGTH_PASSWORD} caracteres.`,
	MAX_LENGTH_PASSWORD: `A senha deve conter no máximo ${VALIDATION_RULES.MAX_LENGTH_PASSWORD} caracteres.`,
	INVALID_EMAIL: 'E-mail inválido.',
	MAX_LENGTH_EMAIL: `O e-mail deve conter no máximo ${VALIDATION_RULES.MAX_LENGTH_EMAIL} caracteres.`,
	REQUIRED_PASSWORD_TO_EDIT: 'Para alterar a sua senha, é necessário inserir uma nova.',
}
