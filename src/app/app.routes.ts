import { Routes } from '@angular/router';
import { Home } from './home/home';
import { Register } from './register/register';
import { About } from './pages/about/about';
import { Contact } from './pages/contact/contact';
import { Gallery } from './pages/gallery/gallery';
import { Login } from './pages/login/login';
import { Programs } from './pages/programs/programs';
import { Landing } from './landing/landing';
import { AdminGuard } from './admin-guard';
import { ImageUpload } from './image-upload/image-upload';
import { GoogleMap } from './google-map/google-map';
import { DonationPage } from './donation-page/donation-page';
import { BlogForum } from './blog-forum/blog-forum';

export const routes: Routes = [
    { path: '', component: Home },
    { path: 'register', component: Register },
    { path: 'about', component: About },
    { path: 'gallery', component: Gallery },
    { path: 'programs', component: Programs },
    { path: 'contact', component: Contact },
    { path: 'register', component: Register },
    { path: 'login', component: Login },
    { path: 'landing', component: Landing },
    { path: 'image-upload', component: ImageUpload, canActivate: [AdminGuard] },
    { path: 'map', component: GoogleMap },
    { path: 'donate', component: DonationPage },
    { path: 'forum', component: BlogForum },
    // Optional wildcard route for 404
    { path: '**', redirectTo: '', pathMatch: 'full' },
];
