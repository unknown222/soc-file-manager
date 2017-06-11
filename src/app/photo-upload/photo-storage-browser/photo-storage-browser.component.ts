import { Component, Input, OnInit } from '@angular/core';
import { SocialProviderService } from '../../core/social-provider/social-provider.service';
import { ApiProvider } from '../../core/social-provider/entities/api-provider';
import { NodeType } from './node-types.enum';
import { Node } from './node';
import { IActionMapping, TreeNode } from 'angular-tree-component';
import 'rxjs/add/operator/toPromise';
import { MdSidenav } from '@angular/material';

@Component({
  selector: 'app-photo-storages-browser',
  templateUrl: './photo-storage-browser.component.html',
  styleUrls: [ './photo-storage-browser.component.scss' ]
})
export class PhotoStorageBrowserComponent implements OnInit {

  @Input() resolve: Function;
  @Input() sidenav: MdSidenav;

  nodes: Array<Node> = [];

  actionMapping: IActionMapping = {
    mouse: {
      dblClick: (tree, node, $event) => {
        if (node.data.type !== NodeType.ALBUM && node.data.type !== NodeType.WALL) {
          node.expand();
        }

        if (node.data.type === NodeType.ALBUM || node.data.type === NodeType.WALL) {
          this.resolve(node.data.entity);
          this.sidenav.close();
        }
      }
    }
  };

  options = {
    getChildren: (node: TreeNode) => {
      return this.fetchMoreData(node);
    },
    actionMapping: this.actionMapping
  };


  constructor(private socProvider: SocialProviderService) {
  }

  ngOnInit() {
    for (let provider of  this.socProvider.getProviders()) {
      this.nodes.push(new Node(NodeType.PROVIDER, provider.name, provider));
    }
  }

  fetchMoreData(node: TreeNode) {
    let provider;
    switch (node.data.type) {
      case NodeType.PROVIDER:
        provider = node.data.entity;
        return provider.getPagesWithLoadingPermissions().toPromise().then(result => {
          let nodes = [];
          for (let page of result) {
            nodes.push(new Node(NodeType.PAGE, page.name, page));
          }
          return nodes;
        });
      case NodeType.PAGE:
        provider = this.socProvider.getProvider(node.data.entity.provider);
        return provider.getAlbums(node.data.entity.id).toPromise().then(result => {
          let nodes = [];
          for (let album of result) {
            nodes.push(new Node(NodeType.ALBUM, album.name, album));
          }
          return nodes;
        });
      default:
        console.warn('NodeType not recognized')
    }

  }

}
