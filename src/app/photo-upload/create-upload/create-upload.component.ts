import { Component, Injector, OnInit } from '@angular/core';
import { VirtualScrollService } from './virtual-scroll.service';
import { WorkerService } from '../../core/worker/worker.service';
import { MdDialog } from '@angular/material';
import { BrowseDialogComponent } from '../browse-dialog/browse-dialog.component';
import { PhotoStorageBrowserComponent } from '../photo-storage-browser/photo-storage-browser.component';
import { SidenavPortalService } from '../../ui/sidenav-portal/sidenav-portal.service';

@Component({
  selector: 'app-create-upload',
  templateUrl: './create-upload.component.html',
  styleUrls: [ './create-upload.component.scss' ]
})
export class CreateUploadComponent implements OnInit {


  params = {
    from: '1804735613175599',
    to: '1808095376172956',
    photos: {
      from: 0,
      to: 30
    }
  };


  constructor(public vsService: VirtualScrollService,
              private sideNavPortal: SidenavPortalService,
              private injector: Injector,
              private worker: WorkerService,
              private dialog: MdDialog,) {
  }

  ngOnInit() {
  }

  browse() {
    let dialogRef = this.dialog.open(BrowseDialogComponent);
    dialogRef.afterClosed().subscribe(result => {
      this.params.from = result.id;
      this.vsService.initScroll(result);
    });
  }

  start(params) {
    this.worker.start(params);
  }

  browseTo() {
    this.sideNavPortal.openSidenavWithComponent(this.injector, PhotoStorageBrowserComponent, {
      align: 'end',
      resolve: (response) => {
       this.setDestination(response);
      }
    });
  }

  setDestination(response) {
    console.log(response);
  }

}
