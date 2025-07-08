import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { Transaction } from 'src/app/services/transaction-list.service';
import { TransactionService } from 'src/app/services/transaction.service';

@Component({
  selector: 'app-transaction-form',
  templateUrl: './transaction-form.component.html',
  styleUrls: ['./transaction-form.component.scss']
})
export class TransactionFormComponent implements OnInit {
 // transactionForm: FormGroup | undefined;
  @Input() isEditing: boolean = false;
  @Input() transactionId?: number;
  username: string = '';
  userId?: BigInt;
  categories: string[] = ['Utilities', 'Taxes', 'Personal'];
  types: string[] = ['INCOME', 'DEDUCTINS'];
  
  transaction: any = {
    description: '',
    amount: null,
    category: '',
    date: new Date().toISOString().split('T')[0],
    username: this.authService.getUsername(),
    userId: this.authService.getCurrentUser().userId,
    type: ''
  };

  constructor(
    private fb: FormBuilder,
    private transactionService: TransactionService, 
    private authService: AuthService, 
    private route: ActivatedRoute,
    private router: Router) {
    
  }

  ngOnInit() {
    // this.transactionForm = this.fb.group({
    //   description: ['', Validators.required],
    //   amount: ['', [Validators.required, Validators.min(0)]],
    //   date: ['', Validators.required],
    //   category: ['', Validators.required]
    // });
    
    this.username = this.authService.getUsername();
    this.userId = this.authService.getCurrentUser().userId;
    console.log("user => "+ JSON.stringify(this.authService.getCurrentUser()));
    console.log("transaction-form : username : "+ this.username + " userId:"+ this.userId);

    this.route.queryParams.subscribe(params => { 
      
      if ( params['id'] ) {
        this.transactionId = params['id'];
        this.transaction  = params['transaction'] as Transaction;
        this.isEditing = true;
        console.log("transactionId => "+ params['id'] + " isEditing :"+ this.isEditing + " username :"+ this.transaction.username + 
          "userId :"+ this.transaction.userId );
      } 
      // else {
      //   this.transaction.username = this.username;
      //   this.transaction.userId = this.userId;
      // }
      
      

   });

    if (this.isEditing) {
      this.loadTransaction();
    }
  }

  loadTransaction() {
    console.log("in loadTransaction");
    this.transactionService.getTransaction(this.transactionId!).subscribe(
      data => {
        console.log("in loadTransaction : data :"+ JSON.stringify(data));
        this.transaction = data;
      },
      error => {
        console.error('Error loading transaction', error);
      }
    );
  }

  // onCategoryChange(value: string) { 
  //   this.category = value; 
  //   console.log('Selected category:', this.category); 
  // }

  onSubmit() {
    if (this.isEditing) {
      this.transactionService.updateTransaction(this.transactionId!, this.transaction).subscribe(
        response => {
          console.log('Transaction updated', response);
          this.router.navigate(['/transaction-list']);
        },
        error => {
          console.error('Error updating transaction', error);
        }
      );
    } else {
      
      this.transactionService.addTransaction(this.transaction).subscribe(
        response => {
          console.log('Transaction added', response);
          this.router.navigate(['/transaction-list']);
        },
        error => {
          console.error('Error adding transaction', error);
        }
      );
    }
  }

  resetForm(): void {
    this.transaction = {
      description: '',
      amount: 0,
      date: '',
      category: '',
      type: ''
    };
  }

}
