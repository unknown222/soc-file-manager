import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateAlbumDialogComponent } from './create-album-dialog.component';

describe('CreateAlbumDialogComponent', () => {
  let component: CreateAlbumDialogComponent;
  let fixture: ComponentFixture<CreateAlbumDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateAlbumDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateAlbumDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
