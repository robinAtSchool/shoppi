import {Injectable} from '@angular/core';
import {CanActivate} from '@angular/router';
import {AppGlobalService} from './app.global.service';

@Injectable()
export class AdminGuard implements CanActivate {

  constructor(private globalService: AppGlobalService) {}

  canActivate() {
    return this.globalService.user.isAdmin;
  }
}
