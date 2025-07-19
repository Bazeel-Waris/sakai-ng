import { Routes } from '@angular/router';
import { AppLayout } from './app/layout/component/app.layout';
import { authGuard } from './app/shared/guards/auth.guard';
import { HomePage } from './app/pages/home/home.page';

export const appRoutes: Routes = [
    {
        path: '',
        component: AppLayout,
        children: [
            {
                path: '',
                loadComponent: () => import('./app/pages/home/home.page').then(m => m.HomePage),
            },
            {
                path: 'post/:id',
                loadComponent: () => import('./app/pages/post-detail/post-detail.page').then(m => m.PostDetailPage),
            },
            {
                path: 'create',
                // canActivate: [authGuard],
                loadComponent: () => import('./app/pages/create-post/create-post.page').then(m => m.CreatePostPage),
            },
        ]
    },
    {
        path: 'login',
        loadComponent: () => import('./app/pages/login/login.page').then(m => m.LoginPage),
    },
    {
        path: 'register',
        loadComponent: () => import('./app/pages/register/register.page').then(m => m.RegisterPage),
    },
    // {
    //     path: '**',
    //     loadComponent: () => import('./app/pages/notfound/notfound').then(m => m.Notfound),
    // }
];
