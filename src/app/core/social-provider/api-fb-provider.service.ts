/**
 * Created by Unknown on 6/2/2017.
 */
import { Injectable } from '@angular/core';
import { FacebookService, InitParams, LoginOptions, LoginResponse } from 'ngx-facebook';
import { PromiseObservable } from 'rxjs/observable/PromiseObservable';
import { Observable } from 'rxjs/Observable';
import { ApiProvider } from './entities/api-provider';

@Injectable()
export class ApiFbProviderService implements ApiProvider {

  name: string = 'FB';

  constructor(private fb: FacebookService) {
    let initParams: InitParams = {
      appId: '238618126543417',
      xfbml: true,
      version: 'v2.9'
    };

    fb.init(initParams);
    this.checkLoginStatus();
  }

  login() {
    const options: LoginOptions = {
      scope: 'public_profile,user_photos,pages_show_list,publish_actions',
      return_scopes: true,
      enable_profile_selector: true
    };

    this.fb.login(options)
      .then((response: LoginResponse) => {
        console.log('Logged in', response)
      })
      .catch(e => console.error('Error logging in'));
  }

  checkLoginStatus() {
    return this.fb.getLoginStatus()
      .then(response => {
        console.log(response);
      })
      .catch(e => {
        console.log(e);
      });
  }

  logout() {
    throw new Error('Method not implemented.');
  }

  getPages(userId: number): Observable<any> {
    throw new Error('Method not implemented.');
  }

  getAlbums(pageId: number | string): Observable<any> {
    let promise = this.fb.api(pageId + '/albums').then(response => {
      return response.data;
    }).catch(e => {
      console.log(e);
    });
    return PromiseObservable.create(promise);
  }

  getPhotos(albumId: number): Observable<any> {
    let promise = this.fb.api(albumId + '/photos?fields=images').then(response => {
      return response;
    }).catch(e => {
      console.log(e);
    });
    return PromiseObservable.create(promise);
  }

  createAlbum(pageId: number, ...params: any[]): Observable<any> {
    throw new Error('Method not implemented.');
  }

  uploadPhoto(albumId: number, ...params: any[]): Observable<any> {
    throw new Error('Method not implemented.');
  }

}
