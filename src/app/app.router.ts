import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';

import { HelpComponent } from './components/help/help.component';
import { ListingDetailComponent } from './components/listing-detail/listing-detail.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { HomeComponent } from './components/home/home.component';
import { AddSubleaseFormComponent } from './components/add-sublease-form/add-sublease-form.component';
import { UserListComponent } from './components/user-list/user-list.component';

const router: Routes = [
    {path: '',
    redirectTo: '/home',
    pathMatch: 'full'},
    {path: 'home',
        component: HomeComponent},
    {path: 'help',
        component: HelpComponent},
    {path: 'login',
        component: LoginComponent},
    {path: 'signup',
        component: SignupComponent},
    {path: 'listing-detail',
        component: ListingDetailComponent},
        {path: 'add-sublease-form',
        component: AddSubleaseFormComponent},
    {
        path: 'user-list',
        component: UserListComponent
    }
];

export const routes: ModuleWithProviders = RouterModule.forRoot(router);
