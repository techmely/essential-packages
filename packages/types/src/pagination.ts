export interface PageInfo {
	startCursor?: string;
	endCursor?: string;
}

export interface Edge<T> {
	cursor: string;
	node: T;
}

export interface CursorPaginated<T> {
	pageInfo: PageInfo;
	edges: Edge<T>[];
}
