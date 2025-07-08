import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  isLoggedIn: boolean = false;
  username: string = '';
  userId?: BigInt;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.authService.isAuthenticated().subscribe(
      (isAuthenticated: boolean) => {
        this.isLoggedIn = isAuthenticated;
        if (this.isLoggedIn) {
          this.username = this.authService.getUsername();
          this.userId = this.authService.getCurrentUser().userId;
        }
      }
    );
  }

  viewTransactions() {
    this.router.navigate(['/transaction-list'],{ queryParams: { username: this.authService.getUsername(), userId: this.authService.getCurrentUser().userId } }
    );
      
  }
  spendingPattern () {
    this.router.navigate(['/spending-pattern'],{ queryParams: { username: this.authService.getUsername(), userId: this.authService.getCurrentUser().userId } }
  );
  }
}
