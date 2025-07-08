import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent {
  email: string = '';

  constructor(private authService: AuthService) {}

  onSubmit() {
    this.authService.forgotPassword(this.email).subscribe(
      response => {
        console.log('Password reset email sent', response);
      },
      error => {
        console.error('Failed to send password reset email', error);
      }
    );
  }
}
