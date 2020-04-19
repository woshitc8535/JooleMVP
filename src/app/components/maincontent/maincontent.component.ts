import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {HomeService} from '../../services/home.service';
import {Item} from '../../models/item';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-maincontent',
  templateUrl: './maincontent.component.html',
  styleUrls: ['./maincontent.component.css']
})
export class MaincontentComponent implements OnInit, OnChanges {
  public projects: Item[];
  public project: string;
  subscription: Subscription;

  constructor(private homeService: HomeService) {
    this.subscription = this.homeService.getProductsListener().subscribe( products => {
      if (products) {
        this.projects = products;
        console.log(this.projects);
        return true;
      }
      else {
        return false;
      }
    });
  }

  ngOnInit(): void {
    this.project = this.homeService.searchItem;
    this.projects = this.homeService.products.filter(item => {
      return item.productType === this.project;
      }
    );
  }

  ngOnChanges(changes: SimpleChanges): void {
  }
}
