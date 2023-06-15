import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { ColorSchemeComponent } from './pages/color-scheme/color-scheme.component';

const routes: Routes = [

  { path: '', pathMatch: 'full', redirectTo: '/home' },
  { path: 'home', component: ColorSchemeComponent },
  { path: 'color/:id', component: ColorSchemeComponent },
  { path: 'passwordreset/:id', component: ColorSchemeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
