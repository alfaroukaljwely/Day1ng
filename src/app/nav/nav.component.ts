import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../Services/Auth';
import { CartService } from '../Services/cart.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css',
})
export class NavComponent {
  logo = 'favicon.ico';
  isloggedIn: boolean = false;
  cartCount: number = 0;

  constructor(
    private authService: AuthService,
    private route: Router,
    private cartService: CartService
  ) {
    this.authService.isloggedIn().subscribe((status) => {
      this.isloggedIn = status;
    });
    this.cartService.count$.subscribe((c) => (this.cartCount = c));
  }
  logout() {
    this.authService.logout();
    this.route.navigate(['/login']);
  }
}
