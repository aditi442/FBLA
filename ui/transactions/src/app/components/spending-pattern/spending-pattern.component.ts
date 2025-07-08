import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { SpendingPatternService } from 'src/app/services/spending-pattern.service';

@Component({
  selector: 'app-spending-pattern',
  templateUrl: './spending-pattern.component.html',
  styleUrls: ['./spending-pattern.component.css']
})

export class SpendingPatternComponent implements OnInit {
  spendingPattern: any;
  userId?: BigInt;

  constructor(private spendingPatternService: SpendingPatternService, private authService: AuthService) {}

  ngOnInit() {
    this.userId =  this.authService.getCurrentUser().userId; 
    this.getSpendingPattern();
  }

  getSpendingPattern() {
    const uId = this.authService.getCurrentUser().userId; 
    
    if (uId === undefined) { 
      console.error('User ID is undefined'); 
      return; // Optionally handle this case as needed 
    }
    this.userId = uId;
    
    this.spendingPatternService.getSpendingPattern(this.userId).subscribe(
      data => {
        this.spendingPattern = data;
      },
      error => {
        console.error('Error fetching spending pattern', error);
      }
    );
  }
}
