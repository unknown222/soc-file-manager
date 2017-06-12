import { NodeType } from './node-types.enum';
import { Providers } from '../../../core/social-provider/entities/providers.enum';
/**
 * Created by Unknown on 6/11/2017.
 */
export class Node {
  type: NodeType;
  name: string;
  entity: any;
  children: Array<Node>;
  hasChildren: boolean;

  constructor(type: NodeType, name: string, entity: any, children?: Array<Node>) {
    this.type = type;
    this.name = name;
    this.entity = entity;
    this.children = children;
    if(this.type !== NodeType.ALBUM && this.type !== NodeType.WALL) {
      this.hasChildren = true;
    }
  }
}
