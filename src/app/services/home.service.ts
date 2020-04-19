import { Injectable } from '@angular/core';
import {Item} from '../models/item';
import {environment} from '../../environments/environment';
import {Subject} from 'rxjs';

const BACKEND_URL = environment.apiUrl + '/getAllProduct';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  public products: Item[];
  public searchItem: string;
  constructor() { }

  productsListener = new Subject<any>();

  getProductsListener() {
    return this.productsListener.asObservable();
  }

  send() {
    this.productsListener.next(this.products);
  }
}

