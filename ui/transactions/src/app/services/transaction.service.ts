import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Transaction } from './transaction-list.service';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  private apiUrl = 'http://localhost:8000/api/transaction';

  constructor(private http: HttpClient) {}

  getTransactions(userId: BigInt): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/user/${userId}`);
  }

  getTransaction(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  addTransaction(transaction: any): Observable<any> {
    console.log(transaction);
    return this.http.post(this.apiUrl, transaction);
  }

  updateTransaction(id: number, transaction: any): Observable<any> {
    console.log(transaction);
    return this.http.put(`${this.apiUrl}/${id}`, transaction);
  }

  deleteTransaction(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  searchTransactions(userId: BigInt, searchTerm: string): Observable<Transaction[]> {
    let params = new HttpParams()
      .set('userId', userId.toString())
      .set('searchTerm', searchTerm);
    return this.http.get<Transaction[]>(`${this.apiUrl}/search`, { params });  
    
  }
  // filterTransactions(startDate: string, endDate: string, category: string): Observable<Transaction[]> {
  //   let params = new HttpParams();
    
  //   if (startDate) {
  //     params = params.set('startDate', startDate);
  //   }
    
  //   if (endDate) {
  //     params = params.set('endDate', endDate);
  //   }
    
  //   if (category) {
  //     params = params.set('category', category);
  //   }

  //   return this.http.get<Transaction[]>(`${this.apiUrl}/filter`, { params });
  // }

  filterTransactions(userId: BigInt, startDate?: string, endDate?: string, category?: string): Observable<any[]> {
    let params = new HttpParams().set('userId', userId.toString());
    
    if (startDate) params = params.set('startDate', startDate);
    if (endDate) params = params.set('endDate', endDate);
    if (category) params = params.set('category', category);

    return this.http.get<any[]>(`${this.apiUrl}/filter`, { params });
  }

}
