/**
 * Created by Unknown on 6/2/2017.
 */
import { Injectable } from '@angular/core';
import { FacebookService, InitParams, LoginOptions, LoginResponse } from 'ngx-facebook';
import { PromiseObservable } from 'rxjs/observable/PromiseObservable';
import { Observable } from 'rxjs/Observable';
import { ApiProvider } from './entities/api-provider';
import { Http } from '@angular/http';

@Injectable()
export class ApiFbProviderService implements ApiProvider {

  name: string = 'FB';
  http: Http;
  constructor(private fb: FacebookService, http: Http) {
    this.http = http;
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
      scope: 'public_profile,user_photos,pages_show_list,publish_actions,user_managed_groups',
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

  getInfo(id: string) {
    let promise = this.fb.api(id).then(response => {
      return response;
    }).catch(e => {
      console.log(e);
    });
    return PromiseObservable.create(promise);
  }

  getPages(userId: string): Observable<any> {
    throw new Error('Method not implemented.');
  }

  getAlbums(pageId: string): Observable<any> {
    let promise = this.fb.api(pageId + '/albums').then(response => {
      return response.data;
    }).catch(e => {
      console.log(e);
    });
    return PromiseObservable.create(promise);
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
}
