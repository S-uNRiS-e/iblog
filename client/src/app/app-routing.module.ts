import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './modules/guards/auth.guard';
import { BlogResolver } from './modules/resolvers/blog.resolver';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'main' },
  {
    path: 'welcome',
    loadChildren: () => import('./pages/welcome/welcome.module').then(m => m.WelcomeModule)
  },
  { path: 'login', loadChildren: () => import('./pages/auth/login/login.module').then(m => m.LoginModule) },
  { path: 'registration', loadChildren: () => import('./pages/auth/registration/registration.module').then(m => m.RegistrationModule) },
  { path: 'main', loadChildren: () => import('./pages/main/main.module').then(m => m.MainModule), canActivate:[AuthGuard] },
  { path: 'profile', loadChildren: () => import('./pages/profile/profile.module').then(m => m.ProfileModule),canActivate:[AuthGuard] },
  { path: 'news-detail/:id', loadChildren: () => import('./pages/news-detail/news-detail.module').then(m => m.NewsDetailModule),resolve: { news: BlogResolver } },
  { path: 'search', loadChildren: () => import('./pages/search-page/search-page.module').then(m => m.SearchPageModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabledBlocking'
  })],
  exports: [RouterModule],
  providers:[AuthGuard]
})
export class AppRoutingModule { }
