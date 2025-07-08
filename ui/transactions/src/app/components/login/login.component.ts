import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  // Submit form for login
  onSubmit() {
    // Call AuthService's login method with username and password
    this.authService.login(this.username, this.password).subscribe(
      response => {  
        // Log response on successful login
        console.log(response);
        console.log('Login successful', response);
        
        // Navigate to transaction list page on successful login
        this.router.navigate(['/transaction-list']);
      },
      error => {
        // Log error on failed login
        console.error('Login failed', error);
      }
    );
  }
}
