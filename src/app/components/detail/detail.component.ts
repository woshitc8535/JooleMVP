import {Component, OnChanges, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {Item} from '../../models/item';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit{

  projects: Item[];
  constructor() {

  }
  ngOnInit(): void {
  }

  run(e) {
    console.log(e);
  }
}
