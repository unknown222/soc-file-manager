import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateUploadComponent } from './create-upload.component';

describe('CreateUploadComponent', () => {
  let component: CreateUploadComponent;
  let fixture: ComponentFixture<CreateUploadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateUploadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
