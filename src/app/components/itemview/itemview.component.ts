import { Component, OnInit, Input} from '@angular/core';
import {HomeService} from '../../services/home.service';
import {Item} from '../../models/item';
import {ProductService} from '../../services/product.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-itemview',
  templateUrl: './itemview.component.html',
  styleUrls: ['./itemview.component.css']
})
export class ItemviewComponent implements OnInit {
  selected = false;
  checked = false;
  @Input() project: Item;
  @Input() index: number;
  @Input() projects: Item[];
  url: string;

  public itemList: Item[];



  constructor(private productService: ProductService, private router: Router) { }

  ngOnInit(): void {
    this.productService.item = this.project;
    this.url = this.project.url;
    console.log(this.project);
  }

  toProductPage(){
    this.productService.item = this.projects[this.index];
    this.router.navigate(['/project']);
  }

  addToCompare() {
    if (this.checked) {
      this.itemList = JSON.parse( sessionStorage.getItem('compareList'));
      console.log(this.itemList);
      this.itemList.push(this.project);
      sessionStorage.setItem('compareList', JSON.stringify(this.itemList));
    }
    else {
      this.itemList = JSON.parse( sessionStorage.getItem('compareList'));
      this.itemList = this.itemList.filter(item => {
        console.log(item.manufacturer !== this.project.manufacturer);
        return item.manufacturer !== this.project.manufacturer;
      })
      sessionStorage.setItem('compareList', JSON.stringify(this.itemList));
    }
  }
}
