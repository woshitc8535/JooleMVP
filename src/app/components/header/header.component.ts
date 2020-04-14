import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isAuthenticate = false;
  isLogin = false;
  private authListenerSub: Subscription;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.authListenerSub = this.authService
      .getAuthStatusListener()
      .subscribe(isAuthenticate => {
        this.isAuthenticate = isAuthenticate;
      });
  }
  changePage(){
    this.isLogin = !this.isLogin;
  }

}
