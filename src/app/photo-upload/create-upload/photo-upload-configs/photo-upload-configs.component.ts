import { AfterViewChecked, Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-photo-upload-configs',
  templateUrl: './photo-upload-configs.component.html',
  styleUrls: [ './photo-upload-configs.component.scss' ]
})
export class PhotoUploadConfigsComponent implements OnInit {

  @ViewChild('uploadRange') uploadRange: NgForm;
  @Input() configs;
  localForm = {
    from: null,
    to: null
  };

  constructor() {
  }

  ngOnInit() {
    this.uploadRange.valueChanges.subscribe(() => {
      this.configs.from = this.localForm.from - 1;
      this.configs.to = this.localForm.to - 1;
      this.configs.valid = this.uploadRange.valid;
    });
    this.localForm.from = this.configs.from + 1;
    this.localForm.to = this.configs.to + 1;
  }

}
