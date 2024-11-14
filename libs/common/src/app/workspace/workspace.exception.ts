import { ForbiddenException } from '@nestjs/common'

export namespace WorkspaceException {
    export class NotInWorkspace extends ForbiddenException {
        constructor() {
            super('Not in worksspace')
        }
    }
}
