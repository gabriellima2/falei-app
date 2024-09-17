export interface PoemDTO {
	title: string
	body: string
	author_name: string | null
	user_id: string | null
	created_at: Timestamp
	updated_at: Timestamp
}
