import {Project} from './project';
import {Item} from './item';

export interface Current {
  id: number;
  project: Project;
  product: Item;
}
