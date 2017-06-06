import { Injectable } from '@angular/core';
import { ScrollObservableService } from 'od-virtualscroll';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { ConnectableObservable } from 'rxjs/Rx';
import { Observer } from 'rxjs/Observer';
import { Subscription } from 'rxjs/Subscription';
import { SocialProviderService } from '../../core/social-provider/social-provider.service';

@Injectable()
export class VirtualScrollService {

  constructor(private socService: SocialProviderService,
              private _scrollObs: ScrollObservableService,
              private http: Http,) {
  }

  photos: any[] = [];
  nextPhotos;

  private _scrollEnd$ = this._scrollObs.scrollWin$.filter(([ scrollWin ]) => scrollWin.visibleEndRow !== -1 && scrollWin.visibleEndRow === scrollWin.numVirtualRows - 1);
  options$ = Observable.of({ itemWidth: 202, itemHeight: 202, numAdditionalRows: 1 });

  data$: ConnectableObservable<any[]> = Observable.create((observer: Observer<any[]>) => {
    let curData: any[] = this.photos;
    const subs: Subscription[] = [];

    const fetchData = () => this.http.get(this.nextPhotos)
      .map(response => response.json());

    const emitNext = () => {
      fetchData().toPromise().then((responce) => {
        Array.prototype.push.apply(curData, responce.data);
        this.nextPhotos = responce.paging.next;

        observer.next(curData);
      }).catch(err => observer.error(err));
    };


    subs.push(this._scrollEnd$.subscribe(([ scrollWin ]) => {
      console.log('end');
      if (this.nextPhotos) {
        emitNext();
        this.nextPhotos = undefined;
      }
    }));

    observer.next(curData);
    return function unsubscribe() {
      subs.forEach(sub => sub.unsubscribe());
    };
  }).publish();

  initScroll(album) {
    let provider = this.socService.getProviderByName('FB');
    provider.getPhotos(album.id).subscribe(response => {
      Array.prototype.push.apply(this.photos, response.data);
      this.nextPhotos = response.paging.next;
      this.data$.connect();
    });
  }

}
