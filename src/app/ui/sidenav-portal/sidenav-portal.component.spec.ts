import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SidenavPortalComponent } from './sidenav-portal.component';

describe('SidenavPortalComponent', () => {
  let component: SidenavPortalComponent;
  let fixture: ComponentFixture<SidenavPortalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SidenavPortalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SidenavPortalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
