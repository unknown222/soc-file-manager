import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.example';

@Injectable()
export class AuthService {

  constructor() {
    console.log(environment.fbAppConfig);
  }

}
