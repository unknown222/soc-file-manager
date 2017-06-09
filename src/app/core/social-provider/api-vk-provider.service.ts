import { ApiProvider } from './entities/api-provider';
/**
 * Created by Unknown on 6/2/2017.
 */
declare const VK;
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Providers } from './entities/providers.enum';
import { ProviderStatuses } from './entities/provider-statuses.enum';
import { AsyncSubject } from 'rxjs/AsyncSubject';
import 'rxjs/add/observable/fromPromise';
import 'rxjs/add/observable/defer';
import 'rxjs/add/operator/mergeMap';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ApiVkProviderService implements ApiProvider{


  name = Providers.VK;
  status = ProviderStatuses.UNDEFINED;
  initRequest = new AsyncSubject();

  http: Http;

  constructor(http: Http) {
    this.init();
  }

  init() {

    VK.init({
      apiId: 6066707
    });

    VK.Auth.getLoginStatus(result => {
      console.log(result);
    })
  }

  login() {
  }

  logout() {
  }

  checkLoginStatus() {
  }

  getUserInfo(): Observable<any> {
    return undefined;
  }

  getInfo(id: string): Observable<any> {
    return undefined;
  }

  getPages(userId: string): Observable<any> {
    return undefined;
  }

  getAlbums(pageId: string): Observable<any> {
    return undefined;
  }

  getPhotos(albumId: string): Observable<any> {
    return undefined;
  }

  createAlbum(pageId: string, params: any): Observable<any> {
    return undefined;
  }

  uploadPhotos(albumId: string, params): Observable<any> {
    return undefined;
  }

  uploadPhoto(albumId: string, photo: any): Observable<any> {
    return undefined;
  }

}
