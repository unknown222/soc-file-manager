import { Component, Injector, OnInit } from '@angular/core';
import { WorkerService } from '../../core/worker/worker.service';
import { PhotoStorageBrowserComponent } from './photo-storage-browser/photo-storage-browser.component';
import { SidenavPortalService } from '../../ui/sidenav-portal/sidenav-portal.service';
import { Album } from '../../core/social-provider/entities/album';
import { Photo } from '../../core/social-provider/entities/photo';

@Component({
  selector: 'app-create-upload',
  templateUrl: './create-upload.component.html',
  styleUrls: [ './create-upload.component.scss' ]
})
export class CreateUploadComponent implements OnInit {

  uploadDestination: Album = { id: '427189630995683', owner: '422111521503494', provider: 0, name: '9 June 2017', photoUrl: undefined };
  uploadSource: Album = {
    id: 244894685,
    owner: 115923485,
    provider: 1,
    name: 'testAlbumForGroup',
    photoUrl: 'https://pp.userapi.com/c836536/v836536084/4600d/mAl_ZIEzsw0.jpg'
  };
  loadedViewPhotos: Array<Photo> = [];
  uploadConfigs: any;

  constructor(private sideNavPortal: SidenavPortalService,
              private injector: Injector,
              private worker: WorkerService) {
  }

  ngOnInit() {
  }

  start(params) {
    this.worker.start(params);
  }

  browseSource() {
    this.sideNavPortal.openSidenavWithComponent(this.injector, PhotoStorageBrowserComponent, {
      align: 'start',
      resolve: (response) => {
        this.uploadSource = response;
        this.loadedViewPhotos = [];
      }
    });
  }

  browseDestination() {
    this.sideNavPortal.openSidenavWithComponent(this.injector, PhotoStorageBrowserComponent, {
      align: 'end',
      resolve: (response) => {
        this.uploadDestination = response;
      }
    });
  }

}
