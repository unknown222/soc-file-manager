import { Observable } from 'rxjs/Observable';
import { Http } from '@angular/http';
/**
 * Created by Unknown on 6/2/2017.
 */
export interface ApiProvider {
  name: string;
  http: Http;
  login();
  logout();
  checkLoginStatus();
  getInfo(id: string): Observable<any>;
  getPages(userId: string): Observable<any>;
  getAlbums(pageId: string): Observable<any>;
  getPhotos(albumId: string): Observable<any>;
  createAlbum(pageId: string, params: any): Observable<any>;
  uploadPhotos(albumId: string, params): Observable<any>;
  uploadPhoto(albumId: string, photo: any): Observable<any>;
}
