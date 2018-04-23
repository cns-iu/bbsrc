export interface QueryResults<T> {
  results: T[],
  pageInfo: {
    totalCount: number
  }
}
