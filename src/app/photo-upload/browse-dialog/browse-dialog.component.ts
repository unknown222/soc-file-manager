import { Component, OnInit } from '@angular/core';
import { MdDialog, MdDialogRef } from '@angular/material';
import { SocialProviderService } from '../../core/social-provider/social-provider.service';
import { ApiProvider } from '../../core/social-provider/entities/api-provider';
import { CreateAlbumDialogComponent } from '../create-album-dialog/create-album-dialog.component';
import { Providers } from '../../core/social-provider/entities/providers.enum';

@Component({
  selector: 'app-browse-dialog',
  templateUrl: './browse-dialog.component.html',
  styleUrls: [ './browse-dialog.component.scss' ]
})
export class BrowseDialogComponent implements OnInit {

  albums;
  apiProvider: ApiProvider;

  constructor(public dialogRef: MdDialogRef<BrowseDialogComponent>,
              private dialog: MdDialog,
              public socProvider: SocialProviderService) {
  }

  ngOnInit() {
    this.apiProvider = this.socProvider.getProviderByName(Providers.FB);
    this.apiProvider.getAlbums('/me').subscribe(albums => {
      this.albums = albums;
    })
  }

  selectAlbum(album) {
    this.dialogRef.close(album);
  }

  createAlbum() {
    let dialogRef = this.dialog.open(CreateAlbumDialogComponent);
    dialogRef.afterClosed().subscribe(result => {
      this.apiProvider.getInfo(result.id).subscribe(result => {
        this.albums.push(result);
      })
    });
  }

}
