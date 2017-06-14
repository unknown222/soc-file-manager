import { Component, OnInit, ViewChild } from '@angular/core';
import { WorkerService } from '../core/worker/worker.service';
import { MdTabChangeEvent } from '@angular/material';
import { CreateUploadComponent } from './create-upload/create-upload.component';

@Component({
  selector: 'app-photo-upload',
  templateUrl: './photo-upload.component.html',
  styleUrls: [ './photo-upload.component.scss' ]
})
export class PhotoUploadComponent implements OnInit {

  @ViewChild(CreateUploadComponent) createUpload: CreateUploadComponent;

  constructor(public worker: WorkerService) {
  }

  ngOnInit() {
  }

  onTabChange(event: MdTabChangeEvent) {
    if (event.index === 0) {
     this.createUpload.fixVirtualScrollerTop();
    }
  }


}
