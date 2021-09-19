import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AppComponent} from "./app.component";
import {SettingComponent} from "./components/setting/setting.component";
import {MenuComponent} from "./components/menu/menu.component";
import {AdminComponent} from "./components/admin/admin.component";

const routes: Routes = [
  { path: 'menu', component: MenuComponent },
  { path: 'setting', component: SettingComponent },
  { path: 'admin', component: AdminComponent },
  { path: '',   redirectTo: '/menu', pathMatch: 'full' },
  { path: '**', component: MenuComponent },  // Wildcard route for a 404 page
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
