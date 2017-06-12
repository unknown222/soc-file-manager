import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PhotoScrollerComponent } from './photo-scroller.component';

describe('PhotoScrollerComponent', () => {
  let component: PhotoScrollerComponent;
  let fixture: ComponentFixture<PhotoScrollerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PhotoScrollerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhotoScrollerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
