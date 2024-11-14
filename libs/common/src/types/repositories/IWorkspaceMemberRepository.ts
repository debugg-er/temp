import { NewWorkspaceMember, WorkspaceMember } from '@/schemas/workspace-member'

import { IBaseRepository } from './IBaseRepository'

export const IWorkspaceMemberRepository = Symbol('IWorkspaceMemberRepository')
export interface IWorkspaceMemberRepository
    extends IBaseRepository<WorkspaceMember, NewWorkspaceMember, Pick<WorkspaceMember, 'userId' | 'workspaceId'>> {
    findMemberByNoteId(memberId: string, noteId: string): Promise<WorkspaceMember | null>
    findMemberByNotebookId(memberId: string, noteId: string): Promise<WorkspaceMember | null>
    findMemberByWorkspaceId(memberId: string, noteId: string): Promise<WorkspaceMember | null>
}
