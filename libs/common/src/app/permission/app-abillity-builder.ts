import { AbilityBuilder as CaslAbilityBuilder, createMongoAbility } from '@casl/ability'

import { Action, Subject } from './permission.type'

import { EWorkspaceRole, WorkspaceMember } from '@/schemas/workspace-member'

export class AppAbillityBuilder {
    private readonly caslAbilityBuilder = new CaslAbilityBuilder(createMongoAbility)

    constructor(private readonly member?: WorkspaceMember) {}

    build() {
        this.buildUserAbillity()
        if (this.member) {
            switch (this.member.role) {
                case EWorkspaceRole.Admin:
                    this.buildWorkspaceAdminAbillity()
                    break
                case EWorkspaceRole.Member:
                    this.buildWorkspaceMemberAbillity()
                    break
            }
        }
        return this.caslAbilityBuilder.build()
    }

    private buildUserAbillity() {
        this.caslAbilityBuilder.can(Action.Create, Subject.Workspace)
    }

    private buildWorkspaceAdminAbillity() {
        this.caslAbilityBuilder.can(Action.Manage, Subject.Workspace)
        this.caslAbilityBuilder.can(Action.Manage, Subject.WorkspaceMember)
        this.buildWorkspaceMemberAbillity()
    }

    private buildWorkspaceMemberAbillity() {
        this.caslAbilityBuilder.can(Action.Read, Subject.Workspace)
        this.caslAbilityBuilder.can(Action.Manage, Subject.Workbook)
        this.caslAbilityBuilder.can(Action.Manage, Subject.Book)
        this.caslAbilityBuilder.can(Action.Manage, Subject.Note)
    }
}
