export interface IBaseRepository<T, TNew, TId> {
    create(data: TNew): Promise<T>
    createMany(data: TNew[]): Promise<T[]>
    findById(id: TId): Promise<T | null>
    exists(id: TId): Promise<boolean>
}
