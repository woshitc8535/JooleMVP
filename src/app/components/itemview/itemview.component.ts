import { Component, OnInit, Input} from '@angular/core';
import {HomeService} from '../../services/home.service';
import {Item} from '../../models/item';

@Component({
  selector: 'app-itemview',
  templateUrl: './itemview.component.html',
  styleUrls: ['./itemview.component.css']
})
export class ItemviewComponent implements OnInit {
  selected = false;
  checked = false;
  @Input() project: Item;



  constructor(private homeService: HomeService) { }

  ngOnInit(): void {

  }
}
