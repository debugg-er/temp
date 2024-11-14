import { IsNotEmpty, IsString, MaxLength } from 'class-validator'

import { CreateWorkspaceRequest } from '@/proto/workspace'

export class CreateWorkspaceRequestDto implements CreateWorkspaceRequest {
    @IsString()
    @IsNotEmpty()
    @MaxLength(256)
    name: string
}
