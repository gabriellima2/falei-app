export interface PoemEntity {
	id: string
	body: string
	title: string
	authorName?: string | null
	userId?: string | null
	createdAt: Date
	updatedAt: Date
}
