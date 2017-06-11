import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PhotoStorageBrowserComponent } from './photo-storage-browser.component';

describe('PhotoStorageBrowserComponent', () => {
  let component: PhotoStorageBrowserComponent;
  let fixture: ComponentFixture<PhotoStorageBrowserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PhotoStorageBrowserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhotoStorageBrowserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
