import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';
import { LoginComponent } from './components/login/login.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { GameDayDetailComponent } from './components/game-day-detail/game-day-detail.component';

export const routes: Routes = [
    {
        path: '',
        component: HomePageComponent,
        canActivate: [authGuard]
    },
    {
        path: 'login',
        component: LoginComponent
    },
    { path: 'game-day/:id', component: GameDayDetailComponent },
    {
        path: '**',
        redirectTo: ''
    }
];
