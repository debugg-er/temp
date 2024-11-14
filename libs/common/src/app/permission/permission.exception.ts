import { ForbiddenException } from '@nestjs/common'

export namespace PermissionException {
    export class NotInWorkspace extends ForbiddenException {
        constructor() {
            super('Not in workspace')
        }
    }
    export class PermissionDenied extends ForbiddenException {
        constructor() {
            super('Insufficient privilege')
        }
    }
}
