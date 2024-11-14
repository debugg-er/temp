import { NewNote, Note } from '@/schemas/note'

import { IBaseRepository } from './IBaseRepository'
import { TPagination } from '../core/query'

export const INoteRepository = Symbol('INoteRepository')
export interface INoteRepository extends IBaseRepository<Note, NewNote, Note['id']> {
    findNotesInBook(bookId: string, pagination: TPagination<'updated_at'>): Promise<Note[]>
}
