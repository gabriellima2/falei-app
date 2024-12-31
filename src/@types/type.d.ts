type Timestamp = {
	seconds: number
	nanoseconds: number
}

type MutationParams = {
	onSuccess?: () => Promise<void> | void
	onError?: (error: Error) => Promise<void> | void
}

type MutationReturn<T> = {
	mutate: (params: T) => void
	isPending: boolean
}
