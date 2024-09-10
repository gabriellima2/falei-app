import { makeFirebaseBreathingExerciseRepository } from '@/firebase/repositories/firebase-breathing-exercise.repository'
import { BreathingExerciseServiceImpl } from './impl/breathing-exercise.service'

export const makeBreathingExerciseService = () =>
	new BreathingExerciseServiceImpl(makeFirebaseBreathingExerciseRepository())
