import { initializeAuth, getReactNativePersistence } from 'firebase/auth'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { getFirestore } from 'firebase/firestore'
import { initializeApp } from 'firebase/app'
import Constants from 'expo-constants'

const firebaseConfig = {
	apiKey: Constants.manifest?.extra?.firebaseApiKey,
	authDomain: Constants.manifest?.extra?.firebaseAuthDomain,
	projectId: Constants.manifest?.extra?.firebaseProjectId,
	storageBucket: Constants.manifest?.extra?.firebaseStorageBucket,
	messagingSenderId: Constants.manifest?.extra?.firebaseMessagingSenderId,
	appId: Constants.manifest?.extra?.firebaseAppId,
}

export const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)
export const auth = initializeAuth(app, {
	persistence: getReactNativePersistence(AsyncStorage),
})
