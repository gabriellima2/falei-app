import { envSchema } from '@/schemas/env.schema'

export const env = envSchema.parse({
	API_KEY: process.env.EXPO_PUBLIC_API_KEY,
	AUTH_DOMAIN: process.env.EXPO_PUBLIC_AUTH_DOMAIN,
	PROJECT_ID: process.env.EXPO_PUBLIC_PROJECT_ID,
	STORAGE_BUCKET: process.env.EXPO_PUBLIC_STORAGE_BUCKET,
	MESSAGING_SENDER_ID: process.env.EXPO_PUBLIC_MESSAGING_SENDER_ID,
	APP_ID: process.env.EXPO_PUBLIC_APP_ID,
	BREATHING_EXERCISES_COLLECTION_NAME:
		process.env.EXPO_PUBLIC_EXPO_PUBLIC_BREATHING_EXERCISES_COLLECTION_NAME,
	GOALS_COLLECTION_NAME:
		process.env.EXPO_PUBLIC_EXPO_PUBLIC_GOALS_COLLECTION_NAME,
	POEMS_COLLECTION_NAME:
		process.env.EXPO_PUBLIC_EXPO_PUBLIC_POEMS_COLLECTION_NAME,
	TONGUE_TWISTER_COLLECTION_NAME:
		process.env.EXPO_PUBLIC_EXPO_PUBLIC_TONGUE_TWISTER_COLLECTION_NAME,
})
