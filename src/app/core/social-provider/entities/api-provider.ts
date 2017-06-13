import { Observable } from 'rxjs/Observable';
import { Http } from '@angular/http';
import { Providers } from './providers.enum';
import { ProviderStatuses } from './provider-statuses.enum';
import { User } from './user';
import { PageWithLoadingPermissions } from './page-with-loading-permissons';
import { Album } from './album';
/**
 * Created by Unknown on 6/2/2017.
 */
export interface ApiProvider {
  name: string;
  type: Providers;
  status: ProviderStatuses;
  init(): Observable<any>;
  login(): Observable<any>;
  logout(): Observable<any>;
  checkLoginStatus(): Observable<any>;
  getUserInfo(): Observable<User>;
  getPagesWithLoadingPermissions(): Observable<Array<PageWithLoadingPermissions>>;
  getAlbums(pageId: any): Observable<Array<Album>>;
  getPhotos(options: any): Observable<any>;
  uploadPhoto(options): Observable<any>;
}
