import { Component, OnInit } from '@angular/core';
import { WorkerService } from '../../core/worker/worker.service';
import { Photo } from '../../core/social-provider/entities/photo';

@Component({
  selector: 'app-in-progress',
  templateUrl: './in-progress.component.html',
  styleUrls: [ './in-progress.component.scss' ]
})
export class InProgressComponent implements OnInit {

  pause = false;
  photo = new Photo(0, 'https://pp.userapi.com/c836536/v836536084/45cba/vFSJ36e9yD0.jpg',
    'https://pp.userapi.com/c836536/v836536084/45cb7/P_JxKNWZrrE.jpg');

  constructor(public worker: WorkerService) {
  }

  ngOnInit() {
  }

}
