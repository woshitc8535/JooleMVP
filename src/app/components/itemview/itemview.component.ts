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
  url: string



  constructor(private productService: ProductService, private router: Router) { }

  ngOnInit(): void {
    this.productService.item = this.project;
    this.url = this.project.url;
  }

  toProductPage(){
    this.productService.item = this.projects[this.index]
    this.router.navigate(['/project']);
  }
}
