import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpClientJsonpModule} from '@angular/common/http';
import {Router} from '@angular/router';
import {HomeService} from '../../services/home.service';
import {Item} from '../../models/item';
import {AuthService} from '../../services/auth.service';



@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})



export class SearchComponent implements OnInit{
  isAuthenticated = false;
  products: Item[];
  selectedValue = null;
  listOfOption: Array<{ value: string; text: string }> = [];
  nzFilterOption = () => true;



  constructor(private httpClient: HttpClient, private router: Router, public homeService: HomeService, public authService: AuthService) {}

  ngOnInit() {
    this.isAuthenticated = this.authService.getIsAuthenticated();
    console.log(this.isAuthenticated);
  }


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
          const set = new Set(listOfOption);
          console.log(listOfOption);
          this.listOfOption = this.unique(listOfOption);
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
