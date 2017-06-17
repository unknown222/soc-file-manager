/**
 * Created by Unknown on 6/2/2017.
 */
declare const FB;
import { Injectable } from '@angular/core';
import { FacebookService, LoginResponse } from 'ngx-facebook';
import { ApiProvider } from './entities/api-provider';
import { Http } from '@angular/http';
import { environment } from '../../../environments/environment';
import { Providers } from './entities/providers.enum';
import { ProviderStatuses } from './entities/provider-statuses.enum';
import { Observable } from 'rxjs/Observable';
import { AsyncSubject } from 'rxjs/AsyncSubject';
import 'rxjs/add/observable/fromPromise';
import 'rxjs/add/observable/defer';
import 'rxjs/add/operator/mergeMap';
import { User } from './entities/user';
import { PageWithLoadingPermissions } from './entities/page-with-loading-permissons';
import { ProviderNames } from './entities/provider-names';
import { Album } from './entities/album';
import { Photo } from 'app/core/social-provider/entities/photo';

@Injectable()
export class ApiFbProviderService implements ApiProvider {

  name = ProviderNames[ Providers.FB ];
  type = Providers.FB;
  status = ProviderStatuses.UNDEFINED;
  initRequest = new AsyncSubject();

  constructor(private fb: FacebookService, private http: Http) {
    this.loadSDK('https://connect.facebook.net/en_US/sdk.js');
  }

  loadSDK(src) {
    let node = document.createElement('script');
    node.src = src;
    node.type = 'text/javascript';
    node.onload = () => {
      this.init().mergeMap(() => this.checkLoginStatus()).subscribe(this.initRequest, console.warn);
    };

    node.onerror = () => {
      console.error('failed to load FB sdk');
      this.status = ProviderStatuses.ERROR;
    };
    document.getElementsByTagName('head')[ 0 ].appendChild(node);
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
      let albums: Array<Album> = [];
      for (let album of response.data) {
        albums.push(new Album(album.id, pageId, this.type, album.name, album.photo, album.description));
      }
      return albums;
    })));
    return this.initRequest.mergeMap(() => request);
  }

  getPhotos(options: any): Observable<any> {
    let request;
    const handlePhotos = (response) => {
      let photos: Array<Photo> = [];
      for (let photo of response.data) {
        photos.push(new Photo(photos.length + options.offset, photo.images[ 0 ].source, photo.images[ photo.images.length - 1 ].source, photo.name))
      }

      let result: any = { data: photos };

      if (response.paging) {
        response.pointerNext = response.paging.next;
      }

      if (!result.pointerNext) {
        result.complete = true;
      }
      return result;
    };

    if (options.source) {
      request = Observable.defer(() => Observable.fromPromise(this.fb.api(options.source.id + '/photos', 'get', {
        offset: options.offset || 0,
        fields: 'images,picture,name'
      }).then(handlePhotos)));
    }

    if (options.pointerNext) {
      request = this.http.get(options.pointerNext)
        .map(response => response.json())
        .map(handlePhotos);
    }

    return this.initRequest.mergeMap(() => request);
  }

  uploadPhoto(options): Observable<any> {
    let request = Observable.defer(() => Observable.fromPromise(
      this.fb.api(options.uploadDestination.id + '/photos', 'post', {
        url: options.photo.photoUrl,
        caption: options.photo.description
      }).then(response => {
        return response
      }).catch(console.error)
    ));
    return this.initRequest.mergeMap(() => request);
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
