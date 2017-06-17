import { ApiProvider } from './entities/api-provider';
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
import { Photo } from './entities/photo';
/**
 * Created by Unknown on 6/2/2017.
 */
declare const VK;

@Injectable()
export class ApiVkProviderService implements ApiProvider {
  name = ProviderNames[ Providers.VK ];
  type = Providers.VK;
  status = ProviderStatuses.UNDEFINED;
  initRequest = new AsyncSubject();

  constructor(private http: Http, private zone: NgZone) {
    this.loadScript('https://vk.com/js/api/openapi.js?146');
  }

  loadScript(src) {
    let node = document.createElement('script');
    node.src = src;
    node.type = 'text/javascript';
    node.onload = () => {
      this.init().mergeMap(() => this.checkLoginStatus()).subscribe(this.initRequest, console.warn);
    };
    document.getElementsByTagName('head')[ 0 ].appendChild(node);
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
        this.zone.run(() => {
          observer.next(response);
          observer.complete();
        });

      }, environment.vkAppConfig.loginOptions);
    });
  }

  logout() {
    return Observable.create(observer => {
      VK.Auth.logout(response => {
        this.status = ProviderStatuses.INIT;
        this.zone.run(() => {
          observer.next(response);
          observer.complete();
        });
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
          this.zone.run(() => {
            observer.next(pagesWithLoadingPermissions);
          });
        }
        observer.complete();
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
            albums.push(new Album(album.aid, pageId, this.type, album.title, album.thumb_src, album.description));
          }
          this.zone.run(() => {
            observer.next(albums);
          });
        }
        observer.complete();
      });
    });
    return this.initRequest.mergeMap(() => request);
  }

  getPhotos(options: any): Observable<any> {
    const handlePhotos = (response) => {
      let photos: Array<Photo> = [];
      for (let photo of response) {
        let photoUrl = photo.src_xxxbig || photo.src_xxbig || photo.src_xbig || photo.src_big || photo.src || photo.src_small;
        let thumbUrl = photo.src_big || photo.src || photo.src_small;
        photos.push(new Photo(photos.length + options.offset, photoUrl, thumbUrl, photo.text))
      }

      let result: any = { data: photos };
      if (photos.length < 1) {
        result.complete = true;
      }

      return result;
    };

    let request = Observable.create(observer => {
      let requestOptions = {
        owner_id: -options.source.owner,
        album_id: options.source.id,
        count: 25,
        extended: 1,
        offset: options.offset
      };

      if (!requestOptions.offset) delete requestOptions[ 'offset' ];
      if (!requestOptions.owner_id) delete requestOptions[ 'owner_id' ];

      VK.Api.call('photos.get', requestOptions, response => {
        if (response.response) {
          this.zone.run(() => {
            observer.next(handlePhotos(response.response));
          });
        }
        observer.complete();
      });
    });


    return this.initRequest.mergeMap(() => request);
  }

  uploadPhoto(options): Observable<any> {
    let request = Observable.create(observer => {

      let uploadUrl;

      let getUploadServerOptions = {
        album_id: options.destination.id,
        group_id: options.destination.owner
      };
      if (!getUploadServerOptions.group_id) delete getUploadServerOptions[ 'group_id' ];

      const uploadToServer = (blob) => {
        console.log(uploadUrl);
        console.log(blob);

        let formData = new FormData();
        formData.append('photo', blob);

        let xhr = new XMLHttpRequest();
        xhr.open('POST', uploadUrl, true);
        xhr.onload = xhr.onerror = function () {
          console.log(xhr.responseText)
          // тут будет ответ от ВК, который надо использовать в сохранении фото в альбом или на стену
        };
        xhr.send(formData);

        observer.next(null);
        observer.complete();
      };


      const uploadPhoto = () => {
        let canvas = document.createElement('canvas');
        let image = new Image();
        image.crossOrigin = 'Anonymous';
        image.src = options.photo.photoUrl;
        image.onload = (event) => {
          canvas.getContext('2d').drawImage(image, 0, 0);
          canvas.toBlob(uploadToServer, 'image/jpeg', 0.85);
        };
      };


      VK.Api.call('photos.getUploadServer', getUploadServerOptions, response => {
        if (response.response) {
          console.log(response.response);
          uploadUrl = response.response.upload_url;
          uploadPhoto();
        }
      });
    });
    return this.initRequest.mergeMap(() => request);
  }

}
