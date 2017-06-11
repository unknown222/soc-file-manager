import { ApiProvider } from './entities/api-provider';
/**
 * Created by Unknown on 6/2/2017.
 */
declare const VK;
import { Injectable, NgZone } from '@angular/core';
import { Http } from '@angular/http';
import { Providers } from './entities/providers.enum';
import { ProviderStatuses } from './entities/provider-statuses.enum';
import { AsyncSubject } from 'rxjs/AsyncSubject';
import 'rxjs/add/observable/fromPromise';
import 'rxjs/add/observable/defer';
import 'rxjs/add/operator/mergeMap';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../../environments/environment';
import { User } from './entities/user';
import { PageWithLoadingPermissions } from './entities/page-with-loading-permissons';
import { ProviderNames } from './entities/provider-names';
import { Album } from './entities/album';

@Injectable()
export class ApiVkProviderService implements ApiProvider {
  name = ProviderNames[ Providers.VK ];
  type = Providers.VK;
  status = ProviderStatuses.UNDEFINED;
  initRequest = new AsyncSubject();

  http: Http;

  constructor(http: Http, private zone: NgZone) {
    this.init().mergeMap(() => this.checkLoginStatus()).subscribe(this.initRequest);
  }

  init() {
    return Observable.create(observer => {
      if (environment.vkAppConfig) {
        try {
          VK.init(environment.vkAppConfig.initParams);
          this.status = ProviderStatuses.INIT;
          observer.next('success');
          observer.complete();
        } catch (e) {
          this.status = ProviderStatuses.ERROR;
          observer.error('Error on init vk api');
        }

      } else {
        this.status = ProviderStatuses.ERROR;
        observer.error('No vk api configs for provider');
      }
    });

  }

  checkLoginStatus() {
    return Observable.create(observer => {
      VK.Auth.getLoginStatus(response => {
        if (response.status === 'connected') {
          this.status = ProviderStatuses.CONNECTED;
        }
        observer.next(response);
        observer.complete();
      });

    });
  }

  login() {
    return Observable.create(observer => {
      VK.Auth.login(response => {
        if (response.status === 'connected') {
          this.status = ProviderStatuses.CONNECTED;
        }
        observer.next(response);
        observer.complete();
      }, environment.vkAppConfig.loginOptions);
    });
  }

  logout() {
    return Observable.create(observer => {
      VK.Auth.logout(response => {
        this.status = ProviderStatuses.INIT;
        observer.next(response);
        observer.complete();
      });
    });
  }

  getUserInfo(): Observable<any> {
    let request = Observable.create(observer => {
      VK.Api.call('users.get', { fields: 'photo_50' }, response => {
        if (response.response && response.response[ 0 ]) {
          let vkUser = response.response[ 0 ];
          let user = new User(vkUser.uid, vkUser.first_name + ' ' + vkUser.last_name, vkUser.photo_50);
          this.zone.run(() => {
            observer.next(user);
            observer.complete();
          });
        }
        else {
          observer.error(response);
        }
      });
    });
    return this.initRequest.mergeMap(() => request);
  }

  getPagesWithLoadingPermissions(): Observable<Array<PageWithLoadingPermissions>> {
    let request = Observable.create(observer => {
      VK.Api.call('groups.get', { extended: true, filter: 'admin', fields: 'description' }, response => {
        let pagesWithLoadingPermissions: Array<PageWithLoadingPermissions> = [ new PageWithLoadingPermissions(undefined, this.type, 'My page') ];
        if (response.response) {
          for (let group of response.response) {
            if (group instanceof Object) {
              pagesWithLoadingPermissions.push(new PageWithLoadingPermissions(group.gid, this.type, group.name, group.photo, group.description));
            }
          }
        }

        this.zone.run(() => {
          observer.next(pagesWithLoadingPermissions);
          observer.complete();
        });
      });
    });
    return this.initRequest.mergeMap(() => request);
  }

  getAlbums(pageId: any): Observable<Array<Album>> {
    let request = Observable.create(observer => {
      let options = { owner_id: -pageId, need_covers: 1 };
      if (!options.owner_id) delete options[ 'owner_id' ];

      VK.Api.call('photos.getAlbums', options, response => {
        let albums: Array<Album> = [];
        if (response.response) {
          for (let album of response.response) {
            albums.push(new Album(album.aid, this.type, album.title, album.thumb_src, album.description));
          }
        }

        this.zone.run(() => {
          observer.next(albums);
          observer.complete();
        });
      });
    });
    return this.initRequest.mergeMap(() => request);
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
