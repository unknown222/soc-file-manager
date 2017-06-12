import { ChangeDetectorRef, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-photo-upload',
  templateUrl: './photo-upload.component.html',
  styleUrls: ['./photo-upload.component.scss']
})
export class PhotoUploadComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  onTabChange() {
    console.log("change");
  }

}
