import { Observable } from 'rxjs/Observable';
/**
 * Created by Unknown on 6/2/2017.
 */
export interface ApiProvider {
  name: string;
  login();
  logout();
  checkLoginStatus();
  getPages(userId: number | string): Observable<any>;
  getAlbums(pageId: number | string): Observable<any>;
  getPhotos(albumId: number | string): Observable<any>;
  createAlbum(pageId: number, ...params): Observable<any>;
  uploadPhoto(albumId: number, ...params): Observable<any>;
}
