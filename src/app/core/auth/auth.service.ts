import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Environment } from '../../../environments/environment.interface';

@Injectable()
export class AuthService {

  constructor() {
    console.log(<Environment>environment.fbAppConfig);
  }

}
