import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PhotoUploadConfigsComponent } from './photo-upload-configs.component';

describe('PhotoUploadConfigsComponent', () => {
  let component: PhotoUploadConfigsComponent;
  let fixture: ComponentFixture<PhotoUploadConfigsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PhotoUploadConfigsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhotoUploadConfigsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
