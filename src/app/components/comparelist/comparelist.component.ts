import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import {Item} from '../../models/item';

@Component({
  selector: 'app-comparelist',
  templateUrl: './comparelist.component.html',
  styleUrls: ['./comparelist.component.css']
})
export class ComparelistComponent implements OnInit {
  listOfIndexDes = ['Manufacturer', 'Series', 'Model'];

  listOfIndexType = ['Use Type', 'Application', 'Mounting Location', 'Accessories',
    'Model year'];

  listOfIndexTS = [ 'Airflow(CFM)', 'Power(W)', 'Operating voltage(VAC)', 'Fan speed(RPM)'];


  itemList: Item[];

  drop(event: CdkDragDrop<string[]>): void {
    moveItemInArray(this.itemList, event.previousIndex, event.currentIndex);
  }

  constructor() {
    this.itemList = JSON.parse(sessionStorage.getItem('compareList'));
    this.itemList.splice(0, 1);
    console.log(this.itemList);
  }

  ngOnInit(): void {
  }

}
