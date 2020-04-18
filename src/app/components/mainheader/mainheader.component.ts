import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Item} from '../../models/item';
import {Router} from '@angular/router';
import {HomeService} from '../../services/home.service';

@Component({
  selector: 'app-mainheader',
  templateUrl: './mainheader.component.html',
  styleUrls: ['./mainheader.component.css']
})
export class MainheaderComponent{
  products: Item[];
  selectedValue = null;
  listOfOption: Array<{ value: string; text: string }> = [];
  nzFilterOption = () => true;
  constructor(private httpClient: HttpClient, private router: Router, private homeService: HomeService) {}

  search(value: string): void {
    this.httpClient
      .get<[Item]>(`http://localhost:8080/search?productType=${value.toLowerCase()}`)
      .subscribe(data => {
        const listOfOption: Array<{ value: string; text: string }> = [];
        console.log(data);
        data.forEach(item => {
          console.log(Object.keys(item), Object.values(item));
          listOfOption.push({
            value: Object.values(item)[1],
            text:  Object.values(item)[1]
          });
          this.products = data;
        });
        this.listOfOption = listOfOption;
      });
  }
  toHomePage(){
    this.router.navigate(['/detail']);
    console.log(this.products);
    console.log(this.selectedValue);
    this.homeService.products = this.products;
    this.homeService.searchItem = this.selectedValue;
  }

  unique(arr){
    const unique = {};
    // tslint:disable-next-line:only-arrow-functions
    arr.forEach(function(item){
      unique[JSON.stringify(item)] = item;
    });
    // tslint:disable-next-line:only-arrow-functions
    arr = Object.keys(unique).map(function(u){
      return JSON.parse(u);
    });
    return arr;
  }

}
