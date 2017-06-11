import { ComponentFactoryResolver, Injectable, ViewContainerRef } from '@angular/core';
import { MdSidenav } from '@angular/material';

@Injectable()
export class SidenavPortalService {

  sidenav: MdSidenav;
  viewRef: ViewContainerRef;
  componentRef;

  constructor() {
  }

  registerSidenav(sidenav) {
    this.sidenav = sidenav;
  }

  registerViewContainerRef(viewRef) {
    this.viewRef = viewRef;
  }

  openSidenavWithComponent(compInjector, component, options?) {
    let timeout;


    if (!this.componentRef) {
      let componentFactory = compInjector.get(ComponentFactoryResolver).resolveComponentFactory(component);
      let componentRef = this.viewRef.createComponent(componentFactory);
      componentRef.instance[ 'sidenav' ] = this.sidenav;
      this.componentRef = componentRef;
      let destroySub = this.sidenav.onClose.subscribe(() => {
        componentRef.destroy();
        destroySub.unsubscribe();
        this.componentRef = undefined;
      });

      if (options) {
        if (options.align && options.align !== this.sidenav.align) {
          timeout = 150;
          this.sidenav.align = options.align;
        }
        if (options.resolve) {
          componentRef.instance[ 'resolve' ] = options.resolve;
        }
      }

    }

    setTimeout(() => {
      this.sidenav.open();
    }, timeout);

    return this.componentRef;
  }

}
