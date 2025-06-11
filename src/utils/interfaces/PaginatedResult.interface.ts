export interface PaginatedResult<T> {
	content: T[]
	totalItems: number
	currentPage: number
	pageSize: number
	totalPages: number
	isFirstPage: boolean
	isLastPage: boolean
}