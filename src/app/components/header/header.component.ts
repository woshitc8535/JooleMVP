import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isAuthenticate: boolean;
  isLogin: boolean;

  constructor() { }

  ngOnInit(): void {
    this.isAuthenticate = false;
    this.isLogin = true;
  }
  changePage(){
    this.isLogin = !this.isLogin;
  }

}
