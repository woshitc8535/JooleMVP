import { Injectable } from '@angular/core';
import {Item} from '../models/item';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  public item: Item;

  check: false;

  constructor() { }
}
