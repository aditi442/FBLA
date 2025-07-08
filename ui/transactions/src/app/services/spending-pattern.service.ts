import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpendingPatternService {
  private apiUrl = 'http://localhost:8000/api/spending-pattern';

  constructor(private http: HttpClient) {}

  // getSpendingPattern(): Observable<any> {
  //   return this.http.get(this.apiUrl);
  // }
  
  getSpendingPattern(userId: BigInt): Observable<any> {
    return this.http.get(`${this.apiUrl}/${userId}`);
  }
}
