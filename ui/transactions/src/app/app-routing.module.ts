import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms'; 
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { TransactionListComponent } from './components/transaction-list/transaction-list.component';
import { TransactionFormComponent } from './components/transaction-form/transaction-form.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { SignupComponent } from './components/signup/signup.component';
import { SpendingPatternComponent } from './components/spending-pattern/spending-pattern.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'transaction-list', component: TransactionListComponent },
  { path: 'transaction-form', component: TransactionFormComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'spending-pattern', component: SpendingPatternComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes), FormsModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
