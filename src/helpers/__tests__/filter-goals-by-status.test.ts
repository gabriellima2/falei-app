import { filterGoalsByStatus } from '../goals'
import type { GoalEntity } from '@/entities/goal.entity'

describe('filterGoalsByStatus', () => {
	it('should return all goals', () => {
		const allGoals = filterGoalsByStatus.all(goals)

		expect(allGoals).toHaveLength(goals.length)
	})
	it('should filter by completed goals', () => {
		const completedGoals = filterGoalsByStatus.completed(goals)

		expect(completedGoals).toHaveLength(2)
	})
	it('should filter by pending goals', () => {
		const pendingGoals = filterGoalsByStatus.pending(goals)

		expect(pendingGoals).toHaveLength(1)
	})
})



const goals: GoalEntity[] = [
	{
		id: 'goal-001',
		title: 'any_title',
		roundsTotal: 4,
		steps: {
			exhale: 5000,
			hold: 3000,
			inhale: 7000,
		},
		frequencyPerWeek: 5,
		currentWeekProgress: 4,
		activityHistory: [
			{ createdAt: new Date('2025-01-20T08:30:00Z') },
			{ createdAt: new Date('2025-01-21T09:15:00Z') },
			{ createdAt: new Date('2025-01-22T10:00:00Z') },
			{ createdAt: new Date('2025-01-23T10:00:00Z') },
		],
		userId: 'user-123',
		createdAt: new Date('2025-01-01T12:00:00Z'),
		updatedAt: new Date('2025-01-24T14:45:00Z'),
		status: 'completed',
	},
	{
		id: 'goal-002',
		title: 'any_title',
		roundsTotal: 3,
		steps: {
			exhale: 5000,
			hold: 3000,
			inhale: 7000,
		},
		frequencyPerWeek: 5,
		currentWeekProgress: 3,
		activityHistory: [
			{ createdAt: new Date('2025-01-20T08:30:00Z') },
			{ createdAt: new Date('2025-01-21T09:15:00Z') },
			{ createdAt: new Date('2025-01-22T10:00:00Z') },
		],
		userId: 'user-123',
		createdAt: new Date('2025-01-01T12:00:00Z'),
		updatedAt: new Date('2025-01-24T14:45:00Z'),
		status: 'completed',
	},
	{
		id: 'goal-003',
		title: 'any_title',
		roundsTotal: 3,
		steps: {
			exhale: 5000,
			hold: 3000,
			inhale: 7000,
		},
		frequencyPerWeek: 5,
		currentWeekProgress: 4,
		activityHistory: [
			{ createdAt: new Date('2025-01-20T08:30:00Z') },
			{ createdAt: new Date('2025-01-21T09:15:00Z') },
			{ createdAt: new Date('2025-01-22T10:00:00Z') },
		],
		userId: 'user-123',
		createdAt: new Date('2025-01-01T12:00:00Z'),
		updatedAt: new Date('2025-01-24T14:45:00Z'),
		status: 'pending',
	},
]
