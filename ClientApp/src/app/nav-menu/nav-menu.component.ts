import { Component, OnInit } from '@angular/core';
import { environment } from './../../environments/environment';
import { Router } from '@angular/router';
import { AuthService } from '../core/services/auth.service';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent implements OnInit{  
  isExpanded = false;
  user: any;

  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.user.subscribe((user) => {
      this.user = user;
    });
  }

  collapse() {
    this.isExpanded = false;
  }

  toggle() {
    this.isExpanded = !this.isExpanded;
  }

  logout() {
    localStorage.removeItem(environment.tokenName);
    this.user = null;
    this.router.navigate(['/login']);
  }
}
