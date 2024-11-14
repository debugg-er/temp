export type IsolationLevel = 'read uncommitted' | 'read committed' | 'repeatable read' | 'serializable'

export const ITransactionManager = Symbol('ITransactionManager')
export interface ITransactionManager {
    run<T>(
        action: () => Promise<T>,
        options?: {
            isolationLevel?: 'read uncommitted' | 'read committed' | 'repeatable read' | 'serializable'
        },
    ): Promise<T>
}
