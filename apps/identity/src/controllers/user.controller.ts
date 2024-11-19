import { Payload, UserServiceController, UserServiceControllerMethods } from '../proto/user'
import { UserService } from '../services/user.service'

@UserServiceControllerMethods()
export class UserController implements UserServiceController {
    constructor(private readonly userService: UserService) {}

    storeUser(request: Payload) {
        return this.userService.storeUser(request)
    }
}
