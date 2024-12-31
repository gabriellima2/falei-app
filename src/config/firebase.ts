import { initializeAuth, getReactNativePersistence } from 'firebase/auth'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { getFirestore } from 'firebase/firestore'
import { initializeApp } from 'firebase/app'

import { env } from '@/env'

export const firebaseConfig = {
	apiKey: env.API_KEY,
	authDomain: env.AUTH_DOMAIN,
	projectId: env.PROJECT_ID,
	storageBucket: env.STORAGE_BUCKET,
	messagingSenderId: env.MESSAGING_SENDER_ID,
	appId: process.env.APP_ID,
}

export const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)
export const auth = initializeAuth(app, {
	persistence: getReactNativePersistence(AsyncStorage),
})
