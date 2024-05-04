import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { FriendsComponent } from './friends/friends.component';
import { DebtComponent } from './debt/debt.component';
import { ReportsComponent } from './reports/reports.component';

const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'friends', component: FriendsComponent},
  {path: 'debts', component: DebtComponent},
  {path: 'reports', component: ReportsComponent},
  { path: '', component: HomeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
