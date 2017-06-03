import { Component, OnInit } from '@angular/core';
import { MdDialogRef } from '@angular/material';
import { SocialProviderService } from '../../core/social-provider/social-provider.service';
import { ApiProvider } from '../../core/social-provider/entities/api-provider';

@Component({
  selector: 'app-browse-dialog',
  templateUrl: './browse-dialog.component.html',
  styleUrls: [ './browse-dialog.component.scss' ]
})
export class BrowseDialogComponent implements OnInit {

  albums;
  apiProvider: ApiProvider;

  constructor(public dialogRef: MdDialogRef<BrowseDialogComponent>,
              public socProvider: SocialProviderService) {
  }

  ngOnInit() {
    this.apiProvider = this.socProvider.getProviderByName('FB');
    this.apiProvider.getAlbums('/me').subscribe(albums => {
      this.albums = albums;
    })
  }

  selectAlbum(album) {
    this.dialogRef.close(album);
  }

}
