import { Component, OnInit } from '@angular/core';
import {HomeService} from '../../services/home.service';
import {Item} from '../../models/item';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  public startYear = 2000;
  public endYear = 2020;
  private project: string;
  private projects: Item[];
  public radioValue = 'Product'
  public radioType = 'Commercial';
  public radioApp = 'Indoor';
  public radioML = 'Roof';
  public radioAcc = 'With light';

  isVisible = false;
  isConfirmLoading = false;


  ts = [{filterName: 'Air flow (CFM)', filterRange: [2000, 10000], max: 10000, min: 2000},
    {filterName: 'Max power (W)', filterRange: [9.84, 96.52], max: 96.52, min: 9.84},
    {filterName: 'Sound at max speed (dBA)', filterRange: [20, 80], max: 80, min: 20},
    {filterName: 'Fan sweep diameter (in)', filterRange: [18, 96], max: 96, min: 18}];

  ps = [{filterName: 'Firm', filterRange: [0, 10], max: 10, min: 0},
    {filterName: 'Global', filterRange: [0, 1492], max: 1492, min: 0}];


  constructor(private homeService: HomeService) { }

  ngOnInit(): void {
    this.project = this.homeService.searchItem;
    this.projects = this.homeService.products.filter(item => {
        return item.productType === this.project;
      }
    );
    console.log(this.projects);
  }

  showModal(): void {
    this.isVisible = true;
  }

  handleOk(): void {
    this.isConfirmLoading = true;
    setTimeout(() => {
      this.isVisible = false;
      this.isConfirmLoading = false;
    }, 3000);
  }

  handleCancel(): void {
    this.isVisible = false;
  }
}
