import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BrowseDialogComponent } from './browse-dialog.component';

describe('BrowseDialogComponent', () => {
  let component: BrowseDialogComponent;
  let fixture: ComponentFixture<BrowseDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BrowseDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BrowseDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
