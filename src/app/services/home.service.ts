import { Injectable } from '@angular/core';
import {Item} from '../models/item';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';

const BACKEND_URL = environment.apiUrl + '/getAllProduct';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  public products: Item[];
  public searchItem: string;
  constructor(private Http: HttpClient) { }
}
