/**
 * Created by Unknown on 6/2/2017.
 */
import { Injectable } from '@angular/core';
import { FacebookService, LoginResponse } from 'ngx-facebook';
import { ApiProvider } from './entities/api-provider';
import { Http } from '@angular/http';
import { environment } from '../../../environments/environment';
import { Providers } from './entities/providers.enum';
import { ProviderStatuses } from './entities/provider-statuses.enum';

import { PromiseObservable } from 'rxjs/observable/PromiseObservable';
import { Observable } from 'rxjs/Observable';
import { AsyncSubject } from 'rxjs/AsyncSubject';
import 'rxjs/add/observable/fromPromise';
import 'rxjs/add/observable/defer';
import 'rxjs/add/operator/mergeMap';
import { User } from './entities/user';
import { PageWithLoadingPermissions } from './entities/page-with-loading-permissons';
import { ProviderNames } from './entities/provider-names';
import { Album } from './entities/album';

@Injectable()
export class ApiFbProviderService implements ApiProvider {


  name = ProviderNames[ Providers.FB ];
  type = Providers.FB;
  status = ProviderStatuses.UNDEFINED;
  initRequest = new AsyncSubject();

  http: Http;

  constructor(private fb: FacebookService, http: Http) {
    this.http = http;
    this.init().mergeMap(() => this.checkLoginStatus()).subscribe(this.initRequest);
  }

  init() {
    return Observable.create(observer => {
      if (environment.fbAppConfig) {
        this.fb.init(environment.fbAppConfig.initParams).then(response => {
          this.status = ProviderStatuses.INIT;
          observer.next(response);
          observer.complete();
        }).catch(e => {
          this.status = ProviderStatuses.ERROR;
          observer.error('Error on init fb api');
        });
      } else {
        this.status = ProviderStatuses.ERROR;
        observer.error('No fb api configs for provider');
      }
    });

  }

  checkLoginStatus() {
    return Observable.defer(() => Observable.fromPromise(this.fb.getLoginStatus().then(response => {
      if (response.status === 'connected') {
        this.status = ProviderStatuses.CONNECTED;
      }
      return response;
    })));
  }

  login() {
    let request = Observable.defer(() => Observable.fromPromise(this.fb.login(environment.fbAppConfig.loginOptions)
      .then((response: LoginResponse) => {
        if (response.status === 'connected') {
          this.status = ProviderStatuses.CONNECTED;
        }
        return response;
      }).catch(e => e)));

    return this.initRequest.mergeMap(() => request);
  }

  logout() {
    let request = Observable.defer(() => Observable.fromPromise(this.fb.logout()
      .then((response: LoginResponse) => {
        this.status = ProviderStatuses.INIT;
        this.cleanupCookies();
        return response;
      })));
    return this.initRequest.mergeMap(() => request);
  }

  getUserInfo() {
    let request = Observable.defer(() => Observable.fromPromise(this.fb.api('/me', 'get', { fields: 'id,name,picture' }).then(response => {
      let photoUrl;
      if (response.picture) {
        photoUrl = response.picture.data.url
      }
      return new User(response.id, response.name, photoUrl);
    })));
    return this.initRequest.mergeMap(() => request);
  }

  getPagesWithLoadingPermissions(): Observable<Array<PageWithLoadingPermissions>> {
    let request = Observable.defer(() => Observable.fromPromise(this.fb.api('/me/groups', 'get', { fields: 'id,description,name,photo' }).then(response => {
      let pagesWithLoadingPermissions: Array<PageWithLoadingPermissions> = [ new PageWithLoadingPermissions('me', this.type, 'My page') ];
      for (let group of response.data) {
        pagesWithLoadingPermissions.push(new PageWithLoadingPermissions(group.id, this.type, group.name, group.photo, group.description));
      }
      return pagesWithLoadingPermissions;
    })));
    return this.initRequest.mergeMap(() => request);
  }

  getAlbums(pageId: string): Observable<Array<Album>> {
    let request = Observable.defer(() => Observable.fromPromise(this.fb.api(pageId + '/albums', 'get', { fields: 'id,name,description' }).then(response => {
      let albums: Array<PageWithLoadingPermissions> = [];
      for (let album of response.data) {
        albums.push(new Album(album.id, this.type, album.name, album.photo, album.description));
      }
      return albums;
    })));
    return this.initRequest.mergeMap(() => request);
  }

  getPhotos(albumId: string): Observable<any> {
    let promise = this.fb.api(albumId + '/photos?fields=images').then(response => {
      return response;
    }).catch(e => {
      console.log(e);
    });
    return PromiseObservable.create(promise);
  }

  createAlbum(pageId: string, params: any): Observable<any> {
    let promise = this.fb.api(pageId + '/albums', 'post', params).then(response => {
      return response;
    }).catch(e => {
      console.log(e);
    });
    return PromiseObservable.create(promise);
  }

  uploadPhotos(albumId: string, photos: any): Observable<any> {
    let batchRequests = [];
    for (let photo of photos) {
      let request = {
        method: 'POST',
        relative_url: albumId + '/photos',
        body: '&url=' + encodeURIComponent(photo.url)
      };
      batchRequests.push(request);
    }

    let promise = this.fb.api('', 'post', { batch: batchRequests }).then(response => {
      console.log(response);
      return response;
    }).catch(e => {
      console.log(e);
    });
    return PromiseObservable.create(promise);
  }

  uploadPhoto(albumId: string, photo: any): Observable<any> {
    let promise = this.fb.api(albumId + '/photos', 'post', photo).then(response => {
      return response
    }).catch(console.error);
    return PromiseObservable.create(promise);
  }

  cleanupCookies() {
    //there seems to be some bug with fb.logout method which require to edit cookies, or getLoginStatus won't work
    function delete_cookie(name) {
      document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT; path=/';
    }

    let cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
      if (cookies[ i ].split('=')[ 0 ].indexOf('fblo_') != -1)
        delete_cookie(cookies[ i ].split('=')[ 0 ]);
    }
  }
}
