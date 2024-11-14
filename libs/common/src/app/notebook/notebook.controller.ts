import { Observable } from 'rxjs'

import {
    CreateNotebookReply,
    CreateNotebookRequest,
    NotebookServiceController,
    NotebookServiceControllerMethods,
    OrderingNotebookRequest,
} from '@/proto/notebook'

import { NotebookService } from './notebook.service'

@NotebookServiceControllerMethods()
export class NotebookController implements NotebookServiceController {
    constructor(private readonly notebookService: NotebookService) {}

    createNotebook(
        request: CreateNotebookRequest,
    ): CreateNotebookReply | Observable<CreateNotebookReply> | Promise<CreateNotebookReply> {
        return this.notebookService.createNotebook(request)
    }

    orderingNotebook(request: OrderingNotebookRequest): Promise<void> {
        return this.notebookService.orderingNotebook(request.notebookId, request)
    }
}
