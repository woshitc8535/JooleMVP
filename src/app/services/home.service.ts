import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {Item} from '../models/item';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  item = ''
  constructor() { }

  getItems(): any[] {
    return [];
  }
}
