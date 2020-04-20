import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-compare',
  templateUrl: './compare.component.html',
  styleUrls: ['./compare.component.css']
})
export class CompareComponent implements OnInit {
  public searchItem: string;

  constructor() { }

  ngOnInit(): void {
    this.searchItem = sessionStorage.getItem('searchItem');
  }

  clearSession() {
    sessionStorage.setItem('compareList', JSON.stringify(['']));
  }
}
