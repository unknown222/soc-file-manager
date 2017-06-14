import { ChangeDetectorRef, Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ConnectableObservable } from 'rxjs/Rx';
import { Observer } from 'rxjs/Observer';
import { Subscription } from 'rxjs/Subscription';
import { IVirtualScrollWindow, ScrollObservableService, SetScrollTopCmd } from 'od-virtualscroll';
import { SocialProviderService } from '../../../core/social-provider/social-provider.service';
import { ApiProvider } from '../../../core/social-provider/entities/api-provider';
import { Subject } from 'rxjs/Subject';

@Component({
  selector: 'app-photo-scroller',
  templateUrl: './photo-scroller.component.html',
  styleUrls: [ './photo-scroller.component.scss' ]
})
export class PhotoScrollerComponent implements OnInit, OnChanges {

  @Input() data;
  @Input() photoSource;
  provider: ApiProvider;
  pointerNext: string;
  complete: boolean;
  currentScrollTop;
  initLoading: boolean;

  scrollObserver: ConnectableObservable<any[]>;
  options = Observable.of({ itemWidth: 250, itemHeight: 250, numAdditionalRows: 1 });

  private _scrollEnd$ = this._scrollObs.scrollWin$.filter(([ scrollWin ]) => scrollWin.visibleEndRow !== -1 && scrollWin.visibleEndRow === scrollWin.numVirtualRows - 1);
  scrollTop$: Subject<SetScrollTopCmd> = new Subject();
  resize$: Subject<any> = new Subject();

  constructor(private chRef: ChangeDetectorRef,
              private socService: SocialProviderService,
              private _scrollObs: ScrollObservableService) {
  }

  ngOnInit() {

  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.photoSource.currentValue !== changes.photoSource.previousValue) {
      this.scrollObserver = undefined;
      this.init();
    }
  }

  init() {

    const initObserver = () => {
      this.scrollObserver = Observable.create((observer: Observer<any[]>) => {
        const subs: Subscription[] = [];

        const emitNext = () => {
          if (this.pointerNext) {
            this.provider.getPhotos({
              pointerNext: this.pointerNext,
              offset: this.data[ this.data.length - 1 ].index + 1
            }).subscribe(result => {
              Array.prototype.push.apply(this.data, result.data);
              this.pointerNext = result.pointerNext;
              this.complete = result.complete;
              observer.next(this.data);
            });
          } else {
            this.provider.getPhotos({ source: this.photoSource, offset: this.data[ this.data.length - 1 ].index + 1 }).subscribe(result => {
              Array.prototype.push.apply(this.data, result.data);
              this.complete = result.complete;
              observer.next(this.data);
            });
          }
        };

        subs.push(this._scrollEnd$.subscribe(([ scrollWin ]) => {
          if (!this.complete) {
            emitNext();
          }
        }));

        this.scrollTop$.next(new SetScrollTopCmd(0));
        observer.next(this.data);

        return function unsubscribe() {
          subs.forEach(sub => sub.unsubscribe());
        };
      }).publish();
    };

    if (this.photoSource) {

      this.provider = this.socService.getProvider(this.photoSource.provider);
      this.initLoading = true;
      this.provider.getPhotos({ source: this.photoSource, offset: 0 }).subscribe(result => {
        Array.prototype.push.apply(this.data, result.data);
        this.pointerNext = result.pointerNext;
        this.complete = result.complete;
        this.initLoading = false;
        if (this.data.length > 0) {
          initObserver();
          this.chRef.detectChanges();
          this.scrollObserver.connect();
        }
      });

      this._scrollObs.scrollWin$.subscribe((scrollWin: Array<IVirtualScrollWindow>) => {
        this.currentScrollTop = scrollWin[ 0 ].scrollTop;
      });

    }
  }

  fixVirtualScrollTopValue() {
    this.scrollTop$.next(new SetScrollTopCmd(this.currentScrollTop));
    this.resize$.next(null);
  }

}
