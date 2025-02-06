import { initializeAuth, getReactNativePersistence, connectAuthEmulator } from 'firebase/auth'
import { connectFirestoreEmulator, getFirestore } from 'firebase/firestore'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { getApp, getApps, initializeApp } from 'firebase/app'

import { env } from '@/env'

export const firebaseConfig = {
	apiKey: env.API_KEY,
	authDomain: env.AUTH_DOMAIN,
	projectId: env.PROJECT_ID,
	storageBucket: env.STORAGE_BUCKET,
	messagingSenderId: env.MESSAGING_SENDER_ID,
	appId: process.env.APP_ID,
}

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp()
const db = getFirestore(app)
const auth = initializeAuth(app, {
	persistence: getReactNativePersistence(AsyncStorage),
})

if (__DEV__) {
	// 10.0.2.2 is the special IP address to connect to the 'localhost' of
	// the host computer from an Android emulator.
	connectAuthEmulator(auth, 'http://10.0.2.2:9099')
	connectFirestoreEmulator(db, '10.0.2.2', 8080)
}

export { app, db, auth }
