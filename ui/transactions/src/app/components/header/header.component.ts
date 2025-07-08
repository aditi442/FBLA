import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  isLoggedIn: boolean = false;

  constructor(private authService: AuthService, private router: Router) {
    // Subscribe to authentication status and update the isLoggedIn flag
    this.authService.isAuthenticated().subscribe(
      (isAuthenticated) => {
        this.isLoggedIn = isAuthenticated;
      }
    );
  }

  // Logout method that calls the AuthService logout and navigates to the home page
  logout() {
    this.authService.logout();
    this.router.navigate(['/']);
  }
}