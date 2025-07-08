import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, catchError, map, Observable, of, throwError } from 'rxjs';
import { UserModel } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8000/api/auth';
  private currentUser: any;
  private token: any;
  
  private isAuthenticatedSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient) {
    // Check if there's a stored token on service initialization
    const token = localStorage.getItem('auth_token');
    if (token) {
      this.isAuthenticatedSubject.next(true);
    }
  }

   

  isAuthenticated(): Observable<boolean> {
    return this.isAuthenticatedSubject.asObservable();
  }

  login(username: string, password: string): Observable<any> {

    return this.http.post<UserModel>(`${this.apiUrl}/login`, { username, password })
    .pipe(
        map ((user : UserModel) => {
            this.currentUser = user;
            console.log(this.currentUser);
            console.log("user name => " +this.currentUser.username);
            localStorage.setItem('auth_token', 'dummy_token');
            this.isAuthenticatedSubject.next(true);
            return user;
          }), 
          catchError( error => { 
            console.error('Error:', error); 
            this.isAuthenticatedSubject.next(false);
            return of(undefined); })
      );
  
    // Implement your login logic here
    // For demonstration, we'll just set isAuthenticated to true
    // return new Observable<boolean>(observer => {
    //   console.log(observer);

      // Simulating API call
      // setTimeout(() => {
      //   localStorage.setItem('auth_token', 'dummy_token');
      //   this.isAuthenticatedSubject.next(true);
      //   observer.next(true);
      //   observer.complete();
      // }, 1000);
    //});
  }

  // login(username: string, password: string): Observable<any> {
  //   return this.http.post(`${this.apiUrl}/login`, { username, password });
  // }

  signup(username: string, email: string, password: string): Observable<any> {
    console.log("${this.apiUrl}/signup");
    console.log("username:"+ username + " email: "+ email + " password: "+ password);
    return this.http.post(`${this.apiUrl}/signup`, { username, email, password });
  }

  forgotPassword(email: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/forgot-password`, { email });
  }
  
  logout(): void {
    localStorage.removeItem('auth_token');
    this.isAuthenticatedSubject.next(false);
  }

  getCurrentUser(): UserModel {
    return this.currentUser;
  }

  getUsername(): string {
    return this.currentUser ? this.currentUser.username : '';
  }
}
