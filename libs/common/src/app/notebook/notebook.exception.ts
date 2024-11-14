import { NotFoundException } from '@nestjs/common'

export namespace NotebookException {
    export class NotebookNotFound extends NotFoundException {
        constructor() {
            super('Notebook not found')
        }
    }
    export class InvalidOrder extends NotFoundException {
        constructor() {
            super('order must > 0 and <= lasted order')
        }
    }
}
