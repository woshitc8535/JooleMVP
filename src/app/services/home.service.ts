import { Injectable } from '@angular/core';
import {Item} from '../models/item';
import {environment} from '../../environments/environment';

const BACKEND_URL = environment.apiUrl + '/getAllProduct';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  public products: Item[];
  public searchItem: string;
  constructor() { }
}
