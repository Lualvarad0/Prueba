import { NgModule } from '@angular/core';
import { RouterModule, Routes, CanLoad } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { BusquedaComponent } from './pages/busqueda/busqueda.component';
import { FavoritosComponent } from './pages/favoritos/favoritos.component';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'busqueda', component: BusquedaComponent, canLoad:[AuthGuard] },
  { path: 'favoritos', component: FavoritosComponent, canLoad:[AuthGuard]},
  { path: '**', redirectTo: '/login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
