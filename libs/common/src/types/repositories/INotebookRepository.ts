import { NewNotebook, Notebook } from '@/schemas/notebook'

import { IBaseRepository } from './IBaseRepository'

export const INotebookRepository = Symbol('INotebookRepository')
export interface INotebookRepository extends IBaseRepository<Notebook, NewNotebook, Notebook['id']> {
    findLastOrder(workspaceId: string): Promise<number | null>
    findNotebookByWorkspaceId(workspaceId: string): Promise<Notebook[]>
    rearrangeNotebookOrder(workspaceId: string, workbookId: string, oldOrder: number, newOrder: number): Promise<void>
}
