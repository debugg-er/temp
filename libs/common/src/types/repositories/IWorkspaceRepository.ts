import { NewWorkspace, Workspace } from '@/schemas/workspace'

import { IBaseRepository } from './IBaseRepository'
import { TPagination } from '../core/query'

export const IWorkspaceRepository = Symbol('IWorkspaceRepository')
export interface IWorkspaceRepository extends IBaseRepository<Workspace, NewWorkspace, Workspace['id']> {
    getWorkspacesOfUser(userId: string, pagination: TPagination<'added_by'>): Promise<Workspace[]>
}
