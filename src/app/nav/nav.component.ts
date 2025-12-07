import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../Services/Auth';
import { Router } from "@angular/router";

@Component({
  selector: 'app-nav',
  imports: [RouterLink , RouterLinkActive],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent {
 logo = 'favicon.ico';
 isloggedIn: boolean = false;

 constructor(private authService: AuthService, private route: Router) {
    this.authService.isloggedIn().subscribe((status) => {
      this.isloggedIn = status;
    });
 }
 logout() {
    this.authService.logout();
    this.route.navigate(['/login']);
 }
}
