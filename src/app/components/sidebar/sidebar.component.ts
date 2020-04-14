import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  public startYear = 2000;
  public endYear = 2020;
  public rangeValue = [2000, 10000];
  public min: number;
  public max: number;
  constructor() { }

  ngOnInit(): void {
    this.min = this.rangeValue[0];
    this.max = this.rangeValue[1];

  }

}
