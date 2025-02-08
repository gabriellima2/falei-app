const admin = require('firebase-admin')

const projectId = process.env.EXPO_PUBLIC_PROJECT_ID
const serviceAccount = require('./service-account-key.json')

process.env.FIRESTORE_EMULATOR_HOST = 'localhost:8080'
process.env.FIREBASE_AUTH_EMULATOR_HOST = 'localhost:9099'

admin.initializeApp({
	projectId,
	credential: admin.credential.cert(serviceAccount),
})

const db = admin.firestore()
const auth = admin.auth()

async function getSeedData() {
	try {
		await db.collection('breathing_exercises').add({
			title: 'Respiração Comum',
			rounds_total: 4,
			steps: {
				exhale: 2000,
				hold: 3000,
				inhale: 2000
			},
			created_at: new Date(),
			updated_at: new Date(),
			user_id: null,
		})

		const user = await auth.createUser({
			email: process.env.MAESTRO_USER_EMAIL,
			password: process.env.MAESTRO_USER_PASSWORD,
			emailVerified: true,
			disabled: false,
		})

		await db.collection('breathing_exercises').add({
			title: 'Respiração Customizada',
			rounds_total: 2,
			steps: {
				exhale: 4000,
				hold: 6000,
				inhale: 5000
			},
			created_at: new Date(),
			updated_at: new Date(),
			user_id: user.uid,
		})
	} catch (err) {
		console.error(err)
	}
}

getSeedData()
