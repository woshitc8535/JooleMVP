import { Component, OnInit } from '@angular/core';
import {HomeService} from '../../services/home.service';
import {Item} from '../../models/item';

@Component({
  selector: 'app-maincontent',
  templateUrl: './maincontent.component.html',
  styleUrls: ['./maincontent.component.css']
})
export class MaincontentComponent implements OnInit {
  public projects: Item[];
  private project: string;
  constructor(private homeService: HomeService) { }

  ngOnInit(): void {
    this.project = this.homeService.searchItem;
    this.projects = this.homeService.products.filter(item => {
        // return Object.values(item)[1] === this.project;
      return item.productType === this.project;
      }
    );
    console.log(this.projects);
  }
}
