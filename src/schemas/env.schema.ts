import { z } from 'zod'

export const envSchema = z.object({
	API_KEY: z.string(),
	AUTH_DOMAIN: z.string(),
	PROJECT_ID: z.string(),
	STORAGE_BUCKET: z.string(),
	MESSAGING_SENDER_ID: z.string(),
	APP_ID: z.string(),
	BREATHING_EXERCISES_COLLECTION_NAME: z.string(),
	GOALS_COLLECTION_NAME: z.string(),
	POEMS_COLLECTION_NAME: z.string(),
	TONGUE_TWISTER_COLLECTION_NAME: z.string(),
})
