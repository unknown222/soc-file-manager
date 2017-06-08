import { Component, OnInit } from '@angular/core';
import { SocialProviderService } from '../core/social-provider/social-provider.service';
import { DomSanitizer } from '@angular/platform-browser';
import { MdIconRegistry } from '@angular/material';
import 'rxjs/add/observable/range';
import 'rxjs/add/operator/reduce';
import 'rxjs/add/operator/toPromise';
import { Providers } from '../core/social-provider/entities/providers.enum';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: [ './home.component.scss' ]
})
export class HomeComponent implements OnInit {

  constructor(public socProvider: SocialProviderService) {

  }

  ngOnInit() {

  }




}
