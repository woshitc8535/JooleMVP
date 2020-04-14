import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-maincontent',
  templateUrl: './maincontent.component.html',
  styleUrls: ['./maincontent.component.css']
})
export class MaincontentComponent implements OnInit {
  itemList = [1, 2, 3, 4, 5];
  constructor() { }

  ngOnInit(): void {
  }

}
