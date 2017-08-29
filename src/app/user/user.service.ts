import { Injectable } from '@angular/core';

import { User } from './user';

@Injectable()
export class UserService {

  selectedUser: User = null;

}
