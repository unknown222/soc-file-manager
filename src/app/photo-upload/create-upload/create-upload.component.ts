import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { WorkerService } from '../../core/worker/worker.service';
import { PhotoStorageBrowserComponent } from './photo-storage-browser/photo-storage-browser.component';
import { SidenavPortalService } from '../../ui/sidenav-portal/sidenav-portal.service';
import { Album } from '../../core/social-provider/entities/album';
import { Photo } from '../../core/social-provider/entities/photo';
import { MdSnackBar } from '@angular/material';
import { PhotoScrollerComponent } from './photo-scroller/photo-scroller.component';
import { ProviderNames } from '../../core/social-provider/entities/provider-names';

@Component({
  selector: 'app-create-upload',
  templateUrl: './create-upload.component.html',
  styleUrls: [ './create-upload.component.scss' ]
})
export class CreateUploadComponent implements OnInit {

  @ViewChild(PhotoScrollerComponent) photoScrollerComponent: PhotoScrollerComponent;
  uploadDestination: Album;
  uploadSource: Album;
  loadedViewPhotos: Array<Photo> = [];
  providerNames =  ProviderNames;

  uploadConfigs: any = {
    from: 0,
    to: 14,
    copyDescription: true,
    isValid: true
  };

  constructor(private sideNavPortal: SidenavPortalService,
              private injector: Injector,
              private worker: WorkerService,
              public snackBar: MdSnackBar) {
  }

  ngOnInit() {
  }

  start() {
    let options = {
      uploadSource: this.uploadSource,
      uploadDestination: this.uploadDestination,
      uploadedData: this.loadedViewPhotos,
      uploadConfigs: this.uploadConfigs
    };
    let message = `Upload from ${options.uploadSource.name} to ${options.uploadDestination.name} has been started`;
    this.worker.start(options);
    this.snackBar.open(message, null, {
      duration: 1000
    });
  }

  browseSource() {
    this.sideNavPortal.openSidenavWithComponent(this.injector, PhotoStorageBrowserComponent, {
      align: 'start',
      componentProperties: {
        action: 'source'
      },
      resolve: (response) => {
        this.uploadSource = response;
        this.loadedViewPhotos = [];
      }
    });
  }

  browseDestination() {
    this.sideNavPortal.openSidenavWithComponent(this.injector, PhotoStorageBrowserComponent, {
      align: 'end',
      componentProperties: {
        action: 'destination'
      },
      resolve: (response) => {
        this.uploadDestination = response;
      }
    });
  }

  fixVirtualScrollerTop() {
    this.photoScrollerComponent.fixVirtualScrollTopValue();
  }

}
