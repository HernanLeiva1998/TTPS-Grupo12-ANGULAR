import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { ListConsumableComponent } from './pages/consumable/list-consumable/list-consumable.component';
import { NewConsumableComponent } from './pages/consumable/new-consumable/new-consumable.component';
import { EditConsumableComponent } from './pages/consumable/edit-consumable/edit-consumable.component';
import { ListMenuComponent } from './pages/menu/list-menu/list-menu.component';
import { NewMenuComponent } from './pages/menu/new-menu/new-menu.component';
import { EditMenuComponent } from './pages/menu/edit-menu/edit-menu.component';
import { UserGuard } from './guards/user.guard';

export const routes: Routes = [
  { path: '', component: HomeComponent }, // Ruta para la página principal
  { path: 'login', component: LoginComponent },
  { path: 'about', component: AboutComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'consumable', component: ListConsumableComponent },
  {
    path: 'consumable/create',
    component: NewConsumableComponent,
    canActivate: [UserGuard],
  },
  {
    path: 'consumable/edit/:id',
    component: EditConsumableComponent,
    canActivate: [UserGuard],
  },
  { path: 'menu', component: ListMenuComponent },
  {
    path: 'menu/create',
    component: NewMenuComponent,
    canActivate: [UserGuard],
  },
  {
    path: 'menu/edit/:id',
    component: EditMenuComponent,
    canActivate: [UserGuard],
  },
  { path: '**', component: PageNotFoundComponent }, //<<--- ISSUE-545034 PARA HERNAN SUPERVISADO POR AGUSTIN
];
