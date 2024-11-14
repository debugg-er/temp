import { ForbiddenException, NotFoundException } from '@nestjs/common'

import { Action } from '../permission/permission.type'

export namespace NoteException {
    export class DontHaveNotePermission extends ForbiddenException {
        constructor(action: Action) {
            super(`You don't have privilege to ${action} book`)
        }
    }
    export class NoteNotFound extends NotFoundException {
        constructor() {
            super('note not found')
        }
    }
    export class BookNotFound extends NotFoundException {
        constructor() {
            super('book not found')
        }
    }
    export class DontHaveBookPermission extends ForbiddenException {
        constructor() {
            super('Dont have book permission')
        }
    }
}
