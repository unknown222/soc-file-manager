import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadPhotosGuideComponent } from './upload-photos-guide.component';

describe('UploadPhotosGuideComponent', () => {
  let component: UploadPhotosGuideComponent;
  let fixture: ComponentFixture<UploadPhotosGuideComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UploadPhotosGuideComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadPhotosGuideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
