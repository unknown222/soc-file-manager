import { Component, OnInit } from '@angular/core';
import { MdDialogRef } from '@angular/material';
import { SocialProviderService } from '../../core/social-provider/social-provider.service';
import { ApiProvider } from '../../core/social-provider/entities/api-provider';
import { Providers } from '../../core/social-provider/entities/providers.enum';

@Component({
  selector: 'app-create-album-dialog',
  templateUrl: './create-album-dialog.component.html',
  styleUrls: ['./create-album-dialog.component.scss']
})
export class CreateAlbumDialogComponent implements OnInit {

  params = {
    name: null
  };

  apiProvider: ApiProvider;

  constructor(public dialogRef: MdDialogRef<CreateAlbumDialogComponent>,
              public socProvider: SocialProviderService) { }

  ngOnInit() {
  }

  createAlbum(params) {
    this.apiProvider = this.socProvider.getProvider(Providers.FB);
    this.apiProvider.createAlbum('/me', params).subscribe(result => {
      this.dialogRef.close(result);
    })
  }

}
