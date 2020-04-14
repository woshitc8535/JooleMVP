import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-itemview',
  templateUrl: './itemview.component.html',
  styleUrls: ['./itemview.component.css']
})
export class ItemviewComponent implements OnInit {
  selected = false;
  checked = false;
  manufacturer = 'Big Ass';
  series = 'Haiku H';
  model = 'S3150-S0-BC-04-01-C-0';

  constructor() { }

  ngOnInit(): void {
  }

}
