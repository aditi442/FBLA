import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { TransactionService } from 'src/app/services/transaction.service';

interface Transaction {
  id: number;
  description: string;
  amount: number;
  date: string;
  category: string;
  type: string;
}

@Component({
  selector: 'app-transaction-list',
  templateUrl: './transaction-list.component.html',
  styleUrls: ['./transaction-list.component.scss']
})
export class TransactionListComponent implements OnInit {
  transactions: Transaction[] = [];
  searchTerm: string = '';
  userId?: BigInt;
  startDate: string = '';
  endDate: string = '';
  filteredTransactions: any[] = [];
  selectedCategory: string = '';
  categories: string[] = ['Utilities', 'Taxes', 'Personal'];
  types: string[] = ['INCOME', 'DEDUCTIONS'];

  constructor(private transactionService: TransactionService, 
    private router: Router, 
    private authService: AuthService, 
    private route: ActivatedRoute
   ){ }

  ngOnInit(): void {
    this.userId =  this.authService.getCurrentUser().userId; 
    this.route.queryParams.subscribe(params => { 
      this.userId = params['userId'];
      console.log("userId from home => "+ params['userId']);
    });

    
    this.loadTransactions();
  }

  loadTransactions(): void {
    const uId = this.authService.getCurrentUser().userId; 
    
    if (uId === undefined) { 
      console.error('User ID is undefined'); 
      return; // Optionally handle this case as needed 
    }
    this.userId = uId;

    this.transactionService.getTransactions(this.userId).subscribe(
      (data: Transaction[]) => {
        this.transactions = data;
      },
      error => {
        console.error('Error fetching transactions', error);
      }
    );
  }

  searchTransactions(): void {
    if (this.searchTerm.trim() !== '') {
      const uId = this.authService.getCurrentUser().userId; 
    
      if (uId === undefined) { 
        console.error('User ID is undefined'); 
        return; // Optionally handle this case as needed 
      }
      this.userId = uId;
      this.transactionService.searchTransactions(this.userId, this.searchTerm).subscribe(
        (data: Transaction[]) => {
          this.transactions = data;
        },
        error => {
          console.error('Error searching transactions', error);
        }
      );
    } else {
      this.loadTransactions();
    }
  }

  editTransaction(id: number, transaction: any): void {
    console.log("In transactionListComponent:EditTransaction =>"+ JSON.stringify(transaction));
    this.router.navigate(['/transaction-form'],{ queryParams: { id: id, transaction: transaction } }
  );
  }
  updateTransaction(id: number, transaction: any): void {

      this.transactionService.updateTransaction(id, transaction).subscribe(
        () => {
          this.transactions = this.transactions.filter(t => t.id !== id);
        },
        error => {
          console.error('Error editing transaction', error);
        }
      );
    
  }

  deleteTransaction(id: number): void {

    if (confirm('Are you sure you want to delete this transaction?')) {
      this.transactionService.deleteTransaction(id).subscribe(
        () => {
          this.transactions = this.transactions.filter(t => t.id !== id);
          this.loadTransactions();
        },
        error => {
          console.error('Error deleting transaction', error);
        }
      );
    }
  }

  addTransaction() : void {
    this.router.navigate(['/transaction-form']);
  }

  filterTransactions() {
    const uId = this.authService.getCurrentUser().userId; 
    
    if (uId === undefined) { 
      console.error('User ID is undefined'); 
      return; // Optionally handle this case as needed 
    }
    this.userId = uId;
    this.transactionService.filterTransactions(this.userId, this.startDate, this.endDate, this.selectedCategory)
      .subscribe(
        (data) => {
          this.transactions = data;
        },
        (error) => {
          console.error('Error filtering transactions', error);
        }
      );
  }

}
