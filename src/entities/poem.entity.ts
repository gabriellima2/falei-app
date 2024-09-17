export interface PoemEntity {
	id: string
	body: string
	authorName?: string | null
	userId?: string | null
	createdAt: string
	updatedAt: string
}
