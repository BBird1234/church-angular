import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingComponent } from './landing/landing.component';
import { RegisterComponent } from './register/register.component';
import { UpdatepageComponent } from './updatepage/updatepage.component';

const routes: Routes = [
  {path: '', component: LandingComponent },
  {path: 'register', component: RegisterComponent },
  {path: 'update', component: UpdatepageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
