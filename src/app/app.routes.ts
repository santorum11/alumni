import { Routes } from '@angular/router';
import { Home } from './home/home';
import { Register } from './register/register';
import { About } from './pages/about/about';
import { Contact } from './pages/contact/contact';
import { Gallery } from './pages/gallery/gallery';
import { Login } from './pages/login/login';
import { Programs } from './pages/programs/programs';

export const routes: Routes = [
    { path: '', component: Home },
    { path: 'register', component: Register },
    { path: 'about', component: About },
    { path: 'gallery', component: Gallery },
    { path: 'programs', component: Programs },
    { path: 'contact', component: Contact },
    { path: 'register', component: Register },
    { path: 'login', component: Login },
    // Optional wildcard route for 404
    { path: '**', redirectTo: '', pathMatch: 'full' },
];
