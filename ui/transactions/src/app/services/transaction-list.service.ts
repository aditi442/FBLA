import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Transaction {
  id: number;
  description: string;
  amount: number;
  date: string;
  category: string;
  type: string;
}

export interface TransactionListResponse {
  transactions: Transaction[];
  totalCount: number;
}

@Injectable({
  providedIn: 'root'
})
export class TransactionListService {
  private apiUrl = 'http://localhost:8000/api/transaction';
  private transactionsSubject = new BehaviorSubject<Transaction[]>([]);
  transactions$ = this.transactionsSubject.asObservable();

  constructor(private http: HttpClient) {}

  getTransactions(
    page: number = 1,
    pageSize: number = 10,
    sortBy: string = 'date',
    sortOrder: 'asc' | 'desc' = 'desc',
    searchTerm: string = '',
    category: string = '',
    type: string = ''
  ): Observable<TransactionListResponse> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('pageSize', pageSize.toString())
      .set('sortBy', sortBy)
      .set('sortOrder', sortOrder);

    if (searchTerm) {
      params = params.set('search', searchTerm);
    }

    if (category) {
      params = params.set('category', category);
    }

    return this.http.get<TransactionListResponse>(this.apiUrl, { params }).pipe(
      map(response => {
        this.transactionsSubject.next(response.transactions);
        return response;
      })
    );
  }

  addTransaction(transaction: Omit<Transaction, 'id'>): Observable<Transaction> {
    return this.http.post<Transaction>(this.apiUrl, transaction).pipe(
      map(newTransaction => {
        const currentTransactions = this.transactionsSubject.value;
        this.transactionsSubject.next([...currentTransactions, newTransaction]);
        return newTransaction;
      })
    );
  }

  updateTransaction(id: number, transaction: Partial<Transaction>): Observable<Transaction> {
    return this.http.put<Transaction>(`${this.apiUrl}/${id}`, transaction).pipe(
      map(updatedTransaction => {
        const currentTransactions = this.transactionsSubject.value;
        const index = currentTransactions.findIndex(t => t.id === id);
        if (index !== -1) {
          currentTransactions[index] = updatedTransaction;
          this.transactionsSubject.next([...currentTransactions]);
        }
        return updatedTransaction;
      })
    );
  }

  deleteTransaction(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      map(() => {
        const currentTransactions = this.transactionsSubject.value;
        this.transactionsSubject.next(currentTransactions.filter(t => t.id !== id));
      })
    );
  }

  searchTransactions(searchTerm: string): Observable<Transaction[]> {
    return this.getTransactions(1, 10, 'date', 'desc', searchTerm).pipe(
      map(response => response.transactions)
    );
  }

  getTransactionsByCategory(category: string): Observable<Transaction[]> {
    return this.getTransactions(1, 10, 'date', 'desc', '', category).pipe(
      map(response => response.transactions)
    );
  }

  getTotalAmount(): Observable<number> {
    return this.transactions$.pipe(
      map(transactions => transactions.reduce((sum, t) => sum + t.amount, 0))
    );
  }
}
