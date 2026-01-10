export interface IPersistableRepository<TData> {
  exportData(): TData
  importData(data: TData): void
}
